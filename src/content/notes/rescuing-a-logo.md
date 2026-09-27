---
title: Rescuing a 357-pixel logo
description: How I turned an old raster logo and a colour illustration into small, sharp SVGs that follow the theme.
date: 2026-09-28T15:00:00Z
illustration: notebook
---

The only copy of my RS monogram was a 357 by 172 WebP from my old site. On a retina screen it looked soft, and it could not change colour for dark mode. Redrawing it by hand would have lost the exact angles, so I traced it instead.

## Tracing the logo

Potrace turns black-and-white bitmaps into smooth curves, but it traces exactly what you give it, including every jagged edge of a small image. So the work is mostly in preparing the input:

1. Crop to the mark and upscale it 8 times with Lanczos resampling.
2. Blur it slightly, then threshold it back to pure black and white. Together, the blur and the threshold smooth the stair-steps into clean edges.
3. Trace it, then round every coordinate to a whole number. At that scale nobody can see the difference, and the path shrinks to about 5 KB.

The finished SVG uses `fill="currentColor"`, so the logo is dark on the light theme and light on the dark one, with no second file.

## A two-tone portrait

The drawing at the top of my home page started as a full-colour illustration. I split it into layers by colour and traced each one:

- **Ink:** every very dark pixel, which covers the hair, beard, glasses and outlines.
- **Shirt:** the blue areas, kept in their original blue.
- **Backing:** a flood fill from the corners of the image gives the outline of the whole figure.

The backing becomes a light shape behind everything else. Without it, the ink hair would vanish into the dark theme's background. With it, the portrait reads like a sticker in both themes.

## Painting it in

Traced shapes are fills, not strokes, so the line-drawing trick I use for my other illustrations does not work on them. Instead, each layer sits under a mask that contains one very thick zigzag stroke. Animating that stroke's dash sweeps it across the canvas, and the layer appears behind it as if someone were colouring it in: ink first, then the shirt.

Three traced layers come to about 29 KB, smaller than most photos, and they stay sharp at any size.
