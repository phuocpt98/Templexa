# Templexa Project Overview

Templexa is a Vietnamese template customization site. It contains the public website, product catalog, generated HTML templates, wedding invitation assets, and scripts for image conversion and deploy protection.

## Core Jobs

- Maintain the main public pages: home, product list, product detail, contact/pricing, admin utility pages.
- Generate and customize template products, especially wedding invitations.
- Clone and fix LadiPage wedding invitations under `products/Invitation/Wedding/`.
- Manage shared wedding assets, music, animations, and catalog data.
- Convert images to WebP and keep product references current.
- Verify mobile layout, animation timing, screenshots, and product metadata before delivery.

## Main Areas

- `assets/`: global CSS/JS/data for the Templexa website.
- `products/`: generated and customer-specific products.
- `products/shared/`: shared assets, wedding library, music, new asset intake.
- `wedding/`: wedding builder/customer area.
- `scripts/`: local Node utilities for WebP conversion, reference updates, deploy protection.
- `docs/`: product docs, system notes, memory, workflow docs.
- `.claude/`: legacy Claude commands and skills.
- `.templexa-devkit/`: canonical model-neutral agent harness.

## Active Product Types

- Website onepages, portfolios, education, e-commerce pages.
- Invitation products: wedding plus other events such as birthday, baby, anniversary.
- Google Sheet templates.

## Agent Goal

An agent should be able to receive a Templexa task, identify affected files, follow the correct workflow, make scoped edits, verify with local scripts/browser checks, and report what changed without damaging customer files or generated assets.

