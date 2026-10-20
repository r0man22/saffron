# Lift the crocus artwork off the ROFRAN gift-box photographs as transparent ornaments.
#  - line art printed on the cream linings: "colour to alpha" against a locally estimated paper colour, so the
#    ink (gold lines, pink washes, saffron threads) keeps its own colour and the paper becomes transparent;
#  - painted art on the wine boxes: a soft mask from the distance to the local wine colour (the embossed
#    damask texture stays below the threshold), with edge pixels un-mixed from the wine.
# usage: python3 -I scripts/extract-box-ornaments.py [photo dir] [out dir] [--preview dir]
#        (defaults: public/media/shop → public/media/shop/ornaments)
import os
import sys
from PIL import Image, ImageFilter, ImageDraw

args = [a for a in sys.argv[1:] if not a.startswith("--")]
SRC = args[0] if args else "public/media/shop"
OUT = args[1] if len(args) > 1 else "public/media/shop/ornaments"
PREVIEW = sys.argv[sys.argv.index("--preview") + 1] if "--preview" in sys.argv else None
os.makedirs(OUT, exist_ok=True)


def smoothstep(e0, e1, x):
    t = min(1.0, max(0.0, (x - e0) / (e1 - e0)))
    return t * t * (3 - 2 * t)


def dist(a, b):
    return ((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2) ** 0.5


def chroma(p):
    t = p[0] + p[1] + p[2] + 1e-6
    return (p[0] / t, p[1] / t, p[2] / t)


def background(img, ref, first, second, radius, by_hue=False):
    """Paper/box colour everywhere, from the pixels that look like background (normalised convolution).
    by_hue: classify the first pass by hue alone, so soft shadows on the paper count as paper."""
    w, h = img.size
    px = img.load()

    def field(is_bg):
        mask = Image.new("L", img.size, 0)
        mp = mask.load()
        for y in range(h):
            for x in range(w):
                if is_bg(px[x, y], x, y):
                    mp[x, y] = 255
        masked = Image.composite(img, Image.new("RGB", img.size, (0, 0, 0)), mask)
        blurred = masked.filter(ImageFilter.GaussianBlur(radius)).load()
        weight = mask.filter(ImageFilter.GaussianBlur(radius)).load()
        out = Image.new("RGB", img.size)
        op = out.load()
        for y in range(h):
            for x in range(w):
                k = weight[x, y]
                op[x, y] = tuple(int(c * 255 / k) for c in blurred[x, y]) if k > 3 else ref
        return out

    if by_hue:
        # Lit and shaded paper lie on one line: as the light falls the paper warms (more red, less blue) at a
        # steady rate. Ink and washes leave that line; soft shadows and highlights stay on it.
        rc, lum = chroma(ref), sum(ref)

        def paper(p, x, y):
            L = sum(p)
            if L < 0.62 * lum:
                return False
            c = chroma(p)
            return dist(c, (rc[0] + (lum - L) * 0.00024, rc[1], rc[2] - (lum - L) * 0.00025)) < first

        bg = field(paper)
    else:
        bg = field(lambda p, x, y: dist(p, ref) < first)
    bp = bg.load()
    return field(lambda p, x, y: dist(p, bp[x, y]) < second)


def ink(img, bg, floor):
    """Colour to alpha: the least opaque ink that, over the paper, gives the pixel."""
    w, h = img.size
    px, bp = img.load(), bg.load()
    out = Image.new("RGBA", img.size)
    op = out.load()
    for y in range(h):
        for x in range(w):
            p, b = px[x, y], bp[x, y]
            a = 0.0
            for c in range(3):
                if p[c] < b[c]:
                    a = max(a, (b[c] - p[c]) / max(b[c], 1))
                elif p[c] > b[c]:
                    a = max(a, (p[c] - b[c]) / max(255 - b[c], 1))
            if a <= 0:
                op[x, y] = (0, 0, 0, 0)
                continue
            fg = tuple(int(min(255, max(0, (p[c] - (1 - a) * b[c]) / a))) for c in range(3))
            alpha = max(0.0, (a - floor) / (1 - floor))
            op[x, y] = fg + (int(alpha * 255 + 0.5),) if alpha > 0 else (0, 0, 0, 0)
    return out


def paint(img, bg, lo, hi, keep):
    """Soft mask of everything that is not box colour; edge pixels are un-mixed from the box colour."""
    w, h = img.size
    px, bp, kp = img.load(), bg.load(), keep.load()
    alpha = Image.new("L", img.size, 0)
    ap = alpha.load()
    for y in range(h):
        for x in range(w):
            if kp[x, y]:
                ap[x, y] = int(255 * smoothstep(lo, hi, dist(px[x, y], bp[x, y])))
    alpha = alpha.filter(ImageFilter.MedianFilter(5)).filter(ImageFilter.GaussianBlur(0.6))
    ap = alpha.load()
    out = Image.new("RGBA", img.size)
    op = out.load()
    for y in range(h):
        for x in range(w):
            a = ap[x, y] / 255
            if a <= 0.01:
                op[x, y] = (0, 0, 0, 0)
                continue
            p, b = px[x, y], bp[x, y]
            d = max(a, 0.45)
            op[x, y] = tuple(int(min(255, max(0, (p[c] - (1 - d) * b[c]) / d))) for c in range(3)) + (ap[x, y],)
    return out


def preview(art, name):
    if not PREVIEW:
        return
    os.makedirs(PREVIEW, exist_ok=True)
    for label, colour in (("cream", (245, 236, 221)), ("wine", (74, 16, 32))):
        base = Image.new("RGBA", art.size, colour + (255,))
        base.alpha_composite(art)
        base.convert("RGB").save(f"{PREVIEW}/{name}-on-{label}.jpg", quality=88)


def save(art, name, width, clear=()):
    art = art.resize((width, round(art.height * width / art.width)), Image.LANCZOS)
    if clear:   # polygons (in output pixels) that belong to the box, not the artwork
        hole = Image.new("L", art.size, 255)
        for poly in clear:
            ImageDraw.Draw(hole).polygon(poly, fill=0)
        hole = hole.filter(ImageFilter.GaussianBlur(2))
        art.putalpha(Image.composite(art.getchannel("A"), Image.new("L", art.size, 0), hole))
    art.save(f"{OUT}/{name}.webp", quality=80, alpha_quality=82, method=6)
    preview(art, name)
    print(name, art.size)


# 1. The tall crocus sprig on the opening lining of the culinary set, squared up from its perspective.
photo = Image.open(f"{SRC}/culinary.webp").convert("RGB")
quad = (86, 280, 86, 906, 412, 872, 412, 328)          # upper-left, lower-left, lower-right, upper-right
sprig = photo.transform((680, 1240), Image.Transform.QUAD, quad, Image.BICUBIC)
ref = sprig.crop((40, 20, 640, 110)).resize((1, 1), Image.BOX).getpixel((0, 0))
sprig_bg = background(sprig, ref, 0.009, 9, 22, by_hue=True)
save(ink(sprig, sprig_bg, 0.1), "crocus-sprig", 500)

# 2. The gold petal fan inside the necklace chest's lid (it rises from the lid's lower edge).
photo = Image.open(f"{SRC}/necklace.webp").convert("RGB")
fan = photo.crop((380, 182, 1108, 402)).resize((1456, 440), Image.LANCZOS)
ref = fan.crop((40, 10, 400, 70)).resize((1, 1), Image.BOX).getpixel((0, 0))
fan_bg = background(fan, ref, 0.009, 9, 26, by_hue=True)
save(ink(fan, fan_bg, 0.14), "crocus-fan", 1000, clear=[[(520, 0), (1000, 0), (1000, 36), (760, 22)], [(0, 140), (16, 140), (16, 302), (0, 302)]])

# 3. The painted crocus on the front of the everyday carton (it runs off the carton's right edge).
photo = Image.open(f"{SRC}/everyday.webp").convert("RGB")
box = (372, 342, 672, 900)
art = photo.crop(box).resize(((box[2] - box[0]) * 2, (box[3] - box[1]) * 2), Image.LANCZOS)
keep = Image.new("L", art.size, 255)
draw = ImageDraw.Draw(keep)
s = 2
draw.rectangle(((355 - box[0]) * s, (668 - box[1]) * s, (393 - box[0]) * s, (862 - box[1]) * s), fill=0)  # saffron window
draw.rectangle(((355 - box[0]) * s, (556 - box[1]) * s, (382 - box[0]) * s, (606 - box[1]) * s), fill=0)  # lettering
ref = art.crop((40, 20, 160, 120)).resize((1, 1), Image.BOX).getpixel((0, 0))
art_bg = background(art, ref, 34, 16, 40)
save(paint(art, art_bg, 15, 32, keep), "crocus-painted", 520)
