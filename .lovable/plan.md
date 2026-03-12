

# Jerusalem HC — Official Launch & Founding Membership Website

## Overview
A premium, cinematic single-page website for Jerusalem HC — Israel's first professional hockey club. Dark navy (#0B1F3B) and gold (#C8A44D) color scheme with dramatic sports aesthetics. Mobile-first responsive design.

## Design System
- **Colors**: Navy `#0B1F3B` (background), Gold `#C8A44D` (accents/CTAs), White `#FFFFFF` (text)
- **Typography**: Bold, athletic sans-serif headings; clean body text
- **Style**: Ice textures, dramatic lighting gradients, gold glow effects, cinematic feel

## Sections (in scroll order)

### 1. Hero Section
- Full-screen dark background with arena lighting/gradient effects
- Jerusalem HC logo (placeholder until uploaded), club name, tagline
- Two CTA buttons: "Become a Founding Member" / "Learn About The Project"
- Progress bar showing campaign status (Goal: $300,000 / 500 members) — static/editable values for now

### 2. The Vision
- "Building the Future of Israeli Hockey" — full vision text about the club's mission, European competition, INHL participation, 20+ home games per season

### 3. Team Identity
- Logo display, jersey mockups (home/away placeholders), color palette showcase
- Text about the Lion of Jerusalem crest and club identity

### 4. 2026 Season Plan
- Visual schedule block showing 40+ games breakdown:
  - 20 international vs European teams
  - Israeli INHL league games
  - Local rivalry games
  - International road trips
- Note about future European league membership

### 5. Founding Membership
- $600 USD contribution details with both one-time and installment (e.g., 3x $200) options
- Full benefits list (jersey, merch pack, digital season ticket, VIP giveaway entry, 20% discount, Founders Wall)
- Stripe checkout button (will be connected when Stripe is enabled)

### 6. VIP Trip Giveaway
- Prize details: trip for two to Israel with flights, hotel, VIP access to 3 games, meet & greet

### 7. Founders Wall
- Dynamic grid displaying founding member names (placeholder data for now: "Founding Member #001", #002, etc.)
- Designed to be easily connected to a database later

### 8. Game Experience
- Arena/fan imagery placeholders with text about professional game production and international opponents

### 9. Final CTA
- "Join The Founding Members of Jerusalem HC" with two buttons: Become a Founding Member / Share the Campaign

## Technical Notes
- Single-page React app with smooth scroll navigation
- All campaign numbers (members, dollars raised) stored in a simple config/state for easy updates
- Stripe integration placeholder — will enable Stripe connector in implementation phase
- Placeholder images throughout, ready for asset upload/replacement
- Share button using Web Share API with clipboard fallback

