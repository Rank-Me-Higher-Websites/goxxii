

## Performance Analysis

The site has several sources of lag:

### 1. FloatingShapes component (biggest offender)
- **5 framer-motion elements** with `repeat: Infinity` animations running continuously on every frame
- All have large `blur-[100px]+` filters which are GPU-expensive
- This component is `fixed inset-0` so it's always active, never offscreen
- Animating `x`, `y`, `scale`, and `opacity` on blurred elements forces constant GPU compositing

### 2. HeroSection background blobs
- 3 additional large blurred elements, one with `animate-pulse` (CSS infinite animation)
- Plus `animate-ping` on the urgency badge dot

### 3. Wistia video embed
- External script loaded via `dangerouslySetInnerHTML` in the hero

### 4. TrustIndex widget
- External script loaded in ReviewsWidgetSection

### 5. Google Maps iframe
- Always loaded, even when not visible

---

## Fix Plan

### Step 1: Replace FloatingShapes with static CSS gradients
Remove all 5 infinite framer-motion animations. Replace with static CSS `background` gradients on the layout wrapper — same visual effect, zero JS animation cost.

**File:** `src/components/FloatingShapes.tsx`
- Remove all `motion.div` elements with `repeat: Infinity`
- Use pure CSS with static positioned blurred divs (no animation) or a single CSS radial-gradient background

### Step 2: Remove HeroSection background blob animations
**File:** `src/components/sections/HeroSection.tsx`
- Remove `animate-pulse` from the hero gradient blobs (lines 22-24) — make them static
- Keep the small `animate-ping` on the badge dot (it's tiny and acceptable)

### Step 3: Lazy-load heavy third-party embeds
**File:** `src/components/sections/ReviewsWidgetSection.tsx`
- Only load the TrustIndex script when the section scrolls into view (use the existing `isInView` state)

**File:** `src/components/sections/LocationMapSection.tsx`  
- Wrap the Google Maps iframe in a lazy-load — only render when section is in viewport using `useInView`

These changes will eliminate the continuous GPU-heavy animations that cause the perceived lag while keeping the visual design intact.

