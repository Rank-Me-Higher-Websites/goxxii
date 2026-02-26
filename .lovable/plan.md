

## Root Cause

The hero content overflows on mobile because:

1. **Buttons are too large**: `size="lg"` gives `h-14 px-6` — two buttons side-by-side with gap exceed the ~360px mobile viewport minus container padding (2×16px = 32px).
2. **Stats row**: Three stat items don't wrap early enough on very small screens.
3. **No width constraint on the content column**: The left column doesn't have `overflow-hidden` or `max-w-full`, so children can push past the viewport edge.

## Fix Plan

### 1. Make CTA buttons smaller on mobile
- Change both buttons from `size="lg"` to use responsive sizing: use default size on mobile, `lg` on `sm:` and up
- Alternatively, keep `size="lg"` but override padding on mobile with a class like `px-4 sm:px-6`

### 2. Constrain the content column
- Add `overflow-hidden` and `max-w-full` to the left column `<div>` (line 36) to prevent any child from exceeding bounds

### 3. Ensure stats row fits
- The stats row already has `flex-wrap` and `gap-3`, which should be fine once the column is constrained

### Files to edit
- `src/components/sections/HeroSection.tsx`
  - Line 36: Add `overflow-hidden` to left column div
  - Lines 129-145: Reduce button sizes on mobile — switch to `size="default"` with `sm:h-14 sm:px-10` overrides, or use smaller text/padding on mobile

