#!/usr/bin/env python3
"""Rimuove sfondo bianco/nero, elimina aloni e ritaglia i loghi clienti."""

from __future__ import annotations

import shutil
import sys
from collections import deque
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
MATERIALE = ROOT / "Materiale Sito Web Forge Group" / "07-loghi-clienti"
PUBLIC = ROOT / "public" / "images" / "clienti"

LOGO_SOURCES = {
    "cliente-disa.png": "disa.png",
    "cliente-tettitop.png": "tettitop.png",
    "cliente-rovi.png": "rovi.png",
    "cliente-sos-appalti.png": "sos-appalti.png",
    "cliente-eva-consulting.png": "eva-consulting.png",
    "cliente-hotel-dream.png": "hotel-dream.png",
}


def is_near_white(r: int, g: int, b: int, tolerance: int = 32) -> bool:
    return r >= 255 - tolerance and g >= 255 - tolerance and b >= 255 - tolerance


def is_near_black(r: int, g: int, b: int, tolerance: int = 42) -> bool:
    return r <= tolerance and g <= tolerance and b <= tolerance


def flood_remove(img: Image.Image, matcher, tolerance: int) -> None:
    w, h = img.size
    pixels = img.load()
    visited = [[False] * w for _ in range(h)]
    queue: deque[tuple[int, int]] = deque()

    for x in range(w):
        queue.append((x, 0))
        queue.append((x, h - 1))
    for y in range(h):
        queue.append((0, y))
        queue.append((w - 1, y))

    while queue:
        x, y = queue.popleft()
        if x < 0 or y < 0 or x >= w or y >= h or visited[y][x]:
            continue
        visited[y][x] = True
        r, g, b, a = pixels[x, y]
        if a == 0 or not matcher(r, g, b, tolerance):
            continue
        pixels[x, y] = (r, g, b, 0)
        queue.extend(((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)))


def remove_halo(img: Image.Image, tolerance: int = 28) -> None:
    """Rimuove pixel quasi bianchi attaccati al bordo trasparente (aloni da scontorno)."""
    w, h = img.size
    pixels = img.load()
    to_clear: list[tuple[int, int]] = []

    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            if a == 0 or not is_near_white(r, g, b, tolerance):
                continue
            for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
                if 0 <= nx < w and 0 <= ny < h and pixels[nx, ny][3] == 0:
                    to_clear.append((x, y))
                    break

    for x, y in to_clear:
        pixels[x, y] = (0, 0, 0, 0)


def content_bbox(img: Image.Image, alpha_threshold: int = 16):
    w, h = img.size
    pixels = img.load()
    minx, miny, maxx, maxy = w, h, 0, 0
    found = False
    for y in range(h):
        for x in range(w):
            if pixels[x, y][3] > alpha_threshold:
                found = True
                minx, miny = min(minx, x), min(miny, y)
                maxx, maxy = max(maxx, x), max(maxy, y)
    if not found:
        return 0, 0, w, h
    return minx, miny, maxx + 1, maxy + 1


def trim_with_padding(img: Image.Image, padding_ratio: float = 0.04, min_pad: int = 8) -> Image.Image:
    minx, miny, maxx, maxy = content_bbox(img)
    cw, ch = maxx - minx, maxy - miny
    pad = max(min_pad, int(max(cw, ch) * padding_ratio))
    left = max(0, minx - pad)
    top = max(0, miny - pad)
    right = min(img.width, maxx + pad)
    bottom = min(img.height, maxy + pad)
    return img.crop((left, top, right, bottom))


def process_logo_rovi(src: Path, dest: Path) -> None:
    """Logo su sfondo nero: rimuove solo il nero puro ai bordi, preserva il testo scuro."""
    img = Image.open(src).convert("RGBA")
    flood_remove(img, is_near_black, 18)
    img = trim_with_padding(img)
    dest.parent.mkdir(parents=True, exist_ok=True)
    img.save(dest, "PNG", optimize=True)
    print(f"ok: {src.name} -> {dest.relative_to(ROOT)} ({img.width}x{img.height})")


def process_logo(src: Path, dest: Path) -> None:
    img = Image.open(src).convert("RGBA")
    flood_remove(img, is_near_black, 42)
    flood_remove(img, is_near_white, 32)
    remove_halo(img, 28)
    img = trim_with_padding(img)
    dest.parent.mkdir(parents=True, exist_ok=True)
    img.save(dest, "PNG", optimize=True)
    print(f"ok: {src.name} -> {dest.relative_to(ROOT)} ({img.width}x{img.height})")


def process_all() -> int:
    for dest_name, src_name in LOGO_SOURCES.items():
        src = MATERIALE / src_name
        if not src.exists():
            print(f"missing source: {src}")
            return 1
        dest_public = PUBLIC / dest_name
        dest_materiale = MATERIALE / dest_name
        processor = process_logo_rovi if dest_name == "cliente-rovi.png" else process_logo
        processor(src, dest_public)
        shutil.copy2(dest_public, dest_materiale)
    return 0


def main() -> int:
    if len(sys.argv) > 1:
        for path in sys.argv[1:]:
            src = Path(path)
            if not src.exists():
                print(f"skip missing: {src}")
                continue
            process_logo(src, src)
        return 0
    return process_all()


if __name__ == "__main__":
    raise SystemExit(main())
