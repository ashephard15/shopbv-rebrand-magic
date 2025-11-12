# The Beauty Vault - Complete Styling Guide

## Design System Overview

This document contains all the CSS, HTML structures, and styling information from The Beauty Vault e-commerce site. Use this to replicate the design in other projects.

---

## 1. Design Tokens (CSS Variables)

### Color Palette
```css
:root {
  /* Base Colors - All HSL */
  --background: 0 0% 100%;        /* Pure White */
  --foreground: 0 0% 9%;          /* Almost Black #171717 */

  --card: 0 0% 100%;              /* White cards */
  --card-foreground: 0 0% 9%;

  --popover: 0 0% 100%;
  --popover-foreground: 0 0% 9%;

  --primary: 14 100% 65%;         /* Coral/Salmon #FF7C5C */
  --primary-foreground: 0 0% 100%;

  --secondary: 0 0% 96%;          /* Light Gray #F5F5F5 */
  --secondary-foreground: 0 0% 9%;

  --muted: 0 0% 96%;
  --muted-foreground: 0 0% 45%;   /* Medium Gray #737373 */

  --accent: 14 100% 65%;
  --accent-foreground: 0 0% 100%;

  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 0 0% 100%;

  --border: 0 0% 90%;             /* Light border #E5E5E5 */
  --input: 0 0% 90%;
  --ring: 14 100% 65%;

  --radius: 0.25rem;              /* Minimal radius */

  /* Additional brand tokens */
  --ulta-coral: 14 100% 65%;
  --light-gray: 0 0% 96%;
  --medium-gray: 0 0% 45%;
  --dark-gray: 0 0% 9%;
}
```

### Typography
```css
/* Font Families */
font-family: {
  sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
  serif: ['Playfair Display', 'Georgia', 'serif'],
}

/* Font Imports */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Montserrat:wght@400;600;800&display=swap');
```

### Spacing & Borders
```css
/* Border Radius */
borderRadius: {
  lg: "var(--radius)",              /* 0.25rem */
  md: "calc(var(--radius) - 2px)",  /* 0.15rem */
  sm: "calc(var(--radius) - 4px)",  /* 0.0625rem */
}

/* Container */
container: {
  center: true,
  padding: "2rem",
  screens: {
    "2xl": "1400px",
  },
}
```

---

## 2. Animations

### Keyframes
```css
@keyframes accordion-down {
  from { height: 0; opacity: 0; }
  to { height: var(--radix-accordion-content-height); opacity: 1; }
}

@keyframes accordion-up {
  from { height: var(--radix-accordion-content-height); opacity: 1; }
  to { height: 0; opacity: 0; }
}

@keyframes fade-in {
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes fade-out {
  0% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(10px); }
}

@keyframes scale-in {
  0% { transform: scale(0.95); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes scale-out {
  from { transform: scale(1); opacity: 1; }
  to { transform: scale(0.95); opacity: 0; }
}

@keyframes slide-in-right {
  0% { transform: translateX(100%); }
  100% { transform: translateX(0); }
}

@keyframes slide-out-right {
  0% { transform: translateX(0); }
  100% { transform: translateX(100%); }
}
```

### Animation Classes
```css
.animate-fade-in { animation: fade-in 0.3s ease-out; }
.animate-fade-out { animation: fade-out 0.3s ease-out; }
.animate-scale-in { animation: scale-in 0.2s ease-out; }
.animate-scale-out { animation: scale-out 0.2s ease-out; }
.animate-accordion-down { animation: accordion-down 0.2s ease-out; }
.animate-accordion-up { animation: accordion-up 0.2s ease-out; }

.hover-scale {
  transition: transform 200ms;
}
.hover-scale:hover {
  transform: scale(1.05);
}
```

---

## 3. Button Component Styles

### Button Variants
```tsx
// Base button classes
"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"

// Variant: Default (Primary)
"bg-primary text-primary-foreground hover:bg-primary/90"

// Variant: Destructive
"bg-destructive text-destructive-foreground hover:bg-destructive/90"

// Variant: Outline
"border border-input bg-background hover:bg-accent hover:text-accent-foreground"

// Variant: Secondary
"bg-secondary text-secondary-foreground hover:bg-secondary/80"

// Variant: Ghost
"hover:bg-accent hover:text-accent-foreground"

// Variant: Link
"text-primary underline-offset-4 hover:underline"

// Size: Default
"h-10 px-4 py-2"

// Size: Small
"h-9 rounded-md px-3"

// Size: Large
"h-11 rounded-md px-8"

// Size: Icon
"h-10 w-10"
```

---

## 4. Navigation Component

### Top Banner
```tsx
<div className="bg-secondary text-foreground text-sm py-2 text-center">
  Free standard shipping on any $35 purchase
</div>
```

### Main Navigation Structure
```tsx
<nav className="sticky top-0 z-50 bg-background border-b border-border">
  <div className="container mx-auto px-4">
    {/* Top Row: Logo + Search + Actions */}
    <div className="flex items-center justify-between py-4">
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <img src={logo} alt="Logo" className="h-28 w-auto" />
      </Link>

      {/* Search Bar */}
      <div className="hidden md:flex flex-1 max-w-2xl mx-8">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search..."
            className="pl-10 w-full bg-secondary border-none focus-visible:ring-1"
          />
        </div>
      </div>

      {/* Right Actions: User + Cart + Menu */}
      <div className="flex items-center gap-4">
        {/* User Icon/Dropdown */}
        {/* Cart Icon with Badge */}
        {/* Mobile Menu Toggle */}
      </div>
    </div>

    {/* Bottom Row: Category Links */}
    <div className="hidden md:flex items-center justify-center gap-8 pb-4 border-t border-border pt-4">
      <Link className="text-sm font-medium hover:text-primary transition-colors">
        Category Link
      </Link>
    </div>
  </div>
</nav>
```

---

## 5. Hero Section - Featured Collections

### Hero Layout
```tsx
<section className="bg-background">
  <div className="bg-secondary/30 py-16">
    <div className="container mx-auto px-4">
      <h2 className="text-4xl md:text-5xl font-serif text-center mb-12 text-muted-foreground/80">
        Section Title
      </h2>
      
      <div className="grid md:grid-cols-3 gap-6">
        {/* Feature Card */}
        <Link 
          to="/link"
          className="group relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          <div className="aspect-[4/5] overflow-hidden relative">
            <img
              src={image}
              alt="Feature"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </div>
          
          {/* Text overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 className="text-2xl font-bold mb-2 drop-shadow-lg">
              Card Title
            </h3>
            <p className="text-white/90 mb-4 drop-shadow-md">
              Card description
            </p>
            <Button 
              className="bg-white text-gray-900 hover:bg-gray-100 rounded-full px-6"
              size="sm"
            >
              Shop Now
            </Button>
          </div>
        </Link>
      </div>
    </div>
  </div>
</section>
```

---

## 6. Promo Banners

### Promo Card Structure
```tsx
<section className="py-12 bg-gradient-to-b from-background to-secondary/20">
  <div className="container mx-auto px-4">
    <div className="grid md:grid-cols-3 gap-6">
      {/* Promo Card */}
      <Link
        to="/link"
        className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-100 via-pink-50 to-orange-50 p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in"
      >
        {/* Optional Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={bgImage}
            alt=""
            className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600/90 via-pink-600/90 to-rose-600/90" />
        </div>
        
        <div className="relative z-10 flex flex-col h-full min-h-[280px]">
          <div className="mb-4">
            <Icon className="h-8 w-8 text-white opacity-80" />
          </div>
          
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2 text-white">
              Promo Title
            </h3>
            <p className="text-lg font-medium mb-3 text-white opacity-90">
              Subtitle
            </p>
            <p className="text-sm text-white opacity-75 mb-6">
              Description
            </p>
          </div>

          <Button
            className="w-fit bg-white text-gray-900 hover:bg-gray-100 rounded-full px-6 shadow-md group-hover:scale-105 transition-transform"
          >
            CTA Text
          </Button>
        </div>

        {/* Decorative elements */}
        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute -left-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-xl" />
      </Link>
    </div>
  </div>
</section>
```

### Gradient Variants
```css
/* Light gradient (first card) */
from-rose-100 via-pink-50 to-orange-50
text: text-gray-900

/* Bold pink gradient (second card) */
from-fuchsia-600 via-pink-600 to-rose-600
text: text-white

/* Purple-pink gradient (third card) */
from-purple-600 via-pink-500 to-rose-500
text: text-white
```

---

## 7. Collections Grid

### Collection Card Layout
```tsx
<section className="py-16 bg-background">
  <div className="container mx-auto px-4">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Shop by Category
      </h2>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        Subtitle text
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <a
        href="/link"
        className="group relative overflow-hidden rounded-lg border border-border hover:shadow-lg transition-all"
      >
        <div className="aspect-[3/4] overflow-hidden bg-secondary">
          <img
            src={image}
            alt="Collection"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
          <h3 className="text-2xl font-bold mb-2">Collection Title</h3>
          <p className="text-sm mb-4 opacity-90">Description</p>
          <Button
            size="sm"
            className="bg-white text-black hover:bg-white/90 rounded-full"
          >
            Shop Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </a>
    </div>
  </div>
</section>
```

---

## 8. Product Grid (Shop Page)

### Product Card
```tsx
<div className="group flex flex-col h-full">
  <Link to={`/product/${slug}`} className="flex flex-col flex-1">
    {/* Product Image */}
    <div className="aspect-square bg-secondary/20 rounded-lg overflow-hidden mb-4">
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
    </div>

    {/* Product Name */}
    <h3 className="font-medium mb-2 group-hover:text-primary transition-colors line-clamp-2 min-h-[3rem]">
      {name}
    </h3>
    
    {/* Star Rating (if available) */}
    <div className="mb-3">
      {/* Rating stars component */}
    </div>
    
    {/* Price */}
    <div className="mb-3 mt-auto">
      {hasDiscount ? (
        <div className="flex items-center gap-2">
          <p className="text-xl font-bold text-destructive">
            ${price}
          </p>
          <p className="text-sm line-through text-muted-foreground">
            ${originalPrice}
          </p>
        </div>
      ) : (
        <p className="text-xl font-bold">
          ${price}
        </p>
      )}
    </div>
  </Link>

  {/* Add to Cart Button */}
  <Button className="w-full mt-auto">
    Add to Cart
  </Button>
</div>
```

### Grid Container
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* Product cards */}
</div>
```

---

## 9. Product Detail Page

### Layout Structure
```tsx
<div className="grid md:grid-cols-2 gap-8 lg:gap-12">
  {/* Left: Product Images */}
  <div className="space-y-4">
    <div className="aspect-square bg-secondary/20 rounded-lg overflow-hidden">
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-full object-cover"
      />
    </div>
  </div>

  {/* Right: Product Info */}
  <div className="space-y-6">
    <div>
      <h1 className="text-3xl font-bold mb-2">{name}</h1>
      <p className="text-muted-foreground">{description}</p>
    </div>

    {/* Rating */}
    <div className="py-3">
      {/* Star rating component */}
    </div>

    {/* Price */}
    <div className="mb-6 space-y-3">
      {hasDiscount ? (
        <div className="space-y-1">
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-destructive">
              ${salePrice}
            </span>
            <span className="text-xl line-through text-muted-foreground">
              ${regularPrice}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{currency}</p>
        </div>
      ) : (
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold">
            ${price}
          </span>
          <span className="text-muted-foreground">{currency}</span>
        </div>
      )}
    </div>

    {/* Add to Cart Button */}
    <Button className="w-full" size="lg">
      Add to Cart
    </Button>
    
    {/* Wishlist Button */}
    <Button variant="outline" className="w-full" size="lg">
      <Heart className="w-4 h-4 mr-2" />
      Add to Wishlist
    </Button>

    {/* Earn Points Banner */}
    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg">
      <div className="flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-primary" />
        <span className="font-medium">
          Earn points message
        </span>
      </div>
    </div>

    {/* Stock Status */}
    <div className="flex items-center gap-2 text-sm">
      <div className="w-2 h-2 bg-green-500 rounded-full" />
      <span className="text-muted-foreground">In Stock</span>
    </div>
  </div>
</div>
```

---

## 10. Footer Component

### Footer Structure
```tsx
<footer className="bg-secondary border-t py-12">
  <div className="container mx-auto px-4">
    <div className="grid md:grid-cols-4 gap-8">
      {/* About Column */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold">Brand Name</h3>
        <p className="text-sm text-muted-foreground">
          Tagline or description
        </p>
      </div>

      {/* Quick Links */}
      <div className="space-y-4">
        <h4 className="font-bold">Quick Links</h4>
        <ul className="space-y-2 text-sm">
          <li><a href="/" className="hover:text-primary transition-colors">Home</a></li>
          <li><a href="/products" className="hover:text-primary transition-colors">Products</a></li>
        </ul>
      </div>

      {/* Customer Service */}
      <div className="space-y-4">
        <h4 className="font-bold">Customer Service</h4>
        <ul className="space-y-2 text-sm">
          <li><a href="#" className="hover:text-primary transition-colors">Track Order</a></li>
          <li><a href="#" className="hover:text-primary transition-colors">Returns</a></li>
        </ul>
      </div>

      {/* Social Media */}
      <div className="space-y-4">
        <h4 className="font-bold">Follow Us</h4>
        <div className="flex gap-4">
          <a href="#" className="hover:text-primary transition-colors">
            <Facebook className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            <Instagram className="h-5 w-5" />
          </a>
        </div>
      </div>
    </div>

    <div className="mt-8 pt-8 border-t text-center">
      <p className="text-sm text-muted-foreground">
        © 2025 Brand Name. All rights reserved.
      </p>
    </div>
  </div>
</footer>
```

---

## 11. Cart Drawer/Modal

### Cart Drawer Structure
```tsx
<Sheet open={isOpen} onOpenChange={setIsOpen}>
  <SheetTrigger asChild>
    <Button variant="outline" size="icon" className="relative">
      <ShoppingCart className="h-5 w-5" />
      {itemCount > 0 && (
        <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-accent">
          {itemCount}
        </Badge>
      )}
    </Button>
  </SheetTrigger>
  
  <SheetContent className="w-full sm:max-w-lg flex flex-col h-full">
    <SheetHeader className="flex-shrink-0">
      <SheetTitle>Shopping Cart</SheetTitle>
      <SheetDescription>
        {itemCount} item(s) in your cart
      </SheetDescription>
    </SheetHeader>
    
    <div className="flex flex-col flex-1 pt-6 min-h-0">
      {/* Cart Items (scrollable) */}
      <div className="flex-1 overflow-y-auto pr-2 min-h-0">
        <div className="space-y-4">
          {/* Cart Item */}
          <div className="flex gap-4 p-2">
            <div className="w-16 h-16 bg-secondary/20 rounded-md overflow-hidden flex-shrink-0">
              <img src={itemImage} alt={itemName} className="w-full h-full object-cover" />
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="font-medium truncate">{itemName}</h4>
              <p className="font-semibold">${price}</p>
            </div>
            
            <div className="flex flex-col items-end gap-2 flex-shrink-0">
              {/* Delete Button */}
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Trash2 className="h-3 w-3" />
              </Button>
              
              {/* Quantity Controls */}
              <div className="flex items-center gap-1">
                <Button variant="outline" size="icon" className="h-6 w-6">
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-8 text-center text-sm">{quantity}</span>
                <Button variant="outline" size="icon" className="h-6 w-6">
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Cart Footer (Fixed) */}
      <div className="flex-shrink-0 space-y-4 pt-4 border-t bg-background">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">Total</span>
          <span className="text-xl font-bold">${total}</span>
        </div>
        
        <Button className="w-full" size="lg">
          <ExternalLink className="w-4 h-4 mr-2" />
          Checkout
        </Button>
      </div>
    </div>
  </SheetContent>
</Sheet>
```

---

## 12. Badge Component

### Badge Variants
```tsx
// Base badge classes
"inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"

// Variant: Default
"border-transparent bg-primary text-primary-foreground hover:bg-primary/80"

// Variant: Secondary
"border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"

// Variant: Destructive
"border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80"

// Variant: Outline
"text-foreground"
```

---

## 13. Input Component

### Input Styles
```tsx
<input
  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
/>
```

---

## 14. Common Utility Classes

### Spacing
```css
.container { @apply mx-auto px-4; }
.section-spacing { @apply py-16; }
```

### Text Styles
```css
.heading-1 { @apply text-4xl md:text-5xl font-bold; }
.heading-2 { @apply text-3xl md:text-4xl font-bold; }
.heading-3 { @apply text-2xl font-bold; }
.body-text { @apply text-base text-muted-foreground; }
.small-text { @apply text-sm text-muted-foreground; }
```

### Hover Effects
```css
.hover-lift {
  transition: all 300ms;
}
.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.hover-zoom img {
  transition: transform 300ms;
}
.hover-zoom:hover img {
  transform: scale(1.05);
}
```

### Gradients
```css
/* Text gradients */
.gradient-text {
  background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Background gradients */
.gradient-primary {
  background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)));
}

.gradient-soft {
  background: linear-gradient(180deg, rgba(255,255,255,0) 0%, hsl(var(--secondary)) 100%);
}
```

---

## 15. Responsive Breakpoints

```css
/* Tailwind default breakpoints */
sm: 640px   /* @media (min-width: 640px) */
md: 768px   /* @media (min-width: 768px) */
lg: 1024px  /* @media (min-width: 1024px) */
xl: 1280px  /* @media (min-width: 1280px) */
2xl: 1536px /* @media (min-width: 1536px) */
```

### Common Responsive Patterns
```tsx
{/* Mobile: 1 col, Tablet: 2 col, Desktop: 4 col */}
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"

{/* Hide on mobile, show on desktop */}
className="hidden md:flex"

{/* Show on mobile, hide on desktop */}
className="md:hidden"
```

---

## 16. Loading States

### Spinner
```tsx
<div className="text-center">
  <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
  <p className="text-lg text-muted-foreground">Loading...</p>
</div>
```

### Skeleton Loader
```tsx
<div className="animate-pulse">
  <div className="h-4 bg-secondary rounded w-3/4 mb-4"></div>
  <div className="h-4 bg-secondary rounded w-1/2"></div>
</div>
```

---

## 17. Empty States

```tsx
<div className="flex items-center justify-center py-32">
  <div className="text-center">
    <Icon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
    <p className="text-muted-foreground mb-4">No items found</p>
    <Button onClick={action}>Action Button</Button>
  </div>
</div>
```

---

## 18. Alert/Toast Styles

### Success Toast
```tsx
toast.success("Success!", {
  description: "Action completed successfully.",
  position: "top-center"
});
```

### Error Toast
```tsx
toast.error("Error!", {
  description: "Something went wrong.",
  position: "top-center"
});
```

---

## Implementation Notes

### For AI Prompts
When feeding this to an AI, use prompts like:

1. **"Using the design system from STYLING_GUIDE.md, create a [component name]"**
2. **"Apply the color palette and typography from STYLING_GUIDE.md to [existing code]"**
3. **"Create a responsive layout using the patterns in Section [X] of STYLING_GUIDE.md"**

### Key Design Principles
1. **Minimal Border Radius**: 0.25rem (4px) for clean, modern look
2. **Coral Primary Color**: HSL(14, 100%, 65%) - warm, inviting accent
3. **Clean Typography**: System fonts with Playfair Display for headings
4. **Subtle Animations**: Hover effects, smooth transitions (300ms standard)
5. **Responsive-First**: Mobile → Tablet → Desktop progression
6. **Semantic Color System**: Use HSL variables, never hard-coded colors

---

## Tailwind Config Summary

```typescript
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
```

---

## HTML Meta Tags

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>The Beauty Vault | Unlock Your Everyday Luxury</title>
    <meta name="description" content="Where Beauty Finds Its Moment. Curated luxury beauty products.">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Montserrat:wght@400;600;800&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

---

This comprehensive guide contains all styling, component structures, and design tokens from The Beauty Vault. Use it to replicate the design system in any framework or platform.
