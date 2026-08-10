import React, { useState } from "react";
import { Search, SlidersHorizontal, Eye, Heart, ShoppingCart, Sparkles, Star, Check, HelpCircle, Loader2 } from "lucide-react";
import { Product, PRODUCTS } from "../data/products";
import { CustomConfig } from "../types";

interface ProductsProps {
  onAddToCart: (product: Product, quantity: number, customConfig?: CustomConfig) => void;
  onAddToWishlist: (product: Product) => void;
  wishlistIds: string[];
}

export default function Products({ onAddToCart, onAddToWishlist, wishlistIds }: ProductsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("recommended");
  
  // AI Smart Recommendation states
  const [aiSearchText, setAiSearchText] = useState<string>("");
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [aiRecommendations, setAiRecommendations] = useState<Product[]>([]);
  const [aiExplanation, setAiExplanation] = useState<string>("");

  // Quick View Modal states
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalQuantity, setModalQuantity] = useState<number>(1);
  const [selectedFont, setSelectedFont] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [customEngravedName, setCustomEngravedName] = useState<string>("");
  const [addedAlert, setAddedAlert] = useState<boolean>(false);

  // Categories list
  const categories = [
    "All",
    "MDF Key Hanging Stands",
    "Name Plaques",
    "Wall Décor",
    "Islamic Wall Art",
    "Customized Gifts",
    "Wooden Shelves",
    "Home Accessories",
    "Office Décor"
  ];

  // Search, filter, and sort products
  const getFilteredProducts = () => {
    let list = [...PRODUCTS];

    // Filter by Category
    if (selectedCategory !== "All") {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Filter by regular Search Query
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // If AI Recommendations are active, we can prioritize them at the top!
    if (aiRecommendations.length > 0) {
      const recIds = aiRecommendations.map((r) => r.id);
      list.sort((a, b) => {
        const aRec = recIds.includes(a.id) ? 1 : 0;
        const bRec = recIds.includes(b.id) ? 1 : 0;
        return bRec - aRec; // put recommended items first
      });
    } else {
      // Regular Sort
      if (sortBy === "price-low") {
        list.sort((a, b) => a.price - b.price);
      } else if (sortBy === "price-high") {
        list.sort((a, b) => b.price - a.price);
      } else if (sortBy === "rating") {
        list.sort((a, b) => b.rating - a.rating);
      }
    }

    return list;
  };

  const handleAiSmartRecommend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiSearchText.trim()) return;

    setIsAiLoading(true);
    setAiExplanation("");
    setAiRecommendations([]);

    try {
      const response = await fetch("/api/ai/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: aiSearchText })
      });
      const data = await response.json();
      if (data.recommendations) {
        setAiRecommendations(data.recommendations);
        setAiExplanation(data.explanation);
      }
    } catch (error) {
      console.error("AI recommendations error:", error);
    } finally {
      setIsAiLoading(false);
    }
  };

  const openQuickView = (product: Product) => {
    setSelectedProduct(product);
    setModalQuantity(1);
    setCustomEngravedName("");
    setAddedAlert(false);
    // Initialize custom choices if available
    if (product.options) {
      setSelectedFont(product.options.fonts?.[0] || "");
      setSelectedColor(product.options.colors?.[0] || "");
      setSelectedSize(product.options.sizes?.[0] || "");
    }
  };

  const handleModalAddToCart = () => {
    if (!selectedProduct) return;
    
    let config: CustomConfig | undefined = undefined;
    if (selectedProduct.customizable) {
      config = {
        name: customEngravedName || "Default Name",
        color: selectedColor || "Walnut Brown",
        size: selectedSize || "Standard",
        font: selectedFont || "Playfair Display",
        design: "Standard Plaque Design"
      };
    }

    onAddToCart(selectedProduct, modalQuantity, config);
    setAddedAlert(true);
    setTimeout(() => {
      setAddedAlert(false);
      setSelectedProduct(null);
    }, 1500);
  };

  const clearAiSmartSearch = () => {
    setAiSearchText("");
    setAiRecommendations([]);
    setAiExplanation("");
  };

  const filteredList = getFilteredProducts();

  return (
    <section id="products-section" className="py-24 px-4 bg-[#F8F4EC]">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="font-display text-xs font-bold text-wood-primary uppercase tracking-widest">
            WoodNest Collections
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-wood-dark tracking-tight">
            Handcrafted Home Assets
          </h2>
          <div className="h-1 w-20 bg-wood-gold mx-auto rounded-full" />
          <p className="font-sans text-xs sm:text-sm text-wood-charcoal/70 leading-relaxed font-light">
            Each item is designed from premium density MDF, layered with mirror finishings or solid brass hooks, and custom sanded to perfection.
          </p>
        </div>

        {/* AI SMART SEARCH ADVISOR PANEL (Glassmorphism) */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-wood-primary/10 shadow-lg max-w-4xl mx-auto">
          <div className="flex items-center space-x-2.5 mb-4">
            <div className="p-2 bg-wood-primary/15 rounded-xl text-wood-primary">
              <Sparkles className="w-5 h-5 text-wood-gold animate-pulse" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-wood-dark">
                AI Interior Styling Advisor
              </h3>
              <p className="font-sans text-[11px] text-wood-charcoal/60">
                Describe your wall style, room color scheme, or a gifting scenario, and WoodNest AI will scan our catalog and match the perfect wood plaques.
              </p>
            </div>
          </div>

          <form onSubmit={handleAiSmartRecommend} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={aiSearchText}
              onChange={(e) => setAiSearchText(e.target.value)}
              placeholder="E.g., I have a cream living room wall and want a beautiful Islamic scripture or wood panel..."
              className="flex-grow px-5 py-3.5 rounded-2xl border border-wood-primary/20 bg-wood-cream/40 focus:outline-none focus:ring-2 focus:ring-wood-primary/40 text-sm font-sans text-wood-charcoal"
            />
            <button
              type="submit"
              disabled={isAiLoading}
              className="flex items-center justify-center space-x-2 px-6 py-3.5 rounded-2xl bg-wood-dark text-wood-cream hover:bg-wood-primary font-display text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              {isAiLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-wood-gold" />
                  <span>Get AI Recommendations</span>
                </>
              )}
            </button>
          </form>

          {/* AI Output Result */}
          {aiExplanation && (
            <div className="mt-6 p-5 bg-[#8B5A2B]/5 rounded-2xl border border-[#8B5A2B]/15 space-y-3 animate-in fade-in duration-300">
              <p className="font-serif text-xs sm:text-sm italic text-wood-dark leading-relaxed">
                " {aiExplanation} "
              </p>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-wood-primary font-display font-semibold uppercase tracking-wider">
                  ✦ Matched item(s) highlighted at the top of the grid
                </span>
                <button
                  onClick={clearAiSmartSearch}
                  className="text-[10px] text-red-600 hover:underline font-display uppercase tracking-wider cursor-pointer"
                >
                  Clear smart match
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Regular Category Filters, Search, and Sorting */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Categories Sidebar */}
          <div className="w-full lg:w-64 bg-white/70 backdrop-blur-md p-6 rounded-3xl border border-wood-primary/10 shadow-sm space-y-6">
            <div>
              <h3 className="font-serif text-base font-bold text-wood-dark mb-3">Browse Categories</h3>
              <div className="h-0.5 w-10 bg-wood-gold rounded-full mb-4" />
              <div className="flex flex-wrap lg:flex-col gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      clearAiSmartSearch();
                    }}
                    className={`text-left px-4 py-2.5 rounded-xl font-sans text-xs font-medium transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? "bg-wood-primary text-white shadow-sm"
                        : "text-wood-charcoal/80 hover:bg-wood-primary/5 hover:text-wood-primary"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Products Grid */}
          <div className="flex-grow space-y-6 w-full">
            {/* Header Controls */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-wood-primary/5">
              {/* Search Bar */}
              <div className="relative flex-grow max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-wood-charcoal/40 w-4.5 h-4.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search key stands, name boards, plaques..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-wood-primary/15 bg-white/70 focus:outline-none focus:ring-2 focus:ring-wood-primary/30 text-xs font-sans text-wood-charcoal"
                />
              </div>

              {/* Sorting */}
              <div className="flex items-center space-x-3">
                <SlidersHorizontal className="w-4 h-4 text-wood-charcoal/60" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white/70 border border-wood-primary/15 rounded-xl px-3 py-2 text-xs font-display font-medium text-wood-charcoal focus:outline-none"
                >
                  <option value="recommended">Best Match</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>

            {/* Catalog Grid */}
            {filteredList.length === 0 ? (
              <div className="text-center py-20 bg-white/40 rounded-3xl border border-wood-primary/5">
                <p className="font-serif text-lg text-wood-dark">No products found</p>
                <p className="font-sans text-xs text-wood-charcoal/60 mt-1">
                  Try adjusting your search query or clear the active AI recommendation filters.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredList.map((product) => {
                  const isWishlisted = wishlistIds.includes(product.id);
                  const isAiRecommended = aiRecommendations.some((r) => r.id === product.id);

                  return (
                    <div
                      key={product.id}
                      className={`group relative bg-white/90 rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 flex flex-col h-full ${
                        isAiRecommended
                          ? "border-wood-gold ring-2 ring-wood-gold/30"
                          : "border-wood-primary/10"
                      }`}
                    >
                      {/* Bestseller/New badges */}
                      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
                        {isAiRecommended && (
                          <span className="bg-wood-gold text-wood-dark font-display text-[9px] font-extrabold uppercase px-2.5 py-1 rounded-md shadow-sm flex items-center gap-1">
                            <Sparkles className="w-3 h-3 animate-spin" /> AI Recommended
                          </span>
                        )}
                        {product.isBestSeller && (
                          <span className="bg-wood-primary text-white font-display text-[9px] font-extrabold uppercase px-2.5 py-1 rounded-md shadow-sm">
                            Bestseller
                          </span>
                        )}
                        {product.isNewArrival && (
                          <span className="bg-wood-dark text-wood-cream font-display text-[9px] font-extrabold uppercase px-2.5 py-1 rounded-md shadow-sm">
                            New Arrival
                          </span>
                        )}
                      </div>

                      {/* Wishlist toggle & Quick View Hover buttons */}
                      <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
                        <button
                          onClick={() => onAddToWishlist(product)}
                          className={`p-2 rounded-full shadow-md backdrop-blur-md transition-colors cursor-pointer ${
                            isWishlisted
                              ? "bg-red-500 text-white"
                              : "bg-white/80 text-wood-charcoal hover:bg-white hover:text-red-500"
                          }`}
                          title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                        >
                          <Heart className="w-4 h-4 fill-current" />
                        </button>
                      </div>

                      {/* Product Image Area */}
                      <div className="relative aspect-square overflow-hidden bg-wood-cream/50">
                        <img
                          src={product.image}
                          alt={product.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button
                            onClick={() => openQuickView(product)}
                            className="flex items-center space-x-1.5 px-4.5 py-2.5 bg-white/95 text-wood-dark rounded-xl font-display text-xs font-bold uppercase tracking-wider shadow-md hover:bg-wood-primary hover:text-white transition-all cursor-pointer"
                          >
                            <Eye className="w-4 h-4" />
                            <span>Quick View</span>
                          </button>
                        </div>
                      </div>

                      {/* Content details */}
                      <div className="p-5 flex-grow flex flex-col justify-between">
                        <div className="space-y-1.5">
                          <span className="text-[10px] font-display font-semibold uppercase tracking-widest text-wood-primary">
                            {product.category}
                          </span>
                          <h3 className="font-serif text-base font-bold text-wood-dark line-clamp-1 group-hover:text-wood-primary transition-colors">
                            {product.name}
                          </h3>

                          {/* Star Ratings */}
                          <div className="flex items-center space-x-1">
                            <div className="flex text-amber-500">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3.5 h-3.5 ${
                                    i < Math.floor(product.rating) ? "fill-current" : "opacity-30"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-[10px] font-semibold text-wood-charcoal/60">
                              {product.rating} ({product.reviewCount})
                            </span>
                          </div>

                          <p className="font-sans text-xs text-wood-charcoal/70 line-clamp-2 leading-relaxed font-light">
                            {product.description}
                          </p>
                        </div>

                        {/* Card bottom: Price & Add to Cart button */}
                        <div className="flex items-center justify-between pt-4 mt-4 border-t border-wood-primary/10">
                          <div>
                            <span className="block text-[9px] font-display text-wood-charcoal/50 uppercase">Price</span>
                            <span className="font-serif text-lg font-bold text-wood-dark">Rs. {product.price.toLocaleString()}</span>
                          </div>

                          <button
                            onClick={() => openQuickView(product)}
                            className="flex items-center space-x-1.5 px-4 py-2.5 bg-wood-primary hover:bg-wood-dark text-white rounded-xl font-display text-[10px] font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer"
                          >
                            <ShoppingCart className="w-3.5 h-3.5" />
                            <span>Configure</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

      </div>

      {/* QUICK VIEW / CONFIGURATOR OVERLAY DRAWER */}
      {selectedProduct && (
        <div id="quick-view-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-3xl bg-wood-cream p-6 sm:p-8 rounded-3xl relative shadow-2xl border border-wood-primary/10 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-wood-primary/10 text-wood-charcoal/60 transition-colors"
            >
              Close ✕
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              {/* Left Side: Product Zoom Illustration */}
              <div className="space-y-4">
                <div className="aspect-square rounded-2xl overflow-hidden bg-white shadow-inner border border-wood-primary/10">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Specifications Listing */}
                <div className="p-4 bg-white/70 rounded-2xl border border-wood-primary/10 text-xs space-y-2">
                  <h4 className="font-serif font-bold text-wood-dark">Technical Details</h4>
                  <div className="grid grid-cols-2 gap-2 text-wood-charcoal/80 font-sans">
                    <span className="font-medium text-wood-primary">Material:</span>
                    <span>{selectedProduct.specifications.material}</span>
                    <span className="font-medium text-wood-primary">Thickness:</span>
                    <span>{selectedProduct.specifications.thickness}</span>
                    <span className="font-medium text-wood-primary">Dimensions:</span>
                    <span>{selectedProduct.specifications.dimensions}</span>
                    <span className="font-medium text-wood-primary">Finish:</span>
                    <span>{selectedProduct.specifications.finish}</span>
                  </div>
                </div>
              </div>

              {/* Right Side: Options and Custom Config */}
              <div className="space-y-5 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-display font-semibold text-wood-primary uppercase tracking-widest block">
                    {selectedProduct.category}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-wood-dark mt-1">
                    {selectedProduct.name}
                  </h3>

                  <div className="flex items-center space-x-2 mt-2">
                    <span className="font-serif text-2xl font-bold text-wood-primary">
                      Rs. {selectedProduct.price.toLocaleString()}
                    </span>
                    {selectedProduct.customizable && (
                      <span className="bg-wood-gold/15 border border-wood-gold/30 text-wood-gold text-[9px] font-display font-bold uppercase px-2 py-0.5 rounded">
                        ★ Fully Customizable
                      </span>
                    )}
                  </div>

                  <p className="font-sans text-xs text-wood-charcoal/70 leading-relaxed mt-3">
                    {selectedProduct.description}
                  </p>

                  {/* CUSTOMIZATION OPTIONS IF APPLICABLE */}
                  {selectedProduct.customizable && selectedProduct.options && (
                    <div className="space-y-4 mt-5 p-4 bg-wood-primary/5 rounded-2xl border border-wood-primary/10">
                      <h4 className="font-serif text-xs font-bold text-wood-dark uppercase tracking-wider">
                        Personalise Your MDF Creation
                      </h4>

                      {/* Name Input */}
                      <div>
                        <label className="block text-[10px] font-display font-semibold text-wood-charcoal mb-1">
                          Custom Name / Text Engraving
                        </label>
                        <input
                          type="text"
                          required
                          value={customEngravedName}
                          onChange={(e) => setCustomEngravedName(e.target.value)}
                          placeholder="E.g., The Smiths / Bismillah"
                          className="w-full px-3 py-2 rounded-xl border border-wood-primary/20 bg-white/80 text-xs font-sans text-wood-charcoal focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        {/* Font Selection */}
                        {selectedProduct.options.fonts && (
                          <div>
                            <label className="block text-[10px] font-display font-semibold text-wood-charcoal mb-1">
                              Script Font
                            </label>
                            <select
                              value={selectedFont}
                              onChange={(e) => setSelectedFont(e.target.value)}
                              className="w-full px-2 py-2 rounded-xl border border-wood-primary/20 bg-white/80 text-xs font-sans"
                            >
                              {selectedProduct.options.fonts.map((f) => (
                                <option key={f} value={f}>
                                  {f}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}

                        {/* Satin Finish / Colors */}
                        {selectedProduct.options.colors && (
                          <div>
                            <label className="block text-[10px] font-display font-semibold text-wood-charcoal mb-1">
                              Wooden Finish
                            </label>
                            <select
                              value={selectedColor}
                              onChange={(e) => setSelectedColor(e.target.value)}
                              className="w-full px-2 py-2 rounded-xl border border-wood-primary/20 bg-white/80 text-xs font-sans"
                            >
                              {selectedProduct.options.colors.map((c) => (
                                <option key={c} value={c}>
                                  {c}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}
                      </div>

                      {/* Sizes selection */}
                      {selectedProduct.options.sizes && (
                        <div>
                          <label className="block text-[10px] font-display font-semibold text-wood-charcoal mb-1">
                            Board Dimensions
                          </label>
                          <select
                            value={selectedSize}
                            onChange={(e) => setSelectedSize(e.target.value)}
                            className="w-full px-2 py-2 rounded-xl border border-wood-primary/20 bg-white/80 text-xs font-sans"
                          >
                            {selectedProduct.options.sizes.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Footer Add/Qty Controls */}
                <div className="space-y-3 pt-4 border-t border-wood-primary/10">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-xs text-wood-charcoal/70">Quantity</span>
                    <div className="flex items-center space-x-3 bg-white/80 border border-wood-primary/20 rounded-xl px-2 py-1">
                      <button
                        onClick={() => setModalQuantity(Math.max(1, modalQuantity - 1))}
                        className="text-wood-dark hover:text-wood-primary font-bold px-1.5 cursor-pointer"
                      >
                        -
                      </button>
                      <span className="font-display text-xs font-bold text-wood-charcoal">{modalQuantity}</span>
                      <button
                        onClick={() => setModalQuantity(modalQuantity + 1)}
                        className="text-wood-dark hover:text-wood-primary font-bold px-1.5 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {addedAlert ? (
                    <div className="p-3 bg-green-50 border border-green-200 text-green-700 text-xs rounded-xl flex items-center justify-center space-x-2">
                      <Check className="w-4 h-4" />
                      <span>Satin wood configuration added to your shopping cart!</span>
                    </div>
                  ) : (
                    <button
                      onClick={handleModalAddToCart}
                      className="w-full py-3.5 rounded-xl bg-wood-primary hover:bg-wood-dark text-white font-display text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center space-x-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Add to Basket</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
