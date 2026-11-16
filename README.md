# HVAC Pro

A premium, Elementor-ready WordPress theme for air conditioning, ventilation, refrigeration and other HVAC / home-services businesses.

This repo contains **theme code and demo/placeholder content only** — no real client branding, copy, contact details or photography. Any real business that installs the theme adds its own logo, colours, contact details and page content entirely through the WordPress admin (Customizer + Elementor); none of that lives in this repository.

## What the theme provides

- A navy & cooling-blue design system (buttons, cards, process steps, testimonial slider, contact/enquiry form styling, etc.) in `assets/css/theme.css` — fully class-based, so it can be applied to Elementor sections/widgets via the "CSS Classes" advanced setting.
- A sticky header with a top info bar, primary menu, mobile drawer nav, and a "Get a Free Quote" button — built from `wp_nav_menu()` and Customizer fields, not hard-coded text.
- A 4-column footer driven by two menu locations (`footer-links`, `footer-services`) plus a legal links menu (`footer-legal`).
- A full Customizer panel ("HVAC Pro Theme Options") for brand colours, logo (via native Site Identity), phone/email/address/hours, social links, footer about text and the quote-button link.
- `page.php` is a blank canvas — it just outputs `the_content()`, so every page's actual content and layout is built and edited in Elementor (or the block editor), never in PHP.

## Requirements

- WordPress 6.0+
- Elementor (free or Pro) for building page content
- PHP 7.4+

## Setup

1. Upload the `hvac-pro-elementor` folder to `wp-content/themes/` and activate it.
2. Go to **Appearance → Customize → HVAC Pro Theme Options** and set your logo, colours, contact details and socials.
3. Go to **Appearance → Menus** and assign menus to the *Primary Navigation*, *Footer — Quick Links*, *Footer — Services* and *Footer — Legal* locations.
4. Build each page's content with Elementor.

## License

GPLv2 (or later), same as WordPress itself.
