# Beauty Vault E-commerce Frontend

A modern, responsive e-commerce frontend for The Beauty Vault built with React, Vite, and Tailwind CSS.

## Features

- **Home Page**: Hero section with featured collections and category browsing
- **Shop Page**: Product catalog with filtering and search functionality
- **Rewards Page**: Comprehensive loyalty program with membership tiers
- **Shopping Cart**: Add products to cart with quantity tracking
- **Responsive Design**: Mobile-first design that works on all devices
- **Modern UI**: Clean, professional design with smooth interactions

## Tech Stack

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful, customizable icons

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone or download this project
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

Create a production build:
```bash
npm run build
```

### Preview

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── BeautyVault.jsx    # Main component with all pages
├── App.jsx            # Root app component
├── main.jsx           # Application entry point
└── index.css          # Global styles with Tailwind directives
```

## Features Overview

### Home Page
- Hero banner with call-to-action
- Featured product collections
- Category browsing cards
- Member benefits showcase

### Shop Page
- Product grid with images and details
- Category filtering
- Search functionality
- Add to cart functionality

### Rewards Page
- Membership tier system (Insider, VIP, Elite)
- Points redemption system
- Benefits breakdown
- How-it-works section

### Shopping Cart
- Add products with quantity tracking
- Cart icon with item count
- Expandable cart view (ready for implementation)

## Customization

The application uses Tailwind CSS for styling, making it easy to customize:

- Colors: Modify the color palette in `tailwind.config.js`
- Components: Update styles directly in the component files
- Layout: Adjust spacing and layout using Tailwind utilities

## Product Data

The application includes sample product data with real Shopify CDN images. You can easily replace this with your own product data by updating the `products` array in `BeautyVault.jsx`.

## Future Enhancements

- Shopping cart sidebar/modal
- User authentication
- Product detail pages
- Checkout process
- API integration
- State management (Redux/Zustand)
- Payment processing

## License

This project is open source and available under the MIT License.