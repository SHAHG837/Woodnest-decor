import { useState, useEffect } from "react";
import { 
  ShoppingCart, Heart, ChevronUp, Sparkles, Star, Eye, Trash2, ShieldCheck, Truck, HelpCircle, PhoneCall
} from "lucide-react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Products from "./components/Products";
import Customizer from "./components/Customizer";
import Reviews from "./components/Reviews";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Dashboard from "./components/Dashboard";
import AIChat from "./components/AIChat";
import Footer from "./components/Footer";
import CheckoutModal from "./components/CheckoutModal";
import { Product } from "./data/products";
import { CartItem, CustomConfig } from "./types";

export default function App() {
  const [activePage, setActivePage] = useState<string>("home");
  
  // Cart & Wishlist persistence state
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("woodnest_cart");
    return saved ? JSON.parse(saved) : [];
  });
  
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem("woodnest_wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [scrollWidth, setScrollWidth] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Sync state with localStorage
  useEffect(() => {
    localStorage.setItem("woodnest_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("woodnest_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Handle scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      // Back to top threshold
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }

      // Scroll progress percentage
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const scrolled = (window.scrollY / totalHeight) * 100;
        setScrollWidth(scrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAddToCart = (product: Product, quantity: number, customConfig?: CustomConfig) => {
    setCart((prevCart) => {
      // Generate a unique ID that incorporates custom configuration hash if applicable
      const uniqueId = customConfig 
        ? `${product.id}-${customConfig.name}-${customConfig.color}-${customConfig.font}`
        : product.id;

      const existingIndex = prevCart.findIndex((item) => item.id === uniqueId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevCart, { id: uniqueId, product, quantity, customConfig }];
      }
    });
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlist((prevWishlist) => {
      const exists = prevWishlist.some((item) => item.id === product.id);
      if (exists) {
        return prevWishlist.filter((item) => item.id !== product.id);
      } else {
        return [...prevWishlist, product];
      }
    });
  };

  const handleQuantityChange = (itemId: string, val: number) => {
    setCart((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: Math.max(1, val) } : item))
    );
  };

  const getCartTotal = () => {
    const total = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    return Math.round(total * 100) / 100;
  };

  const getCartCount = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOrderPlaced = (orderId: string) => {
    setActivePage("dashboard");
  };

  const handleNavigation = (page: string) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "instant" as any });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F4EC] text-wood-charcoal selection:bg-wood-primary selection:text-white relative">
      
      {/* Scroll Progress Bar */}
      <div className="scroll-progress-bar" style={{ width: `${scrollWidth}%` }} />

      {/* Main Premium Navbar */}
      <Navbar
        cartCount={getCartCount()}
        wishlistCount={wishlist.length}
        activePage={activePage}
        onNavigate={handleNavigation}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
      />

      {/* RENDER ACTIVE PAGES */}
      <main className="flex-grow">
        {activePage === "home" && (
          <div className="space-y-0">
            {/* HERO PANEL */}
            <Hero 
              onShopNow={() => handleNavigation('shop')}
              onExploreCustom={() => handleNavigation('customizer')}
            />

            {/* QUICK FEATURES STRIP */}
            <section className="bg-wood-dark py-10 px-4 text-white">
              <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
                <div className="flex items-center space-x-4 border-b sm:border-b-0 sm:border-r border-white/10 pb-6 sm:pb-0 sm:pr-8">
                  <div className="p-3 bg-wood-primary/20 rounded-xl text-wood-gold">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-bold">100% Solid Premium MDF</h4>
                    <p className="font-sans text-[10px] text-gray-400">High-density engineered wood fiberboard</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 border-b sm:border-b-0 sm:border-r border-white/10 pb-6 sm:pb-0 sm:pr-8">
                  <div className="p-3 bg-wood-primary/20 rounded-xl text-wood-gold">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-bold">Custom Satin Lacquers</h4>
                    <p className="font-sans text-[10px] text-gray-400">Double gloss hand-painted finishes</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-wood-primary/20 rounded-xl text-wood-gold">
                    <Truck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-bold">Premium Wood Packaging</h4>
                    <p className="font-sans text-[10px] text-gray-400">Shock-resistant wooden crate shipping</p>
                  </div>
                </div>
              </div>
            </section>

            {/* CINEMATIC WOODWORKING LOOP VIDEO SECTION */}
            <section className="py-20 bg-wood-cream flex items-center justify-center relative overflow-hidden px-4">
              <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
                <span className="font-display text-xs font-bold text-wood-primary uppercase tracking-widest block">
                  See the Laser Fire
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-wood-dark">
                  Handcrafted Precision Engineering Loop
                </h3>
                <div className="aspect-video w-full rounded-3xl overflow-hidden border-2 border-wood-primary/10 shadow-xl relative bg-black">
                  {/* Embedded high-end woodwork stock placeholder video loops seamlessly */}
                  <iframe
                    className="w-full h-full object-cover pointer-events-none opacity-80"
                    src="https://www.youtube.com/embed/fD_uOatXN8M?autoplay=1&mute=1&playlist=fD_uOatXN8M&loop=1&controls=0&showinfo=0&rel=0&modestbranding=1"
                    title="WoodNest Artistry Loop"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-wood-dark/70 to-transparent flex items-end justify-between p-6 text-left text-white pointer-events-none">
                    <div>
                      <span className="block text-[10px] uppercase font-display font-semibold tracking-wider text-wood-gold">Flagship CNC laser cutting</span>
                      <span className="font-serif text-sm sm:text-base font-bold">High Density Fibre Carvings</span>
                    </div>
                    <span className="text-xs bg-wood-gold text-wood-dark font-display font-extrabold px-3 py-1.5 rounded-xl uppercase">Muted Loop</span>
                  </div>
                </div>
              </div>
            </section>

            {/* ABOUT US STORY */}
            <About />

            {/* FEATURED PRODUCT HIGHLIGHTS */}
            <Products 
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleToggleWishlist}
              wishlistIds={wishlist.map(p => p.id)}
            />

            {/* INTERACTIVE WORKBENCH CONFIGURATOR */}
            <Customizer onAddToCart={handleAddToCart} />

            {/* CLIENT REVIEWS TESTIMONIALS */}
            <Reviews />

            {/* SEARCH FAQ */}
            <FAQ />

            {/* CONTACT GEOGRAPHIES */}
            <Contact />
          </div>
        )}

        {activePage === "about" && <About />}
        
        {activePage === "shop" && (
          <Products 
            onAddToCart={handleAddToCart}
            onAddToWishlist={handleToggleWishlist}
            wishlistIds={wishlist.map(p => p.id)}
          />
        )}
        
        {activePage === "customizer" && <Customizer onAddToCart={handleAddToCart} />}
        
        {activePage === "faq" && <FAQ />}
        
        {activePage === "contact" && <Contact />}
        
        {activePage === "dashboard" && <Dashboard />}
      </main>

      {/* SHARED AI CONVERSATION DRAWER */}
      <AIChat />

      {/* FOOTER newsletter / policies */}
      <Footer onNavigate={handleNavigation} />

      {/* BACK TO TOP FLOATING BUTTON */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-40 p-3.5 rounded-full bg-wood-dark hover:bg-wood-primary text-white shadow-xl hover:scale-105 transition-transform border border-wood-gold/20 cursor-pointer animate-in fade-in duration-300"
          title="Back to Top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}

      {/* SLIDING BASKET CART DRAWER (Glassmorphism) */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity" onClick={() => setIsCartOpen(false)} />
          
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-wood-cream border-l border-wood-primary/10 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
              
              {/* Sidebar Header */}
              <div className="p-6 bg-wood-dark text-wood-cream flex items-center justify-between border-b border-wood-gold/15">
                <div className="flex items-center space-x-2">
                  <ShoppingCart className="w-5 h-5 text-wood-gold" />
                  <h3 className="font-serif text-base font-bold">Shopping Basket ({getCartCount()})</h3>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="text-white hover:text-wood-gold">
                  ✕ Close
                </button>
              </div>

              {/* Items listing */}
              <div className="flex-grow p-6 overflow-y-auto space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-20 space-y-2">
                    <ShoppingCart className="w-12 h-12 text-wood-primary/20 mx-auto" />
                    <p className="font-serif text-sm font-bold text-wood-dark">Your basket is empty</p>
                    <p className="font-sans text-[11px] text-wood-charcoal/60 leading-relaxed max-w-[200px] mx-auto">
                      Configure a custom plaque or shop standard items to fill your cart.
                    </p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 bg-white rounded-2xl border border-wood-primary/10 shadow-xs relative">
                      <button
                        onClick={() => handleRemoveFromCart(item.id)}
                        className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="w-16 h-16 bg-wood-cream rounded-xl overflow-hidden border border-wood-primary/5">
                        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                      </div>

                      <div className="space-y-1 pr-6">
                        <h4 className="font-serif text-xs font-bold text-wood-dark line-clamp-1">{item.product.name}</h4>
                        <p className="font-serif text-xs font-bold text-wood-primary">${item.product.price}</p>
                        
                        {/* Custom configuration label */}
                        {item.customConfig && (
                          <div className="p-1.5 bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-lg text-[8px] font-display text-wood-dark space-y-0.5 mt-1.5">
                            <span className="block">✍ Engraving: "<strong>{item.customConfig.name}</strong>"</span>
                            <span className="block">🎨 Polish: {item.customConfig.color}</span>
                            <span className="block">📐 Size: {item.customConfig.size}</span>
                          </div>
                        )}

                        {/* Quantity change buttons */}
                        <div className="flex items-center space-x-2.5 pt-2">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="w-5 h-5 bg-wood-cream hover:bg-wood-primary/10 rounded border border-wood-primary/20 flex items-center justify-center text-xs font-bold text-wood-dark cursor-pointer"
                          >
                            -
                          </button>
                          <span className="font-sans text-xs font-bold text-wood-charcoal">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="w-5 h-5 bg-wood-cream hover:bg-wood-primary/10 rounded border border-wood-primary/20 flex items-center justify-center text-xs font-bold text-wood-dark cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer checkout summary footer */}
              {cart.length > 0 && (
                <div className="p-6 bg-white border-t border-wood-primary/10 space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-display font-semibold text-wood-charcoal/70">Subtotal Due:</span>
                    <span className="font-serif text-lg font-bold text-wood-primary">${getCartTotal()}</span>
                  </div>
                  <p className="font-sans text-[10px] text-gray-500 leading-normal">
                    Free shipping is included! Secure payments are completely simulated for immediate prototyping.
                  </p>
                  
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsCheckoutOpen(true);
                    }}
                    className="w-full py-3.5 bg-wood-primary hover:bg-wood-dark text-white font-display text-xs font-bold uppercase tracking-widest rounded-xl shadow transition-colors cursor-pointer text-center block"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* SLIDING WISHLIST DRAWER (Glassmorphism) */}
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-xs" onClick={() => setIsWishlistOpen(false)} />
          
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-wood-cream border-l border-wood-primary/10 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
              
              {/* Sidebar Header */}
              <div className="p-6 bg-wood-dark text-wood-cream flex items-center justify-between border-b border-wood-gold/15">
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-wood-gold" />
                  <h3 className="font-serif text-base font-bold">My Wishlist ({wishlist.length})</h3>
                </div>
                <button onClick={() => setIsWishlistOpen(false)} className="text-white hover:text-wood-gold">
                  ✕ Close
                </button>
              </div>

              {/* Items listing */}
              <div className="flex-grow p-6 overflow-y-auto space-y-4">
                {wishlist.length === 0 ? (
                  <div className="text-center py-20 space-y-2">
                    <Heart className="w-12 h-12 text-wood-primary/20 mx-auto" />
                    <p className="font-serif text-sm font-bold text-wood-dark">Your wishlist is empty</p>
                    <p className="font-sans text-[11px] text-wood-charcoal/60 leading-relaxed max-w-[200px] mx-auto">
                      Click the heart on any product card in the Shop to save your favorite wood plaques!
                    </p>
                  </div>
                ) : (
                  wishlist.map((product) => (
                    <div key={product.id} className="flex gap-4 p-4 bg-white rounded-2xl border border-wood-primary/10 shadow-xs relative">
                      <button
                        onClick={() => handleToggleWishlist(product)}
                        className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="w-16 h-16 bg-wood-cream rounded-xl overflow-hidden border border-wood-primary/5">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>

                      <div className="space-y-1 pr-6 flex-grow">
                        <h4 className="font-serif text-xs font-bold text-wood-dark line-clamp-1">{product.name}</h4>
                        <p className="text-[10px] text-wood-primary uppercase font-display font-medium">{product.category}</p>
                        <p className="font-serif text-xs font-bold text-wood-primary">${product.price}</p>
                        
                        <button
                          onClick={() => {
                            handleAddToCart(product, 1);
                            handleToggleWishlist(product);
                            setIsWishlistOpen(false);
                            setIsCartOpen(true);
                          }}
                          className="mt-2.5 px-3 py-1.5 bg-wood-primary text-white text-[9px] font-display font-bold uppercase rounded-lg hover:bg-wood-dark transition-colors cursor-pointer inline-block"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer footer spacer */}
              <div className="p-6 bg-white border-t border-wood-primary/10 text-center">
                <button
                  onClick={() => {
                    setIsWishlistOpen(false);
                    handleNavigation("shop");
                  }}
                  className="w-full py-3 border border-wood-primary text-wood-primary hover:bg-wood-primary/5 rounded-xl text-xs font-display font-bold uppercase tracking-wider transition-all cursor-pointer"
                >
                  Browse all woodworks
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* CHECKOUT MODAL DRAWER OVERLAY */}
      {isCheckoutOpen && (
        <CheckoutModal
          cart={cart}
          cartTotal={getCartTotal()}
          onClose={() => setIsCheckoutOpen(false)}
          onClearCart={() => setCart([])}
          onOrderPlaced={handleOrderPlaced}
        />
      )}

    </div>
  );
}
