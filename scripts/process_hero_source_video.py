from pathlib import Path

import imageio.v3 as iio
import numpy as np
from PIL import Image, ImageFilter, ImageEnhance


ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path(r"C:\Users\jefferson.santos\Downloads\0412.mp4")
PUBLIC = ROOT / "public"
OUTPUT_VIDEO = PUBLIC / "brand-safari-home-hero.mp4"
OUTPUT_POSTER = PUBLIC / "brand-safari-home-hero-poster.png"

WIDTH = 1600
HEIGHT = 900
FPS = 24
SECONDS = 6


def fit_cover(image: Image.Image, size: tuple[int, int]) -> Image.Image:
    target_w, target_h = size
    scale = max(target_w / image.width, target_h / image.height)
    resized = image.resize((int(image.width * scale), int(image.height * scale)), Image.LANCZOS)
    left = (resized.width - target_w) // 2
    top = (resized.height - target_h) // 2
    return resized.crop((left, top, left + target_w, top + target_h))


def stylize_frame(frame: np.ndarray) -> Image.Image:
    source = Image.fromarray(frame).convert("RGB")
    cover = fit_cover(source, (WIDTH, HEIGHT))
    cover = ImageEnhance.Brightness(cover).enhance(0.94)
    cover = ImageEnhance.Color(cover).enhance(1.08)
    cover = ImageEnhance.Contrast(cover).enhance(1.04)

    light_pass = Image.new("RGBA", (WIDTH, HEIGHT), (255, 255, 255, 0))
    flare = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    flare_draw = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    flare_draw.paste((255, 255, 255, 24), (0, 0, WIDTH, HEIGHT))
    flare = flare_draw.filter(ImageFilter.GaussianBlur(42))

    canvas = Image.alpha_composite(cover.convert("RGBA"), flare)
    light_pass = light_pass.filter(ImageFilter.GaussianBlur(0))
    canvas = Image.alpha_composite(canvas, light_pass)

    return canvas.convert("RGB")


def main():
    PUBLIC.mkdir(exist_ok=True)

    reader = iio.imiter(SOURCE)
    frames = []
    max_frames = FPS * SECONDS

    for index, frame in enumerate(reader):
        if index >= max_frames:
            break
        frames.append(stylize_frame(frame))

    if not frames:
        raise RuntimeError("No frames were extracted from the source video.")

    frames[0].save(OUTPUT_POSTER, optimize=True)

    iio.imwrite(
        OUTPUT_VIDEO,
        [np.array(frame) for frame in frames],
        fps=FPS,
        codec="libx264",
        macro_block_size=1,
        pixelformat="yuv420p",
        ffmpeg_log_level="error",
        output_params=["-movflags", "+faststart", "-crf", "24"],
    )

    print(f"Generated {OUTPUT_VIDEO}")
    print(f"Generated {OUTPUT_POSTER}")


if __name__ == "__main__":
    main()
