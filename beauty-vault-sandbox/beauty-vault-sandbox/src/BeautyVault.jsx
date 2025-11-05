import React, { useState } from 'react';
import { ShoppingCart, Search, User, Sparkles, Gift, Tag, Zap, Heart, Star, Crown, Gem, Facebook, Instagram, Youtube, Music } from 'lucide-react';

export default function BeautyVault() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Sample products from your inventory with ACTUAL image URLs
  const products = [
    {
      id: '1',
      handle: 'nude-matte-revolution-lipstick',
      title: 'Nude Matte Lipstick',
      vendor: 'The Beauty Vault',
      type: 'Makeup',
      price: 31,
      comparePrice: 35,
      image: 'https://cdn.shopify.com/s/files/1/0766/5254/4213/files/Untitled_800x800px_1.png?v=1760893295',
      category: 'Lip Makeup',
      description: 'The Nude Matte Lipstick offers a muted nude-rose shade that suits all skin tones.',
      inStock: true
    },
    {
      id: '2',
      handle: 'blush',
      title: 'Blush',
      vendor: 'The Beauty Vault',
      type: 'Makeup',
      price: 31.99,
      comparePrice: 36,
      image: 'https://cdn.shopify.com/s/files/1/0766/5254/4213/files/Untitled_800x800px_10.png?v=1760323283',
      category: 'Face Makeup',
      description: 'NARS Blush offers long-lasting color for up to 16 hours with a lightweight feel.',
      inStock: true
    },
    {
      id: '3',
      handle: 'luxury-eyeshadow-palette',
      title: 'Luxury Eyeshadow Palette',
      vendor: 'The Beauty Vault',
      type: 'Makeup',
      price: 45,
      image: 'https://cdn.shopify.com/s/files/1/0766/5254/4213/files/Untitled_800x800px_9.png?v=1760322123',
      category: 'Eye Makeup',
      description: 'Four shades in a smooth, long-lasting formula for day to night looks.',
      inStock: true
    },
    {
      id: '4',
      handle: 'delicia-drench-shower-oil',
      title: 'Delicia Drench Shower Oil',
      vendor: 'The Beauty Vault',
      type: 'Skin Care',
      price: 12.99,
      image: 'https://cdn.shopify.com/s/files/1/0766/5254/4213/files/SERUMTEINTE_78.png?v=1760159712',
      category: 'Body Care',
      description: 'Oil-to-foam wash that cleans, hydrates, and brightens your skin.',
      inStock: true
    },
    {
      id: '5',
      handle: 'perfume-mist',
      title: 'Cheirosa 59 Perfume Mist',
      vendor: 'The Beauty Vault',
      type: 'Fragrance',
      price: 12.99,
      image: 'https://cdn.shopify.com/s/files/1/0766/5254/4213/files/SERUM_TEINTE_77.png?v=1760158852',
      category: 'Fragrance',
      description: 'Sweet warmth of vanilla orchid and sugared violet with sandalwood.',
      inStock: true
    },
    {
      id: '6',
      handle: 'body-butter',
      title: 'Delicia Drench Body Butter',
      vendor: 'The Beauty Vault',
      type: 'Skin Care',
      price: 12.99,
      image: 'https://cdn.shopify.com/s/files/1/0766/5254/4213/files/SERUMTEINTE_76.png?v=1760157288',
      category: 'Body Care',
      description: 'Rich whipped cream that locks in hydration and soothes dry skin.',
      inStock: true
    },
    {
      id: '7',
      handle: 'bom-dia-bright-cream',
      title: 'Bom Dia Bright Cream',
      vendor: 'The Beauty Vault',
      type: 'Fragrance',
      price: 12.99,
      image: 'https://cdn.shopify.com/s/files/1/0766/5254/4213/files/SERUM_TEINTE_75.png?v=1760156178',
      category: 'Skin Care',
      description: 'Daily moisture-rich body cream with Vitamin C and Fruit AHAs.',
      inStock: true
    },
    {
      id: '8',
      handle: 'brazilian-bum-bum-cream',
      title: 'Brazilian Bum Bum Cream',
      vendor: 'The Beauty Vault',
      type: 'Fragrance',
      price: 12.99,
      image: 'https://cdn.shopify.com/s/files/1/0766/5254/4213/files/SERUM_TEINTE_74.png?v=1760155096',
      category: 'Body Care',
      description: 'Body cream that firms, tightens, and hydrates with pistachio and vanilla scent.',
      inStock: true
    }
  ];

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white">
      {/* Top Banner */}
      <div className="bg-pink-100 text-center py-2 text-sm">
        <Sparkles className="inline w-4 h-4 mr-1" />
        Free standard shipping on any $35 purchase
      </div>

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div 
              onClick={() => setCurrentPage('home')}
              className="cursor-pointer flex items-center space-x-2"
            >
              <Crown className="w-8 h-8 text-pink-600" />
              <div className="text-xl font-bold">
                <span className="text-gray-900">THE</span><br />
                <span className="text-pink-600">BEAUTY</span><br />
                <span className="text-gray-900">VAULT</span>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search The Beauty Vault"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-pink-500"
                />
              </div>
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              <User className="w-6 h-6 text-gray-700 cursor-pointer hover:text-pink-600" />
              <div className="relative">
                <ShoppingCart 
                  className="w-6 h-6 text-gray-700 cursor-pointer hover:text-pink-600"
                  onClick={() => setIsCartOpen(!isCartOpen)}
                />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex space-x-8 pb-4">
            <button
              onClick={() => setCurrentPage('home')}
              className={`hover:text-gray-600 font-medium ${currentPage === 'home' ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-700'}`}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentPage('shop')}
              className={`hover:text-gray-600 font-medium ${currentPage === 'shop' ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-700'}`}
            >
              Shop
            </button>
            <button
              onClick={() => setCurrentPage('rewards')}
              className={`hover:text-gray-600 font-medium ${currentPage === 'rewards' ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-700'}`}
            >
              Rewards
            </button>
            <button
              onClick={() => setCurrentPage('new')}
              className={`hover:text-gray-600 font-medium ${currentPage === 'new' ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-700'}`}
            >
              New
            </button>
            <button
              onClick={() => setCurrentPage('sale')}
              className={`hover:text-gray-600 font-medium ${currentPage === 'sale' ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-700'}`}
            >
              Sale
            </button>
          </nav>
        </div>
      </header>

      {/* HOME PAGE */}
      {currentPage === 'home' && (
        <>
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-pink-50 to-purple-50 py-20">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <h1 className="text-5xl font-bold text-gray-900 mb-4">
                Take a Dip in Our Top-Notch Picks
              </h1>
            </div>
          </section>

          {/* Featured Collections Grid */}
          <section className="max-w-7xl mx-auto px-4 py-16">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Gloss Lovers Beware */}
              <div className="bg-pink-100 rounded-lg p-8 text-center">
                <Heart className="w-12 h-12 text-pink-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Lip Gloss Collection</h3>
                <h4 className="text-lg font-semibold text-pink-600 mb-2">Gloss Lovers Beware</h4>
                <p className="text-gray-600 mb-4">Glosses that glow. Balms that boss.</p>
                <button className="bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700">
                  Shop Now
                </button>
              </div>

              {/* Feel the Glow */}
              <div className="bg-yellow-100 rounded-lg p-8 text-center">
                <Star className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Glow Products</h3>
                <h4 className="text-lg font-semibold text-yellow-600 mb-2">Feel the Glow</h4>
                <p className="text-gray-600 mb-4">Glow like it's golden hour - anytime, anywhere.</p>
                <button className="bg-yellow-600 text-white px-6 py-2 rounded-md hover:bg-yellow-700">
                  Shop Now
                </button>
              </div>

              {/* Rio Radiance */}
              <div className="bg-orange-100 rounded-lg p-8 text-center">
                <Gem className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Rio Collection</h3>
                <h4 className="text-lg font-semibold text-orange-600 mb-2">Rio Radiance at Your Finger Tips</h4>
                <p className="text-gray-600 mb-4">Skin-kissed formulas that smell like summer forever.</p>
                <button className="bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700">
                  Shop Now
                </button>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid md:grid-cols-3 gap-8">
                {/* Exclusive Member Perks */}
                <div className="text-center">
                  <Crown className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Exclusive Member Perks</h3>
                  <p className="text-gray-600 mb-2">Join now and save on your favorites</p>
                  <p className="text-sm text-gray-500 mb-4">Sign up today for special discounts and early access.</p>
                  <button className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700">
                    Join Free
                  </button>
                </div>

                {/* Gift Sets */}
                <div className="text-center">
                  <Gift className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Gift Sets Starting at $12</h3>
                  <p className="text-gray-600 mb-2">Perfect presents for any occasion</p>
                  <p className="text-sm text-gray-500 mb-4">Curated collections that wow without breaking the bank.</p>
                  <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700">
                    Shop Sets
                  </button>
                </div>

                {/* Signature Scent */}
                <div className="text-center">
                  <Sparkles className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Signature Scent Collections</h3>
                  <p className="text-gray-600 mb-2">Find your perfect fragrance match</p>
                  <p className="text-sm text-gray-500 mb-4">Premium perfumes and colognes for every personality.</p>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
                    Discover Now
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Shop by Category */}
          <section className="max-w-7xl mx-auto px-4 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
              <p className="text-gray-600">Explore our curated collections of premium beauty products</p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {/* Fragrance */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-purple-100 flex items-center justify-center">
                  <Sparkles className="w-16 h-16 text-purple-600" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Fragrance</h3>
                  <p className="text-gray-600 mb-4">Signature scents for every mood</p>
                  <button className="text-purple-600 font-medium hover:text-purple-700">
                    Shop Now →
                  </button>
                </div>
              </div>

              {/* Skincare */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-green-100 flex items-center justify-center">
                  <Heart className="w-16 h-16 text-green-600" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Skincare</h3>
                  <p className="text-gray-600 mb-4">Glow from within with our curated skincare</p>
                  <button className="text-green-600 font-medium hover:text-green-700">
                    Shop Now →
                  </button>
                </div>
              </div>

              {/* Makeup */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-pink-100 flex items-center justify-center">
                  <Star className="w-16 h-16 text-pink-600" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Makeup</h3>
                  <p className="text-gray-600 mb-4">Express yourself with bold colors</p>
                  <button className="text-pink-600 font-medium hover:text-pink-700">
                    Shop Now →
                  </button>
                </div>
              </div>

              {/* Hair Care */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-blue-100 flex items-center justify-center">
                  <Zap className="w-16 h-16 text-blue-600" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Hair Care</h3>
                  <p className="text-gray-600 mb-4">Transform your hair care routine</p>
                  <button className="text-blue-600 font-medium hover:text-blue-700">
                    Shop Now →
                  </button>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* REWARDS PAGE */}
      {currentPage === 'rewards' && (
        <>
          {/* Rewards Hero Section */}
          <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <Crown className="w-16 h-16 mx-auto mb-6" />
              <h1 className="text-5xl font-bold mb-4">Beauty Vault Rewards</h1>
              <p className="text-xl mb-8">Where every purchase makes you glow even brighter</p>
              <button className="bg-white text-purple-600 px-8 py-3 rounded-md font-bold text-lg hover:bg-gray-100">
                Join Free Today
              </button>
            </div>
          </section>

          {/* Stats */}
          <section className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold text-purple-600 mb-2">1M+</div>
                  <div className="text-gray-600">Happy Members</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-purple-600 mb-2">$10M+</div>
                  <div className="text-gray-600">Rewards Redeemed</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-purple-600 mb-2">Free</div>
                  <div className="text-gray-600">To Join & Use</div>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
                <p className="text-gray-600">Start earning rewards with every purchase and unlock exclusive perks</p>
              </div>

              <div className="grid md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="font-bold mb-2">Earn Points on Every Purchase</h3>
                  <p className="text-gray-600">Get 1 point for every dollar spent</p>
                </div>

                <div className="text-center">
                  <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Gift className="w-8 h-8 text-pink-600" />
                  </div>
                  <h3 className="font-bold mb-2">Birthday Surprise</h3>
                  <p className="text-gray-600">Select your special gift during your birthday month</p>
                </div>

                <div className="text-center">
                  <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-yellow-600" />
                  </div>
                  <h3 className="font-bold mb-2">Exclusive Bonus Events</h3>
                  <p className="text-gray-600">Double and triple point opportunities</p>
                </div>

                <div className="text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Tag className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-bold mb-2">Redeem for Rewards</h3>
                  <p className="text-gray-600">Turn points into dollars off your next purchase</p>
                </div>
              </div>
            </div>
          </section>

          {/* Points Value */}
          <section className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Points = Real Savings</h2>
              <p className="text-gray-600 mb-12">Redeem your points anytime for instant discounts</p>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-purple-50 p-6 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 mb-2">$5</div>
                  <div className="text-gray-600">100 points</div>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 mb-2">$15</div>
                  <div className="text-gray-600">250 points</div>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 mb-2">$30</div>
                  <div className="text-gray-600">500 points</div>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 mb-2">$50</div>
                  <div className="text-gray-600">750 points</div>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 mb-2">$75</div>
                  <div className="text-gray-600">1000 points</div>
                </div>
              </div>
            </div>
          </section>

          {/* Membership Levels */}
          <section className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Membership Levels</h2>
                <p className="text-gray-600">The more you shop, the more you earn. Rise through the tiers and unlock exclusive benefits</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {/* Insider */}
                <div className="bg-white rounded-lg p-8 shadow-md">
                  <div className="text-center mb-6">
                    <Star className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Insider</h3>
                    <p className="text-gray-600">Free to join</p>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <span className="text-gray-600 mr-2">✦</span>
                      Earn 1 point per $1 spent
                    </li>
                    <li className="flex items-center">
                      <span className="text-gray-600 mr-2">✦</span>
                      Birthday gift selection
                    </li>
                    <li className="flex items-center">
                      <span className="text-gray-600 mr-2">✦</span>
                      Exclusive member offers
                    </li>
                    <li className="flex items-center">
                      <span className="text-gray-600 mr-2">✦</span>
                      Early access to sales
                    </li>
                  </ul>
                </div>

                {/* VIP */}
                <div className="bg-white rounded-lg p-8 shadow-md border-2 border-purple-200">
                  <div className="text-center mb-6">
                    <Crown className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">VIP</h3>
                    <p className="text-gray-600">Spend $500 in a year</p>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <span className="text-purple-600 mr-2">✦</span>
                      Everything in Insider
                    </li>
                    <li className="flex items-center">
                      <span className="text-purple-600 mr-2">✦</span>
                      1.25 points per $1 spent
                    </li>
                    <li className="flex items-center">
                      <span className="text-purple-600 mr-2">✦</span>
                      Free shipping on all orders
                    </li>
                    <li className="flex items-center">
                      <span className="text-purple-600 mr-2">✦</span>
                      Quarterly bonus point events
                    </li>
                    <li className="flex items-center">
                      <span className="text-purple-600 mr-2">✦</span>
                      Exclusive VIP-only products
                    </li>
                  </ul>
                </div>

                {/* Elite */}
                <div className="bg-white rounded-lg p-8 shadow-md border-2 border-gold-200">
                  <div className="text-center mb-6">
                    <Gem className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Elite</h3>
                    <p className="text-gray-600">Spend $1,200 in a year</p>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <span className="text-yellow-600 mr-2">✦</span>
                      Everything in VIP
                    </li>
                    <li className="flex items-center">
                      <span className="text-yellow-600 mr-2">✦</span>
                      1.5 points per $1 spent
                    </li>
                    <li className="flex items-center">
                      <span className="text-yellow-600 mr-2">✦</span>
                      Private shopping events
                    </li>
                    <li className="flex items-center">
                      <span className="text-yellow-600 mr-2">✦</span>
                      Free beauty consultations
                    </li>
                    <li className="flex items-center">
                      <span className="text-yellow-600 mr-2">✦</span>
                      Birthday month double points
                    </li>
                    <li className="flex items-center">
                      <span className="text-yellow-600 mr-2">✦</span>
                      Exclusive Elite gift with purchase
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Start Earning?</h2>
              <p className="text-xl mb-8">Join Beauty Vault Rewards today and start earning points on your next purchase</p>
              <div className="space-x-4">
                <button className="bg-white text-purple-600 px-8 py-3 rounded-md font-bold hover:bg-gray-100">
                  Sign Up Free
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-md font-bold hover:bg-white hover:text-purple-600">
                  Start Shopping
                </button>
              </div>
            </div>
          </section>
        </>
      )}

      {/* SHOP PAGE */}
      {currentPage === 'shop' && (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">All Products</h1>
            <p className="text-gray-600">131 products available</p>
          </div>

          <div className="flex gap-8">
            {/* Sidebar Filters */}
            <div className="w-64 flex-shrink-0">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-bold mb-4">Filters</h3>
                
                {/* Category Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Category</h4>
                  <div className="space-y-2">
                    {[
                      { value: 'All', label: 'All' },
                      { value: 'Lip Makeup', label: 'Lip Makeup' },
                      { value: 'Face Makeup', label: 'Face Makeup' },
                      { value: 'Eye Makeup', label: 'Eye Makeup' },
                      { value: 'Skin Care', label: 'Skin Care' },
                      { value: 'Fragrance', label: 'Fragrance' },
                      { value: 'Body Care', label: 'Body Care' }
                    ].map(cat => (
                      <label key={cat.value} className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          value={cat.value}
                          checked={selectedCategory === cat.value}
                          onChange={() => setSelectedCategory(cat.value)}
                          className="w-4 h-4 mr-3 accent-pink-600"
                        />
                        {cat.label}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Price</h4>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">$0</span>
                    <input type="range" className="flex-1" />
                    <span className="text-sm">$500+</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Area */}
            <div className="flex-1">
              {/* Search Bar */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-gray-400"
                  />
                </div>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products
                  .filter(p => selectedCategory === 'All' || p.category === selectedCategory)
                  .filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map(product => (
                    <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-64 object-cover"
                          onError={(e) => {
                            console.error('Image failed to load:', product.image);
                            e.target.src = 'https://via.placeholder.com/400x500?text=Product+Image';
                          }}
                        />
                        {product.comparePrice && (
                          <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
                            SALE
                          </span>
                        )}
                      </div>
                      <div className="p-4">
                        <p className="text-sm text-gray-500 mb-1">{product.vendor}</p>
                        <h3 className="font-bold text-lg mb-2">{product.title}</h3>
                        <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                        <div className="flex items-center justify-between">
                          {product.comparePrice ? (
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-lg">${product.price}</span>
                              <span className="text-gray-500 line-through">${product.comparePrice}</span>
                            </div>
                          ) : (
                            <span className="font-bold text-lg">${product.price}</span>
                          )}
                        </div>
                        <button
                          onClick={() => addToCart(product)}
                          className="w-full mt-3 py-2 rounded-md font-medium text-sm transition"
                          style={{backgroundColor: '#FF6B6B', color: 'white'}}
                          onMouseOver={(e) => e.target.style.backgroundColor = '#FF5252'}
                          onMouseOut={(e) => e.target.style.backgroundColor = '#FF6B6B'}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* NEW PAGE */}
      {currentPage === 'new' && (
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">New Arrivals</h1>
          <p className="text-gray-600">Coming soon - Check out our latest products</p>
        </div>
      )}

      {/* SALE PAGE */}
      {currentPage === 'sale' && (
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Sale</h1>
          <p className="text-gray-600">Coming soon - Amazing deals on your favorite products</p>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Crown className="w-8 h-8 text-pink-400" />
                <span className="text-xl font-bold">The Beauty Vault</span>
              </div>
              <p className="text-gray-400">Unlock Your Everyday Luxury.</p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Home</a></li>
                <li><a href="#" className="hover:text-white">Products</a></li>
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h4 className="font-bold mb-4">Customer Service</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Track Order</a></li>
                <li><a href="#" className="hover:text-white">Returns</a></li>
                <li><a href="#" className="hover:text-white">Shipping Info</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
              </ul>
            </div>

            {/* Follow Us */}
            <div>
              <h4 className="font-bold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <Facebook className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
                <Instagram className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
                <Youtube className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
                <Music className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 The Beauty Vault. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}