# Zebra Law Website

A modern, responsive website for Zebra Law - a tech oriented, boutique legal firm specialising in the Insurance Sector.

## Overview

Zebra Law offers innovative legal services designed to support the Insurance Sector, especially the disruptive MGA market. With over 35 years' combined experience in Defendant PI, telematics, fraud, and large loss claims.

**Live site:** [https://www.zebra.law](https://www.zebra.law)

## Features

- Responsive design for all devices
- Hero image slideshow with random rotation
- Smooth scroll animations
- Cookie consent banner (GDPR compliant)
- SEO optimised with Open Graph and Twitter meta tags
- Google Fonts (Exo, Inter)

## Tech Stack

- HTML5
- CSS3 (vanilla)
- JavaScript (vanilla)
- No frameworks or build tools required

## Structure

```
ZEBRA_WEBSITE/
├── index.html          # Homepage
├── services.html       # Services page
├── styles.css          # Main stylesheet
├── script.js           # JavaScript functionality
├── favicon/            # Favicon files
├── images/             # Image assets
│   └── hero-banner-images/  # Slideshow images
├── logo/               # Logo files
├── pdfs/               # Legal documents
└── team/               # Team member pages
    ├── colin-bushell.html
    ├── sunil-nannar.html
    ├── kash-rafiq.html
    ├── chris-bakker.html
    └── joanna-nannar.html
```

## Local Development

To run locally, use any static file server:

```bash
# Python
python -m http.server 8080

# Node.js (npx)
npx serve

# VS Code Live Server extension
```

Then open `http://localhost:8080` in your browser.

## Deployment

This is a static website that can be deployed to any static hosting service:

- GitHub Pages
- Netlify
- Vercel
- AWS S3

## Customisation

### Hero Slideshow Images

Edit the image list in `script.js`:

```javascript
const heroImages = [
  "zebra_header_1.jpg",
  "zebra_header_3.jpg",
  // Add or remove images here
];
```

### Slideshow Timing

Change the interval in `script.js`:

```javascript
const slideInterval = 10000; // milliseconds
```

## Legal

- **Company:** Zebra Law Ltd
- **Registration:** England and Wales, Company Number 14541910
- **SRA Registration:** 8003681
- **Address:** Blackbox, Beech Lane, Wilmslow, SK9 5ER

## License

© Zebra Law Ltd. All rights reserved.
