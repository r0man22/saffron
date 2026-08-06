from pathlib import Path
from PIL import Image, ImageEnhance, ImageOps


ROOT = Path(__file__).resolve().parents[1]
ANCHORS = ROOT / "public" / "images" / "anchors"
OUTPUT = ROOT / "public" / "frames"
SIZE = (1280, 720)
STEPS_PER_TRANSITION = 10


def prepare(path: Path) -> Image.Image:
    image = Image.open(path).convert("RGB")
    image = ImageOps.fit(image, SIZE, method=Image.Resampling.LANCZOS)
    image = ImageEnhance.Color(image).enhance(0.96)
    image = ImageEnhance.Contrast(image).enhance(1.03)
    return image


def smoothstep(value: float) -> float:
    return value * value * (3 - 2 * value)


def main() -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)
    anchors = [prepare(ANCHORS / f"anchor-{index:02d}.png") for index in range(1, 9)]

    frame_index = 0
    for anchor_index in range(len(anchors) - 1):
        first = anchors[anchor_index]
        second = anchors[anchor_index + 1]
        for step in range(STEPS_PER_TRANSITION):
            amount = smoothstep(step / STEPS_PER_TRANSITION)
            frame = Image.blend(first, second, amount)
            frame.save(
                OUTPUT / f"frame-{frame_index:03d}.webp",
                "WEBP",
                quality=84,
                method=6,
            )
            frame_index += 1

    anchors[-1].save(
        OUTPUT / f"frame-{frame_index:03d}.webp",
        "WEBP",
        quality=86,
        method=6,
    )
    print(f"Created {frame_index + 1} frames in {OUTPUT}")


if __name__ == "__main__":
    main()
