// Parsed product data from Shopify export
export interface Product {
  handle: string;
  title: string;
  description: string;
  vendor: string;
  category: string;
  type: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  tags: string[];
  published: boolean;
  variants?: ProductVariant[];
}

export interface ProductVariant {
  title: string;
  price: number;
  compareAtPrice?: number;
  image?: string;
}

export const products: Product[] = [
  {
    handle: "nude-matte-revolution-lipstick",
    title: "Nude Matte Lipstick",
    description: "The Nude Matte Lipstick offers a muted nude-rose shade that suits all skin tones. Its moisturizing matte formula, with Lipstick Tree Extract, provides up to 10 hours of wear and a smooth finish. The contoured tip helps apply the color easily and precisely. Inspired by 90s supermodel style, this lipstick delivers a natural, elegant look perfect for any occasion.",
    vendor: "The Beauty Vault",
    category: "Lip Makeup",
    type: "Makeup",
    price: 31.00,
    compareAtPrice: 35.00,
    image: "https://cdn.shopify.com/s/files/1/0766/5254/4213/files/Untitled_800x800px_1.png?v=1760893295",
    tags: [],
    published: true
  },
  {
    handle: "blush",
    title: "Blush",
    description: "NARS Blush offers long-lasting color for up to 16 hours with a lightweight, comfortable feel. Its smooth, blendable formula enhances your skin while softening imperfections. Made with a special pigment blend, this blush delivers true, vibrant color and a flawless finish. Select shades come in refillable compacts for a more sustainable option.",
    vendor: "The Beauty Vault",
    category: "Face Makeup",
    type: "Makeup",
    price: 31.99,
    compareAtPrice: 36.00,
    image: "https://cdn.shopify.com/s/files/1/0766/5254/4213/files/Untitled_800x800px_10.png?v=1760323283",
    tags: [],
    published: true
  },
  {
    handle: "luxury-eyeshadow-palette",
    title: "Luxury Eyeshadow Palette",
    description: "Charlotte Tilbury's Luxury Eyeshadow Palette features four shades—Prime, Enhance, Smoke, and Pop—in a smooth, long-lasting formula. Easily create looks that transition from day to night with warm bronzes, golds, reds, and purples.",
    vendor: "The Beauty Vault",
    category: "Eye Makeup",
    type: "Makeup",
    price: 42.00,
    compareAtPrice: 48.00,
    image: "https://cdn.shopify.com/s/files/1/0766/5254/4213/files/Untitled_800x800px_9.png?v=1760322123",
    tags: [],
    published: true
  },
  {
    handle: "fenty-beauty-gloss-bomb-universal-lip-luminizer-copy-copy",
    title: "Luminizer + Plumper Lip Gloss",
    description: "Turn up the temperature. Brings the shine and the sting with a lip-loving plump that delivers instant volume and sultry sheen. The innovative plump job complex combines ginger root oil and capsicum fruit extract to gently warm your lips, making them look fuller and smoother with every swipe. The finish? A wet-look shine that catches light from every angle—never sticky, always seductive.",
    vendor: "The Beauty Vault",
    category: "Lip Makeup",
    type: "Makeup",
    price: 21.99,
    compareAtPrice: 26.00,
    image: "https://cdn.shopify.com/s/files/1/0766/5254/4213/files/Untitled_800x800px_4.png?v=1760319134",
    tags: ["ds", "heat"],
    published: true,
    variants: [
      {
        title: "Fussy Heat",
        price: 21.99,
        compareAtPrice: 4.58,
        image: "https://cdn.shopify.com/s/files/1/0766/5254/4213/files/Untitled_800_x_800_px_3_4f871f6a-3771-43bc-acba-f2c0c4ba8fff.png?v=1760319187"
      },
      {
        title: "Hot Cherry",
        price: 21.99,
        compareAtPrice: 26.00,
        image: "https://cdn.shopify.com/s/files/1/0766/5254/4213/files/Untitled_800x800px_4.png?v=1760319134"
      }
    ]
  },
  {
    handle: "fenty-beauty-gloss-bomb-universal-lip-luminizer-copy-1",
    title: "Lip Cream",
    description: "Creamy, dreamy, and dripping in color. Delivers full-intensity pigment with the same shine and cushiony comfort you love from the original Gloss Bomb. Each swipe lays down rich color that melts onto your lips—no shimmer, no stickiness, just smooth, creamy perfection. Packed with shea butter and vitamin A to nourish while you wear it, this gloss gives you a juicy finish that feels as luxe as it looks.",
    vendor: "The Beauty Vault",
    category: "Lip Makeup",
    type: "Makeup",
    price: 21.99,
    compareAtPrice: 26.00,
    image: "https://cdn.shopify.com/s/files/1/0766/5254/4213/files/Untitled_800_x_800_px_8.png?v=1760320181",
    tags: ["cream", "ds"],
    published: true,
    variants: [
      {
        title: "Fenty Glow 02",
        price: 21.99,
        compareAtPrice: 26.00,
        image: "https://cdn.shopify.com/s/files/1/0766/5254/4213/files/Untitled_800_x_800_px_8.png?v=1760320181"
      },
      {
        title: "Honey Waffles",
        price: 21.99,
        compareAtPrice: 26.00,
        image: "https://cdn.shopify.com/s/files/1/0766/5254/4213/files/Untitled_800_x_800_px_5_e9ca0f05-e90a-4203-97b7-0a1199a35e02.png?v=1760320415"
      }
    ]
  },
  {
    handle: "12-piece-all-purpose-makeup-sponge-set",
    title: "12-Piece All-Purpose Makeup Sponge Set",
    description: "12-Piece All-Purpose Makeup Sponge Set, Made of 3 Loose Powder Puffs, 3 Mini Air Cushion Puffs, 3 Beauty Eggs and 3 Mini Beauty",
    vendor: "The Beauty Vault",
    category: "Tools & Brushes",
    type: "Makeup",
    price: 19.99,
    image: "https://cdn.shopify.com/s/files/1/0766/5254/4213/files/Sde097a2d49d047deacdf999180298f5eX.webp?v=1760215720",
    tags: [],
    published: true,
    variants: [
      { title: "Dark Brown", price: 19.99 },
      { title: "05", price: 19.99 },
      { title: "08", price: 19.99 },
      { title: "06", price: 19.99 },
      { title: "Grey", price: 19.99 },
      { title: "Rose Red", price: 19.99 },
      { title: "Coffee", price: 19.99 },
      { title: "Green", price: 19.99 },
      { title: "Multicolor", price: 19.99 }
    ]
  }
];

export const getProductByHandle = (handle: string): Product | undefined => {
  return products.find(p => p.handle === handle);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(p => p.category.toLowerCase().includes(category.toLowerCase()));
};

export const getFeaturedProducts = (): Product[] => {
  return products.slice(0, 6);
};
