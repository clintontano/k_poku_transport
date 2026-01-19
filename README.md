# K Poku Transport LLC - Website

A modern, professional website for K Poku Transport LLC, a Non-Emergency Medical Transportation (NEMT) company.

## Overview

This website presents K Poku Transport LLC as a reliable, safe, and professional medical transport provider. It's designed to build trust with patients, hospitals, clinics, and families while allowing users to easily understand services and request transportation.

## Features

- **Modern Design**: Clean, healthcare-appropriate color palette with professional aesthetics
- **Fully Responsive**: Optimized for mobile, tablet, and desktop devices
- **Accessibility**: WCAG-compliant with proper semantic HTML and ARIA labels
- **SEO Optimized**: Meta tags, semantic structure, and descriptive content
- **Smooth Animations**: Subtle transitions and scroll animations
- **Contact Form**: Functional form with validation for transportation requests
- **Fast Performance**: Optimized CSS and JavaScript for quick loading

## Pages & Sections

1. **Home** - Hero section with value proposition and call-to-action buttons
2. **About Us** - Company background, mission, and values
3. **Services** - Comprehensive list of transportation services offered
4. **Why Choose Us** - Key differentiators and benefits
5. **Contact/Request Transport** - Contact form and company information
6. **Footer** - Company details and quick links

## Technology Stack

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS variables and Flexbox/Grid
- **Vanilla JavaScript**: No dependencies, pure JavaScript for interactivity
- **Google Fonts**: Inter font family for professional typography

## File Structure

```
k_poku_transport/
├── index.html      # Main HTML file
├── styles.css      # All styling and responsive design
├── script.js       # JavaScript for interactivity
└── README.md       # This file
```

## Getting Started

### Option 1: Open Directly in Browser
Simply open `index.html` in your web browser - no setup required!

### Option 2: Run Development Server (Recommended)

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```
   or
   ```bash
   npm start
   ```

3. The website will automatically open in your browser at `http://localhost:3000`

The development server will automatically reload when you make changes to the files.

## Customization

### Colors

Edit CSS variables in `styles.css`:

```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #10b981;
    /* ... */
}
```

### Contact Information

Update contact details in:
- `index.html` - Phone number and email in contact section and footer
- `script.js` - Form submission endpoint (currently logs to console)

### Content

All content is in `index.html` and can be easily edited. The structure is semantic and well-commented.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Optimized CSS with minimal redundancy
- Vanilla JavaScript (no framework overhead)
- Lazy loading support for images
- Smooth scroll behavior
- Reduced motion support for accessibility

## Accessibility Features

- Semantic HTML5 elements
- ARIA labels where appropriate
- Keyboard navigation support
- Focus indicators
- High contrast ratios
- Screen reader friendly
- Reduced motion support

## SEO Features

- Meta description and keywords
- Semantic HTML structure
- Descriptive alt text ready for images
- Proper heading hierarchy
- Clean URL structure

## Form Handling

The contact form includes:
- Client-side validation
- Phone number formatting
- Date validation (prevents past dates)
- Email validation
- Success/error messaging

**Note**: Currently, form submissions are logged to the console. To enable actual form submission, integrate with a backend service or email service provider.

## Future Enhancements

Potential additions:
- Backend integration for form submissions
- Image gallery
- Testimonials section
- Blog/news section
- Online booking system
- Live chat integration
- Multi-language support

## License

© 2024 K Poku Transport LLC. All rights reserved.

## Support

For questions or support, contact:
- Email: info@kpokutransport.com
- Phone: (123) 456-7890

---

Built with care for K Poku Transport LLC.

