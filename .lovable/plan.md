

## Plan: Add Independent Parallax to Stats & "Why Drivers Choose Us"

### Problem
The stats grid and "Why Drivers Choose Us" block move with the entire right column but don't fill the empty space below them on scroll.

### Approach
Separate the stats grid and "Why Drivers Choose Us" into their own `motion.div` with an additional, stronger parallax transform. They'll still be inside the right column (inheriting its movement) but get extra downward travel to fill the gap below.

### Changes in `src/components/sections/FreightServicesSection.tsx`

1. Add a new ref (`bottomRef`) and compute a separate `maxBottomShift` based on remaining empty space below the right column content
2. Create a second `useTransform` (`bottomY`) with a wider scroll range so the bottom content travels further
3. Wrap lines 151-188 (stats grid + "Why Drivers Choose Us") in a `motion.div` with `style={{ y: bottomY }}`
4. Adjust scroll mapping to `[0.3, 0.9]` so the bottom content starts moving later and continues longer than the main column shift

