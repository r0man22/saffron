from pathlib import Path
import json, re, subprocess
import requests

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/media'
OUT.mkdir(parents=True, exist_ok=True)
SOURCE = '/home/roman/Downloads/saffa-final-1080p.mp4'
def ffmpeg(args):
    subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', *args], check=True)

for name, width, crf in [('rofran-story', 1920, 23), ('rofran-story-mobile', 1280, 24)]:
    target = OUT / (name + '.mp4')
    if not target.exists():
        ffmpeg(['-i', SOURCE, '-vf', f'scale={width}:-2', '-an', '-c:v', 'libx264', '-preset', 'fast', '-crf', str(crf), '-g', '6', '-keyint_min', '6', '-sc_threshold', '0', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-y', str(target)])
    print(name, target.stat().st_size, flush=True)

for name, seconds in [('valley', 0), ('flower', 3.8), ('detail', 6), ('threads', 9.5), ('saffron', 14), ('product', 19), ('finale', 25.5)]:
    ffmpeg(['-ss', str(seconds), '-i', SOURCE, '-frames:v', '1', '-vf', 'scale=1920:-2', '-quality', '88', '-y', str(OUT / (name + '.webp'))])
ffmpeg(['-ss', '19', '-i', SOURCE, '-frames:v', '1', '-vf', 'scale=1200:675,crop=1200:630', '-q:v', '3', '-y', str(OUT / 'social.jpg')])

font_dir = ROOT / 'public/fonts'
font_dir.mkdir(exist_ok=True)
url = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Manrope:wght@400;500;600&display=swap'
response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0 Chrome/120.0.0.0 Safari/537.36'}, timeout=40)
response.raise_for_status()
css = response.text
for i, url in enumerate(dict.fromkeys(re.findall(r'url\((https://[^)]+)\)', css))):
    result = requests.get(url, timeout=40)
    result.raise_for_status()
    extension = 'woff2' if '.woff2' in url else 'ttf'
    name = f'rofran-font-{i}.{extension}'
    (font_dir / name).write_bytes(result.content)
    css = css.replace(url, '/fonts/' + name)
(font_dir / 'fonts.css').write_text(css)
(OUT / 'manifest.json').write_text(json.dumps({'source': SOURCE, 'duration': 25.708333, 'fps': 24, 'desktop': '1920x1080', 'mobile': '1280x720', 'keyframe_interval': 6}, indent=2))
print('Media and local fonts ready', flush=True)
