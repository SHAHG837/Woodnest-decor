import React, { useState } from "react";
import { MessageCircle, Mail, Globe, Sparkles, AlertCircle, Shield, FileText, Check } from "lucide-react";

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [emailValue, setEmailValue] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [showCookie, setShowCookie] = useState(true);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailValue.trim()) {
      setIsSubscribed(true);
      setEmailValue("");
      setTimeout(() => {
        setIsSubscribed(false);
      }, 3000);
    }
  };

  return (
    <>
      <footer id="footer-container" className="bg-[#1b1b1b] text-white pt-16 pb-8 border-t border-wood-gold/10 relative z-10 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/5 pb-12">
          
          {/* Column 1: Brand presentation */}
          <div className="space-y-4">
            <div className="flex items-center cursor-pointer group" onClick={() => onNavigate('home')}>
              <div className="mr-3 w-9 h-9 rounded-lg overflow-hidden flex items-center justify-center border border-wood-gold/30 group-hover:scale-105 transition-transform duration-300">
                <img 
                  src="/src/assets/images/woodnest_logo_3d_1784023248615.jpg" 
                  alt="WoodNest 3D Logo" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="font-serif text-lg font-bold tracking-tight text-[#F8F4EC] group-hover:text-wood-gold transition-colors duration-300">
                  WoodNest
                </span>
                <span className="block text-[8px] font-display font-semibold tracking-widest text-wood-gold uppercase">
                  Decor
                </span>
              </div>
            </div>
            <p className="font-sans text-xs text-gray-400 font-light leading-relaxed">
              Premium handcrafted wooden and MDF home décor designed to add absolute warmth, luxury aesthetics, and functionality to your modern home space.
            </p>
            <div className="flex space-x-3 text-gray-400">
              <span className="text-xs">Est. 2021 • Handcrafted Quality</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-bold text-wood-gold">Quick Navigation</h4>
            <div className="flex flex-col space-y-2 text-xs text-gray-400 font-light">
              <button onClick={() => onNavigate('home')} className="text-left hover:text-wood-gold transition-colors cursor-pointer">Home Welcome</button>
              <button onClick={() => onNavigate('about')} className="text-left hover:text-wood-gold transition-colors cursor-pointer">Our Legacy Story</button>
              <button onClick={() => onNavigate('shop')} className="text-left hover:text-wood-gold transition-colors cursor-pointer">Shop Collections</button>
              <button onClick={() => onNavigate('customizer')} className="text-left hover:text-wood-gold transition-colors cursor-pointer">3D Customizer Workbench</button>
            </div>
          </div>

          {/* Column 3: Policy documents */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-bold text-wood-gold">Consumer Policies</h4>
            <div className="flex flex-col space-y-2 text-xs text-gray-400 font-light">
              <button onClick={() => setIsPolicyOpen(true)} className="text-left hover:text-wood-gold transition-colors cursor-pointer flex items-center gap-1">
                <Shield className="w-3.5 h-3.5" /> Privacy Policy
              </button>
              <button onClick={() => setIsTermsOpen(true)} className="text-left hover:text-wood-gold transition-colors cursor-pointer flex items-center gap-1">
                <FileText className="w-3.5 h-3.5" /> Terms of Service
              </button>
              <span className="text-gray-500 block text-[10px]">Returns: 7 days hassle-free replacements</span>
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-bold text-wood-gold">Join the Carpentry Club</h4>
            <p className="font-sans text-xs text-gray-400 font-light leading-relaxed">
              Subscribe to receive curated styling tips, new MDF drops, and private coupons!
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                  placeholder="E.g., syed@domain.com"
                  className="w-full pl-3 pr-10 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:ring-1 focus:ring-wood-gold placeholder-gray-500"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 bg-wood-primary hover:bg-wood-gold text-white rounded-lg transition-colors cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5" />
                </button>
              </div>
              {isSubscribed && (
                <p className="text-[10px] text-green-400 font-sans font-medium flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Code received! Welcome to the woodwork circle.
                </p>
              )}
            </form>
          </div>

        </div>

        {/* Footer Bottom copyright section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <p>© 2026 WoodNest Decor Ltd. All rights reserved. Crafting Wooden Elegance for Every Home.</p>
          <div className="flex space-x-4">
            <span className="hover:text-white transition-colors cursor-default">Designed in UK & Pakistan</span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-default">Secure checkout guaranteed</span>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Quick Launch Shortcut */}
      <a
        href="https://wa.me/923000000000?text=Hello%20WoodNest%20Decor!%20I%20am%20interested%20in%20creating%20a%20customized%20MDF%20plaque..."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 right-6 z-40 p-4 rounded-full bg-green-600 hover:bg-green-500 text-white shadow-2xl hover:scale-110 transition-transform flex items-center justify-center border border-green-400/20 cursor-pointer"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
      </a>

      {/* Cookie Consent widget */}
      {showCookie && (
        <div className="fixed bottom-6 left-6 z-50 max-w-sm p-4 bg-[#1b1b1b] border border-wood-gold/30 rounded-2xl shadow-2xl flex items-start gap-3.5 animate-in slide-in-from-bottom-5 duration-300">
          <AlertCircle className="w-6 h-6 text-wood-gold flex-shrink-0 mt-0.5" />
          <div className="space-y-2">
            <p className="font-sans text-[10px] sm:text-xs text-gray-300 font-light leading-relaxed">
              <strong>Cookie Notice:</strong> WoodNest utilizes essential client cookie states and secure Firestore cache parameters to preserve your luxury customization board settings.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowCookie(false)}
                className="px-3 py-1.5 rounded-lg bg-wood-primary hover:bg-wood-gold text-white font-display text-[9px] font-bold uppercase tracking-wider cursor-pointer transition-colors"
              >
                Accept Wood grains
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Policy Modal */}
      {isPolicyOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-wood-cream border border-wood-primary/20 p-8 rounded-3xl relative shadow-2xl max-h-[80vh] overflow-y-auto">
            <button onClick={() => setIsPolicyOpen(false)} className="absolute top-4 right-4 text-xs font-display text-wood-primary hover:underline cursor-pointer">
              Close ✕
            </button>
            <h3 className="font-serif text-xl font-bold text-wood-dark mb-4">WoodNest Privacy Mandates</h3>
            <div className="font-sans text-xs text-wood-charcoal/80 space-y-3 leading-relaxed font-light">
              <p><strong>1. Data Synchronization</strong>: We securely store checkout metadata, phone numbers, and custom plate configurations inside premium, cloud-hosted Google Firebase Firestore containers. Your raw text inputs are completely safe and never sold to third-party brokers.</p>
              <p><strong>2. Google GenAI API Proxies</strong>: When you access Woody AI Assistant, your query is proxied through our encrypted Express `/api/ai/*` servers. None of your personal email accounts or secrets are exposed inside the browser context.</p>
              <p><strong>3. Analytics</strong>: We log standard transactional histories to display accurate progress logs on your personal dashboard.</p>
            </div>
          </div>
        </div>
      )}

      {/* Terms of Service Modal */}
      {isTermsOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-wood-cream border border-wood-primary/20 p-8 rounded-3xl relative shadow-2xl max-h-[80vh] overflow-y-auto">
            <button onClick={() => setIsTermsOpen(false)} className="absolute top-4 right-4 text-xs font-display text-wood-primary hover:underline cursor-pointer">
              Close ✕
            </button>
            <h3 className="font-serif text-xl font-bold text-wood-dark mb-4">Terms of Wood Crafting</h3>
            <div className="font-sans text-xs text-wood-charcoal/80 space-y-3 leading-relaxed font-light">
              <p><strong>1. Customized Orders</strong>: WoodNest custom orders represent completely customized products manufactured specifically for your home. Once custom laser cutting commences, customized plaques cannot be cancelled or refunded.</p>
              <p><strong>2. Visual Accuracy</strong>: Our interactive 3D configurator utilizes web styling to represent final wood paints. Actual satin rosewood and walnut stains may experience slight organic variations in wood grains.</p>
              <p><strong>3. Shipping</strong>: We dispatch all home décor items within 3-5 business days. Safe, premium packaging is guaranteed.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
