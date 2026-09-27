---
title: Hand-drawn SVGs that draw themselves
description: The pathLength trick, a round-cap bug that took a minute to spot, and a filter that makes clean paths look sketched.
date: 2026-09-28T18:00:00Z
illustration: mountains
---

The drawings on this site are plain SVG paths on a 200 by 200 canvas: a few strokes in ink and one shape filled in clay. When one scrolls into view, its lines draw in one after another and the fill pops in last. No animation library, no canvas, no images.

## Drawing a line with a dash

The trick is an old one. Give the line a dash exactly as long as the path, push that dash out of view, then slide it back. Setting `pathLength="1"` means you never have to measure anything, because every path now reports a length of 1.

```html
<path d="M18 158 L72 76 L98 112 L128 58 L182 158" pathLength="1" />
```

```css
.s {
	stroke-dasharray: 1 2;
	stroke-dashoffset: 1;
}

.drawn .s {
	stroke-dashoffset: 0;
	transition: stroke-dashoffset 0.9s cubic-bezier(0.65, 0, 0.35, 1) var(--delay);
}
```

Each stroke gets its own `--delay`, 140ms apart, so the lines draw in the order they are written. The clay fill waits until the last stroke is done and then scales in with a small overshoot.

## The stray dot

My first version used `stroke-dasharray: 1`, which means a dash of 1 followed by a gap of 1. With round line caps, every hidden line showed a small dot at its far end before it was drawn.

The reason: with the dash pushed out by 1, the next dash in the pattern starts exactly where the path ends. It has zero length, but a zero-length dash with a round cap still paints a dot. Making the gap longer than the path (`1 2`) pushes the next dash off the path completely, and the dots disappear.

## Making it look hand-drawn

Clean geometric paths look like icons. One shared filter adds the wobble that makes them read as pen strokes:

```html
<filter id="rough">
	<feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="7" result="noise" />
	<feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" />
</filter>
```

The noise nudges every pixel by up to a few units. That is enough to turn a ruler line into something that looks drawn by hand, while keeping the paths themselves simple enough to write by hand too.

## Being polite about motion

An IntersectionObserver starts each drawing when it is 35% visible, and only once. If someone has reduced motion turned on, the script never adds the class that hides the lines, so they see the finished drawing and nothing moves.
