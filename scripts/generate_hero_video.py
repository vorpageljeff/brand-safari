from pathlib import Path
import math

import imageio.v3 as iio
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont


WIDTH = 1600
HEIGHT = 900
FPS = 30
DURATION_SECONDS = 6
SEGMENTS = 12
FRAMES_PER_SEGMENT = int((FPS * DURATION_SECONDS) / SEGMENTS)

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
LOGO_PATH = PUBLIC / "brand-safari-logo.png"
VIDEO_PATH = PUBLIC / "brand-safari-home-hero.mp4"
POSTER_PATH = PUBLIC / "brand-safari-home-hero-poster.png"


SCENES = [
    {"label": "market reading", "accent": "#f2c6bb", "orb": (220, 250), "align": "left"},
    {"label": "brand direction", "accent": "#ead9b7", "orb": (1220, 210), "align": "right"},
    {"label": "positioning", "accent": "#d8e0d1", "orb": (1180, 620), "align": "left"},
    {"label": "content", "accent": "#f3d6d6", "orb": (360, 690), "align": "right"},
    {"label": "analysis", "accent": "#ead4c7", "orb": (1380, 340), "align": "left"},
    {"label": "launch", "accent": "#dbe4df", "orb": (250, 250), "align": "right"},
    {"label": "branding", "accent": "#f4d2c5", "orb": (1330, 700), "align": "left"},
    {"label": "strategy", "accent": "#ece0c3", "orb": (260, 500), "align": "right"},
    {"label": "clarity", "accent": "#d6dfd9", "orb": (860, 180), "align": "left"},
    {"label": "creative path", "accent": "#f0d0d6", "orb": (920, 720), "align": "right"},
    {"label": "new phase", "accent": "#e9d7bd", "orb": (180, 350), "align": "left"},
    {"label": "brand safari", "accent": "#d9e3db", "orb": (1280, 500), "align": "right"},
]


def pick_font(candidates, size):
    fonts_dir = Path(r"C:\Windows\Fonts")
    for name in candidates:
        path = fonts_dir / name
        if path.exists():
            return ImageFont.truetype(str(path), size=size)
    return ImageFont.load_default()


HEAD_FONT = pick_font(["arial.ttf", "segoeui.ttf", "bahnschrift.ttf"], 154)
SUB_FONT = pick_font(["arial.ttf", "segoeui.ttf", "bahnschrift.ttf"], 28)
SMALL_FONT = pick_font(["arial.ttf", "segoeui.ttf", "bahnschrift.ttf"], 22)


def hex_to_rgba(hex_color, alpha=255):
    hex_color = hex_color.lstrip("#")
    return tuple(int(hex_color[i:i + 2], 16) for i in (0, 2, 4)) + (alpha,)


def draw_tracked_text(draw, position, text, font, fill, tracking):
    x, y = position
    for char in text:
        draw.text((x, y), char, font=font, fill=fill)
        bbox = draw.textbbox((x, y), char, font=font)
        x += (bbox[2] - bbox[0]) + tracking


def make_background(accent, orb_center):
    base = Image.new("RGBA", (WIDTH, HEIGHT), (255, 255, 255, 255))
    grid = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    grid_draw = ImageDraw.Draw(grid)

    for x in range(0, WIDTH, 72):
        grid_draw.line((x, 0, x, HEIGHT), fill=(15, 15, 15, 10), width=1)
    for y in range(0, HEIGHT, 72):
        grid_draw.line((0, y, WIDTH, y), fill=(15, 15, 15, 10), width=1)

    soft = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    soft_draw = ImageDraw.Draw(soft)
    x, y = orb_center
    soft_draw.ellipse((x - 280, y - 280, x + 280, y + 280), fill=hex_to_rgba(accent, 88))
    soft_draw.ellipse((x - 140, y - 140, x + 140, y + 140), fill=hex_to_rgba("#ffffff", 74))
    soft = soft.filter(ImageFilter.GaussianBlur(96))

    highlight = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    highlight_draw = ImageDraw.Draw(highlight)
    highlight_draw.rounded_rectangle((70, 70, WIDTH - 70, HEIGHT - 70), radius=42, outline=(18, 18, 18, 18), width=2)
    highlight = highlight.filter(ImageFilter.GaussianBlur(0.5))

    return Image.alpha_composite(Image.alpha_composite(base, soft), Image.alpha_composite(grid, highlight))


def load_logo():
    if not LOGO_PATH.exists():
        return None
    logo = Image.open(LOGO_PATH).convert("RGBA")
    ratio = 120 / logo.height
    resized = logo.resize((int(logo.width * ratio), 120), Image.LANCZOS)
    alpha = resized.getchannel("A").point(lambda value: int(value * 0.28))
    resized.putalpha(alpha)
    return resized


LOGO = load_logo()


def make_scene(config):
    canvas = make_background(config["accent"], config["orb"])
    draw = ImageDraw.Draw(canvas)

    tag = "brand safari studio"
    draw_tracked_text(draw, (96, 92), tag.upper(), SUB_FONT, (18, 18, 18, 122), 8)

    label_text = config["label"].upper()
    lines = label_text.split(" ")
    if len(label_text) > 12 and len(lines) == 2:
        line_one = lines[0]
        line_two = lines[1]
    elif len(label_text) > 12 and len(lines) > 2:
        line_one = " ".join(lines[: math.ceil(len(lines) / 2)])
        line_two = " ".join(lines[math.ceil(len(lines) / 2):])
    else:
        line_one = label_text
        line_two = ""

    is_left = config["align"] == "left"
    base_x = 92 if is_left else 540
    second_x = base_x + (20 if is_left else 0)
    y = 240

    draw.text((base_x, y), line_one, font=HEAD_FONT, fill=(18, 18, 18, 224))
    if line_two:
        draw.text((second_x, y + 146), line_two, font=HEAD_FONT, fill=(18, 18, 18, 224))

    body_x = 96 if is_left else 930
    body_box_width = 520 if is_left else 430
    body_text = "analise, estrategia e direcao visual para marcas com crescimento claro."
    draw.multiline_text(
        (body_x, 650),
        body_text,
        font=SMALL_FONT,
        fill=(40, 40, 40, 150),
        spacing=8,
    )

    if LOGO:
      logo_x = WIDTH - LOGO.width - 108 if is_left else 108
      canvas.alpha_composite(LOGO, (logo_x, HEIGHT - LOGO.height - 96))

    return canvas.convert("RGB")


def blend_frames(scene_a, scene_b):
    for index in range(FRAMES_PER_SEGMENT):
        alpha = index / FRAMES_PER_SEGMENT
        yield Image.blend(scene_a, scene_b, alpha)


def main():
    PUBLIC.mkdir(exist_ok=True)
    scenes = [make_scene(config) for config in SCENES]
    scenes.append(scenes[0])

    frames = []
    for current, nxt in zip(scenes, scenes[1:]):
        frames.extend(blend_frames(current, nxt))

    poster = scenes[3]
    poster.save(POSTER_PATH, optimize=True)

    frame_arrays = [np.array(frame) for frame in frames]
    iio.imwrite(
        VIDEO_PATH,
        frame_arrays,
        fps=FPS,
        codec="libx264",
        macro_block_size=1,
        pixelformat="yuv420p",
        ffmpeg_log_level="error",
        output_params=["-movflags", "+faststart", "-crf", "24"],
    )

    print(f"Generated {VIDEO_PATH}")
    print(f"Generated {POSTER_PATH}")


if __name__ == "__main__":
    main()
