# ATELIER VÉRA — Haute Couture, Bespoke Fashion & Designer Archive

> *"Where ideas become designs. Discover creativity. Showcase talent. Connect independent couturiers with people who appreciate and commission their work."*

---

## 🌟 Executive Overview

**ATELIER VÉRA** is a world-class, editorial luxury fashion and dress-design marketplace platform. It replaces generic e-commerce templates with an artistic, high-fashion magazine experience inspired by **Vogue**, **Behance**, **Pinterest**, and the world’s most prestigious couture houses (Celine, Schiaparelli, The Row, Maison Margiela).

The platform seamlessly connects two core user types:
1. **Designers / Creators**: Independent couturiers, bridal dressmakers, avant-garde silhouette sculptors, and heritage embroiderers who chronicle their craftsmanship, build a verified portfolio, upload new creations, receive patron briefs, and manage custom commissions in a professional Creative Studio.
2. **Customers / Explorers**: Fashion patrons, brides, stylists, and collectors who discover singular creations, filter by fabric, weave, silhouette, and occasion, save to curated moodboards, and commission bespoke garments directly from the atelier.
3. **Curatorial Council (Admin)**: Editorial drop allocators who feature masterpieces, moderate listings, and review platform provenance.

---

## 💎 Design Direction & Aesthetics

- **Color Foundation**: Sophisticated warm alabaster & linen (`#F8F6F0`), deep obsidian (`#111111`), with delicate metallic champagne/bronze accents (`#C5A880`, `#8E735B`) and frosted glass panels.
- **Typography Identity**: High-contrast editorial serif (`Cormorant Garamond` & `Cinzel`) paired with contemporary sans-serif (`Plus Jakarta Sans`).
- **Visual Asymmetry**: Dynamic Pinterest-style masonry cards with variable aspect ratios (portrait, tall, square, wide) ensuring garments dominate the screen.
- **Micro-Interactions**: Smooth image zooms, high-definition artwork inspection zoom, animated category pills, and instant toast feedback.

---

## 🚀 Key Features & User Workflows

### 1. Cinematic Home Page (8-Section Experience)
- **Section 1**: Full-screen cinematic hero with large typography (`"WEAR YOUR IMAGINATION."`), auto-cycling haute couture slide statements, and direct action portals.
- **Section 2**: Animated platform manifesto (`"Where ideas become designs."`) articulating the dual designer-patron ecosystem.
- **Section 3**: Curated Drop of the Week showcasing an asymmetric editorial masterpiece.
- **Section 4**: Visual category tiles spanning Bridal, Traditional, Western Haute Couture, Avant-Garde, and Men's Couture.
- **Section 5**: Resident Visionaries carousel with follower counts, atelier credentials, and recent archives.
- **Section 6**: Trending Designs asymmetric masonry gallery.
- **Section 7**: Atelier Call to Action (`"Show the world what you can create."`).
- **Section 8**: Final cinematic CTA.

### 2. Discover & Search Engine
- Real-time debounced live search matching by design title, designer name, fabric (e.g. *Mulberry Silk Organza*, *Chantilly Lace*, *Banarasi Zari*), style, and location.
- Multi-dimensional filters: Made-to-measure customizable, commissions open, curator featured, occasion, and sort order.
- Dynamic masonry layout where every card reveals designer provenance, save count, price, and quick actions on hover.

### 3. Cinema-Grade Artwork Inspection (Design Detail View)
- Large full-screen visual viewer with thumbnail gallery and high-resolution zoom toggle.
- Couture story & muse inspiration narrative.
- Technical craft specifications: fabric & weave, silhouette, estimated production lead time, and color swatches.
- Direct Actions: **Request Custom / Inquire**, **♡ Save to Moodboard**, and **Share**.
- *"More from this Designer"* and *"You May Also Admire"* curatorial recommendations.

### 4. Direct Atelier Inquiry & Commission System
- Multi-intent inquiry modal:
  - *Custom Version* (measurements, alternate colors)
  - *Direct Purchase*
  - *Similar Design* (new commission)
  - *Editorial / Red Carpet Loan*
  - *General Atelier Consultation*
- Estimated budget selector, target event date, and custom notes.
- Inquiries transmit directly into the designer's Creative Studio inbox!

### 5. Designer Creative Studio (Dashboard)
- Studio visual language (obsidian & champagne palette) distinct from the public website.
- **Studio Overview**: Real-time KPI analytics (Portfolio Impressions, Moodboard Saves, Commission Rate, Active Inquiries) + recent inquiries queue.
- **My Designs Manager**: Filter by published, draft, or featured; toggle editorial feature badges; delete or edit.
- **Archive a New Creation (Upload Interface)**:
  - High-res cover image URL & gallery photos
  - Title, couture narrative, category, silhouette, occasion, fabric, price
  - Availability toggles (customizable, purchase, commission)
  - Muse inspiration notes and production lead time
- **Client Inquiries & Messaging Inbox**: Interactive message thread viewer with status manager (*Pending*, *In Discussion*, *Accepted*, *Completed*) and direct reply transmission.
- **Studio Analytics**: Weekly impression graphs and patron geographic origin analysis.
- **Atelier Profile Settings**: Live biography and location editing.

### 6. Explorer Collections & Moodboards
- **Saved Creations**: Private archive of favorited pieces with counter.
- **Moodboards**: Custom boards (e.g., *"Gala & Venice Biennale"*, *"Regal Heritage Bridal"*, *"Quiet Luxury Silk"*) with custom creation modal.
- **Followed Ateliers**: Feed of favorite resident couturiers.

### 7. Instant Role & Persona Switcher
- A persistent quick-switcher dropdown in the navigation header allows testing the platform from any perspective with a single click:
  - **Elena Rostova** (Paris Atelier Designer)
  - **Aarav Kapoor** (Heritage Zardozi Designer)
  - **Clara Bennett** (Patron / Explorer)
  - **Camille Dupré** (Curatorial Admin)

---

## 🗄️ Database Architecture (Supabase Ready)

The project includes a complete, production-ready PostgreSQL migration file in [`supabase_schema.sql`](file:///c:/Users/gumma/OneDrive/Desktop/dress%20designng/supabase_schema.sql):
- **Tables**: `profiles`, `designer_profiles`, `categories`, `designs`, `design_images`, `tags`, `design_tags`, `favorites`, `collections`, `collection_items`, `follows`, `inquiries`, `inquiry_messages`, `analytics_events`.
- **Row Level Security (RLS)**: Strict policies ensuring designers manage only their creations, patrons see only their inquiries, and published archives are globally accessible.

---

## 💻 Tech Stack

- **Framework**: React 19 + Vite 8 + TypeScript
- **Styling**: Tailwind CSS v4 + `@tailwindcss/vite` + Custom Editorial Layers
- **Icons**: Lucide React
- **Typography**: Google Fonts (*Cormorant Garamond*, *Cinzel*, *Plus Jakarta Sans*)
- **State Management**: Reactive React Context with automatic `localStorage` persistence

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start Vite development server
npm run dev
# Server runs on: http://localhost:5173/

# Verify production bundle build
npm run build
```
