import React, { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, Heart, User, LogOut, Loader2, Sparkles } from "lucide-react";
import { auth } from "../firebase";
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onNavigate: (page: string) => void;
  activePage: string;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
}

export default function Navbar({
  cartCount,
  wishlistCount,
  onNavigate,
  activePage,
  onOpenCart,
  onOpenWishlist
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Monitor auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsLoading(true);

    try {
      if (authMode === 'login') {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      setIsAuthModalOpen(false);
      setEmail('');
      setPassword('');
      setFullName('');
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setAuthError('Invalid email or password.');
      } else if (err.code === 'auth/email-already-in-use') {
        setAuthError('Email is already in use.');
      } else if (err.code === 'auth/weak-password') {
        setAuthError('Password should be at least 6 characters.');
      } else {
        setAuthError(err.message || 'Authentication failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const navItems = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Shop", id: "shop" },
    { name: "Custom Config", id: "customizer" },
    { name: "FAQ", id: "faq" },
    { name: "Contact", id: "contact" }
  ];

  return (
    <>
      <nav id="navbar-container" className="sticky top-0 z-50 bg-wood-cream/90 backdrop-blur-md border-b border-wood-primary/10 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo */}
            <div className="flex-shrink-0 flex items-center cursor-pointer group" onClick={() => onNavigate('home')}>
              <div className="relative mr-3 w-11 h-11 rounded-xl overflow-hidden shadow-md border border-wood-gold/30 group-hover:scale-105 transition-transform duration-300">
                <img 
                  src="/src/assets/images/woodnest_logo_3d_1784023248615.jpg" 
                  alt="WoodNest 3D Logo" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-wood-gold rounded-full flex items-center justify-center border border-wood-cream z-10">
                  <Sparkles className="w-2.5 h-2.5 text-wood-dark" />
                </div>
              </div>
              <div>
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-wood-dark group-hover:text-wood-primary transition-colors duration-300">
                  WoodNest
                </span>
                <span className="block text-[9px] font-display font-semibold tracking-widest text-wood-primary uppercase">
                  Decor
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`font-display text-sm font-medium tracking-wide transition-colors duration-200 cursor-pointer ${
                    activePage === item.id
                      ? "text-wood-primary border-b-2 border-wood-primary pb-1"
                      : "text-wood-charcoal/80 hover:text-wood-primary"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Icons & Controls */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Wishlist Button */}
              <button
                onClick={onOpenWishlist}
                className="relative p-2 text-wood-charcoal/80 hover:text-wood-primary transition-colors cursor-pointer"
                title="Wishlist"
              >
                <Heart className="w-6 h-6" />
                {wishlistCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white bg-wood-primary rounded-full">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Cart Button */}
              <button
                onClick={onOpenCart}
                className="relative p-2 text-wood-charcoal/80 hover:text-wood-primary transition-colors cursor-pointer"
                title="Shopping Cart"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white bg-wood-gold rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* User Account / Login */}
              {user ? (
                <div className="flex items-center space-x-3 bg-wood-primary/5 pl-3 pr-1 py-1 rounded-full border border-wood-primary/10">
                  <span
                    onClick={() => onNavigate('dashboard')}
                    className="font-display text-xs font-semibold text-wood-dark hover:underline cursor-pointer"
                  >
                    {user.email.split('@')[0]}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="p-1.5 bg-wood-cream rounded-full text-wood-dark hover:text-red-600 shadow-sm border border-wood-primary/10 transition-colors cursor-pointer"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setAuthMode('login');
                    setIsAuthModalOpen(true);
                  }}
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-wood-dark text-wood-cream font-display text-xs font-semibold tracking-wide hover:bg-wood-primary hover:text-white transition-all shadow-sm cursor-pointer"
                >
                  <User className="w-4 h-4" />
                  <span>Sign In</span>
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              <button onClick={onOpenCart} className="relative p-2 text-wood-charcoal">
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white bg-wood-gold rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-wood-charcoal hover:text-wood-primary focus:outline-none"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state */}
        {isOpen && (
          <div className="md:hidden bg-wood-cream/95 border-b border-wood-primary/10 backdrop-blur-lg">
            <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 rounded-lg font-display text-sm font-medium ${
                    activePage === item.id
                      ? "bg-wood-primary/10 text-wood-primary font-semibold"
                      : "text-wood-charcoal hover:bg-wood-primary/5 hover:text-wood-primary"
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <div className="pt-4 border-t border-wood-primary/10 flex items-center justify-between px-4">
                <button
                  onClick={() => {
                    onOpenWishlist();
                    setIsOpen(false);
                  }}
                  className="flex items-center space-x-2 text-wood-charcoal hover:text-wood-primary py-2"
                >
                  <Heart className="w-5 h-5 text-wood-primary" />
                  <span className="font-display text-sm">Wishlist ({wishlistCount})</span>
                </button>

                {user ? (
                  <button
                    onClick={() => {
                      onNavigate('dashboard');
                      setIsOpen(false);
                    }}
                    className="flex items-center space-x-2 text-wood-charcoal hover:text-wood-primary py-2"
                  >
                    <User className="w-5 h-5" />
                    <span className="font-display text-sm">My Dashboard</span>
                  </button>
                ) : null}
              </div>

              <div className="px-4 pt-2">
                {user ? (
                  <div className="flex items-center justify-between bg-wood-primary/5 p-2 rounded-lg">
                    <span className="font-display text-xs font-semibold text-wood-dark">{user.email}</span>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="flex items-center space-x-1 text-red-600 text-xs font-semibold"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setAuthMode('login');
                      setIsAuthModalOpen(true);
                    }}
                    className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-wood-dark text-wood-cream font-display text-sm font-semibold hover:bg-wood-primary transition-all"
                  >
                    <User className="w-5 h-5" />
                    <span>Sign In</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Auth Modal (Glassmorphism) */}
      {isAuthModalOpen && (
        <div id="auth-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md glass-wood-panel p-8 rounded-3xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsAuthModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-wood-primary/10 text-wood-charcoal/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <h2 className="font-serif text-2xl font-bold text-wood-dark">
                {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="font-display text-xs text-wood-charcoal/60 mt-1">
                {authMode === 'login'
                  ? 'Access your saved WoodNest orders and wishlist'
                  : 'Join the WoodNest community for premium benefits'}
              </p>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {authMode === 'register' && (
                <div>
                  <label className="block font-display text-xs font-semibold text-wood-charcoal/80 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="E.g., Alexander Wood"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-wood-primary/20 bg-white/70 focus:outline-none focus:ring-2 focus:ring-wood-primary/50 text-sm font-sans"
                  />
                </div>
              )}

              <div>
                <label className="block font-display text-xs font-semibold text-wood-charcoal/80 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-wood-primary/20 bg-white/70 focus:outline-none focus:ring-2 focus:ring-wood-primary/50 text-sm font-sans"
                />
              </div>

              <div>
                <label className="block font-display text-xs font-semibold text-wood-charcoal/80 mb-1">Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-wood-primary/20 bg-white/70 focus:outline-none focus:ring-2 focus:ring-wood-primary/50 text-sm font-sans"
                />
              </div>

              {authError && (
                <p className="text-xs text-red-600 font-sans font-medium text-center bg-red-50 p-2 rounded-lg">
                  {authError}
                </p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center py-3 rounded-xl bg-wood-primary hover:bg-wood-dark text-white font-display text-xs font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  authMode === 'login' ? 'Sign In' : 'Create Account'
                )}
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-wood-primary/10 text-center text-xs">
              {authMode === 'login' ? (
                <p className="text-wood-charcoal/60">
                  New to WoodNest?{" "}
                  <button
                    onClick={() => setAuthMode('register')}
                    className="font-semibold text-wood-primary hover:underline cursor-pointer"
                  >
                    Register here
                  </button>
                </p>
              ) : (
                <p className="text-wood-charcoal/60">
                  Already have an account?{" "}
                  <button
                    onClick={() => setAuthMode('login')}
                    className="font-semibold text-wood-primary hover:underline cursor-pointer"
                  >
                    Log In
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
