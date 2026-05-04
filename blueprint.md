# VYBE - Creator Platform Blueprint

## Overview
VYBE is a next-generation creator platform designed to connect Z-generation creators with businesses. The redesign shifts from an "Aurora" aesthetic to a "High-Performance AI" aesthetic inspired by Cal AI, focusing on high contrast, dark mode, and vibrant accents.

## Project Structure
- `index.html`: Entry point.
- `style.css`: Global styles, CSS variables (updated to Dark/Neon), and layout.
- `main.js`: Application logic and Web Component definitions.

## Features & Design (New Style)
### Visual Identity
- **Vibe**: Elite Performance, High-Tech, Clean.
- **Color Palette**: 
  - Background: Deep Black (`#000000`) to Charcoal (`#0A0A0A`).
  - Accent: Neon Lime (`oklch(85% 0.2 145)`) for CTAs and highlights.
  - Text: High-contrast White for titles, Muted Zinc (`#A1A1AA`) for subtext.
- **Typography**: Pretendard (Bold/Extra-Bold for headings, Medium for body).
- **Layout**: 
  - **Bento Grid**: Used for the features/style section.
  - **Centered Hero**: Focused, high-impact messaging.
- **Effects**: 
  - **Glassmorphism**: 1px thin borders (`rgba(255,255,255,0.1)`) with `backdrop-filter: blur(12px)`.
  - **Background Glow**: Large, soft blurred blobs of Neon Lime and Deep Indigo.
  - **Animations**: Smooth fade-in on scroll and subtle hover-scaling.

## Implementation Plan

### Phase 5: Cal AI Inspired Redesign
- [x] Update `style.css` variables for the new Dark/Neon palette.
- [x] Refine `aurora-container` to use Neon Lime glow blobs on a black base.
- [x] Update `vybe-header` with a cleaner, more minimal glassmorphism.
- [x] Redesign `style-card` to fit a Bento Grid layout.
- [x] Update `vybe-button` to the high-contrast Neon Lime style.
- [x] Implement smooth scroll reveal animations for all sections.
- [x] Audit all components for visual consistency with the "Elite" vibe.
