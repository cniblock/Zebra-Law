# Image Optimization Guide

Several images on the site are very large and slow down page loading. The codebase now uses lazy loading to defer loading until needed, but **resizing and compressing the source images** will give the biggest improvement.

## Current large images (as of review)

| Image | Size | Display size | Suggested target |
|-------|------|--------------|------------------|
| zebra_team_*.jpg (5 files) | 10–14 MB each | ~220×293px | 440×586px, ~80 KB each |
| zebra_header_3.jpg | ~10 MB | Full-width hero | 1920px wide, ~300 KB |
| zebra_banner_image_1.jpg | ~6 MB | Quote section | 1920px wide, ~300 KB |
| OG_image.png | ~5 MB | Social preview 1200×630 | 1200×630px, ~200 KB |
| zebra_contact_image.jpg | ~1.5 MB | Contact hero | 1920px wide, ~300 KB |
| zebra_header_6.jpg, zebra_header_7.jpg | ~2.6 MB each | Hero slideshow | 1920px wide, ~300 KB |

## Recommended actions

1. **Team photos** (`images/zebra_team_*.jpg`): Resize to 440×586px (2× display size for retina). Use JPEG quality 80–85. Target ~50–80 KB per image.

2. **Hero images** (`images/hero-banner-images/*.jpg`): Resize to max 1920px width. Use JPEG quality 80. Target ~200–400 KB per image.

3. **OG_image.png**: Resize to 1200×630px for social sharing. Use PNG or JPEG. Target ~150–250 KB.

4. **Other large images**: Resize to max 1920px width, JPEG quality 80.

## Tools

- [Squoosh](https://squoosh.app/) – browser-based, supports WebP
- [ImageOptim](https://imageoptim.com/) (Mac) – drag and drop
- [TinyPNG](https://tinypng.com/) – PNG/JPEG compression

## What’s already in place

- **Hero slideshow**: Only the first visible slide loads; others load when they’re about to appear.
- **Team images**: Use `loading="lazy"` so they load when the team section is near the viewport.
- **News grid & article images**: Use `loading="lazy"` and `decoding="async"`.
- **First hero image**: Preloaded on the homepage for faster first paint.
