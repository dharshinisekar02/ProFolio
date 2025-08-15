# Ultra Klensing Cleaning Services

## Overview

Ultra Klensing is a professional cleaning services company website built as a static multi-page site. The website showcases comprehensive cleaning solutions for hospitals, residential properties, and corporate spaces. The site emphasizes professionalism, quality service, and uses hospital-grade cleaning supplies with eco-friendly solutions. It serves as a marketing platform to attract potential clients and provide information about services, pricing, testimonials, and contact options.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Technology Stack**: Pure HTML5, CSS3, and vanilla JavaScript
- **Design Pattern**: Multi-page static website with shared navigation and consistent styling
- **Responsive Design**: Mobile-first approach using CSS Grid and Flexbox
- **Component Structure**: Modular CSS with reusable components across pages

### Page Structure
- **Core Pages**: 7 main pages (index, services, pricing, gallery, about, testimonials, contact)
- **Navigation**: Consistent header with hamburger menu for mobile using CSS-only checkbox hack
- **Layout**: Shared header/footer structure with page-specific content sections

### Styling Architecture
- **CSS Variables**: Centralized design system with color palette, typography, spacing, and breakpoints
- **Typography**: Google Fonts integration (Poppins for headings, Inter for body text)
- **Color Scheme**: Professional palette with deep teal primary (#0F766E), mint accent (#14B8A6), and neutral grays
- **Component-Based CSS**: Modular styling with reusable classes for buttons, cards, and layout elements

### JavaScript Features
- **Navigation**: Sticky header behavior and mobile menu functionality
- **Form Validation**: Client-side validation for contact forms
- **Gallery**: Image filtering and load-more functionality
- **Accessibility**: Screen reader support and keyboard navigation
- **Smooth Scrolling**: Enhanced user experience for internal page navigation

### SEO & Performance
- **Meta Tags**: Comprehensive SEO optimization with Open Graph and Twitter Card tags
- **Structured Data**: JSON-LD schema markup for local business
- **Semantic HTML**: Proper heading hierarchy and ARIA labels
- **Performance**: Optimized CSS with efficient selectors and minimal JavaScript

## External Dependencies

### Web Fonts
- **Google Fonts**: Poppins and Inter font families imported via CSS @import
- **Fallback Fonts**: System font stack for reliability

### Icons
- **Feather Icons**: Lightweight SVG icon library for UI elements
- **Custom Favicon**: Site-specific branding asset

### Assets Structure
- **Images**: Placeholder structure for hero images, team photos, and service galleries
- **Icons**: SVG placeholder structure for scalable graphics
- **Static Files**: robots.txt for search engine crawling, sitemap.xml for SEO

### Browser Compatibility
- **Modern Browsers**: Built for current browser standards with CSS Grid and Flexbox
- **Progressive Enhancement**: Graceful degradation for older browsers
- **Accessibility**: WCAG compliance with semantic markup and ARIA attributes