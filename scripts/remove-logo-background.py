#!/usr/bin/env python3
"""Rimuove sfondo bianco o nero dai loghi PNG (flood-fill dai bordi)."""

from __future__ import annotations

import sys
from collections import deque
from pathlib import Path

from PIL import Image


def is_near_white(r: int, g: int, b: int, tolerance: int = 28) -> bool:
    return r >= 255 - tolerance and g >= 255 - tolerance and b >= 255 - tolerance


def is_near_black(r: int, g: int, b: int, tolerance: int = 35) -> bool:
    return r <= tolerance and g <= tolerance and b <= tolerance


def remove_edge_background(path: Path, matcher, tolerance: int = 28) -> None:
    img = Image.open(path).convert("RGBA")
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
        if not matcher(r, g, b, tolerance):
            continue
        pixels[x, y] = (r, g, b, 0)
        queue.append((x + 1, y))
        queue.append((x - 1, y))
        queue.append((x, y + 1))
        queue.append((x, y - 1))

    img.save(path, "PNG", optimize=True)


def remove_white_background(path: Path, tolerance: int = 28) -> None:
    remove_edge_background(path, is_near_white, tolerance)


def remove_black_background(path: Path, tolerance: int = 35) -> None:
    remove_edge_background(path, is_near_black, tolerance)


def main() -> int:
    targets = [Path(p) for p in sys.argv[1:]]
    if not targets:
        print("Usage: remove-logo-background.py <file.png> ...")
        return 1
    for path in targets:
        if not path.exists():
            print(f"skip missing: {path}")
            continue
        remove_white_background(path)
        remove_black_background(path)
        print(f"ok: {path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
