

Remove the special gradient highlight from "Fleet Program" (index 2) in the Drivers dropdown by removing the conditional class on line 103.

**Change in `src/components/layout/Navbar.tsx` (line 102-104):**
- Remove the `index === 2` conditional styling so all three dropdown links share the same plain style: `block px-4 py-2 text-sm transition-colors hover:bg-primary/10 hover:text-primary`

