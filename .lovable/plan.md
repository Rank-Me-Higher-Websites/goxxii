

## Fix: Pass the mountain truck image directly to the home page SEOContentSection

**Problem**: The home page `SEOContentSection` (line 70 in `Index.tsx`) doesn't pass a `sideImage` prop. It relies on a `defaultImages` fallback inside the component, but the image isn't rendering correctly.

**Solution**: Explicitly pass the image as a prop in `Index.tsx`, matching how `CompanyDrivers.tsx` already does it.

### Changes

**`src/pages/Index.tsx`**:
1. Import the mountain truck image: `import xxiiMackMountains from "@/assets/xxii-mack-mountains.jpg";`
2. Update line 70 to pass the image directly:
   ```tsx
   <SEOContentSection 
     pageKey="home" 
     sideImage={xxiiMackMountains} 
     sideImageAlt="XXII Century Mack truck in snowy mountains" 
   />
   ```

This ensures the image is explicitly provided via ES6 import rather than relying on the internal fallback mapping.

