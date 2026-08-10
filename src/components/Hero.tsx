import { useState } from "react";
import { motion } from "motion/react";
import { Sparkles, ShoppingBag, ArrowRight } from "lucide-react";

interface HeroProps {
  onShopNow: () => void;
  onExploreCustom: () => void;
}

export default function Hero({ onShopNow, onExploreCustom }: HeroProps) {
  const [viewMode, setViewMode] = useState<"render" | "interactive">("render");

  // Generate random coordinates for floating wood particles
  const particles = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    size: Math.random() * 6 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5
  }));

  return (
    <section id="hero-section" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#1b1b1b] to-[#2c1e13] text-white py-16 px-4">
      {/* Dynamic Animated Wood Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-40">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-wood-gold/30 blur-[1px]"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
            }}
            animate={{
              y: ["0px", "-150px", "0px"],
              x: ["0px", `${Math.random() * 40 - 20}px`, "0px"],
              opacity: [0.1, 0.7, 0.1]
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Floating Wooden Leaf Silhouettes in background */}
      <div className="absolute top-1/4 left-10 w-32 h-32 bg-[#8B5A2B]/10 rounded-full blur-3xl pointer-events-none animate-float" />
      <div className="absolute bottom-1/4 right-12 w-48 h-48 bg-wood-gold/5 rounded-full blur-3xl pointer-events-none animate-slow-spin" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 w-full">
        {/* Left Text Column */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6 text-left"
        >
          <div className="inline-flex items-center space-x-2 bg-wood-gold/15 border border-wood-gold/30 px-3 py-1.5 rounded-full">
            <Sparkles className="w-4 h-4 text-wood-gold" />
            <span className="font-display text-[10px] sm:text-xs font-semibold tracking-wider text-wood-gold uppercase">
              WoodNest Craftsmanship Showcase
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
            Premium MDF <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-wood-gold via-[#e9cb6b] to-wood-primary">
              Home Décor
            </span> <br />
            That Elevates Spaces
          </h1>

          <p className="font-sans text-sm sm:text-base text-gray-300 max-w-lg leading-relaxed font-light">
            Crafting Wooden Elegance for Every Home. Explore our stunning selection of beautiful handcrafted MDF key hanging stands, customized name plaques, wall décor, and sacred Islamic calligraphy—designed with absolute passion, creativity, and structural precision.
          </p>

          {/* Call To Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
            <button
              onClick={onShopNow}
              className="group flex items-center justify-center space-x-2 px-8 py-4 rounded-xl bg-gradient-to-r from-wood-primary to-wood-dark hover:from-wood-gold hover:to-wood-primary text-white font-display text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-lg shadow-wood-dark/50 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Shop Collection</span>
            </button>

            <button
              onClick={onExploreCustom}
              className="flex items-center justify-center space-x-2 px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/40 text-white font-display text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer"
            >
              <span>Custom Configurator</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Small Trust Badges */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 text-center sm:text-left">
            <div>
              <p className="font-serif text-lg sm:text-2xl font-bold text-wood-gold">100%</p>
              <p className="font-sans text-[10px] text-gray-400">Premium MDF Board</p>
            </div>
            <div>
              <p className="font-serif text-lg sm:text-2xl font-bold text-wood-gold">12K+</p>
              <p className="font-sans text-[10px] text-gray-400">Happy Homes</p>
            </div>
            <div>
              <p className="font-serif text-lg sm:text-2xl font-bold text-wood-gold">5.0 ★</p>
              <p className="font-sans text-[10px] text-gray-400">Customer Rating</p>
            </div>
          </div>
        </motion.div>

        {/* Right 3D Column with Toggle Selection */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="flex flex-col justify-center items-center relative mt-8 lg:mt-0"
        >
          {/* Toggler Controls */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex items-center space-x-1.5 bg-black/60 backdrop-blur-md border border-white/10 px-1.5 py-1 rounded-full z-20 shadow-lg">
            <button
              onClick={() => setViewMode("render")}
              className={`px-4 py-1.5 rounded-full font-display text-[9px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                viewMode === "render"
                  ? "bg-wood-gold text-wood-dark shadow-sm scale-105"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              3D Design Render
            </button>
            <button
              onClick={() => setViewMode("interactive")}
              className={`px-4 py-1.5 rounded-full font-display text-[9px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                viewMode === "interactive"
                  ? "bg-wood-gold text-wood-dark shadow-sm scale-105"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Interactive Model
            </button>
          </div>

          {viewMode === "render" ? (
            <div className="flex flex-col items-center w-full mt-4">
              {/* 3D Rotating Product Card */}
              <motion.div
                key="render-view"
                animate={{
                  rotateY: [0, 360]
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{ transformStyle: "preserve-3d", perspective: 1200 }}
                className="relative w-72 h-56 sm:w-96 sm:h-72 rounded-3xl cursor-grab active:cursor-grabbing shadow-2xl animate-float"
              >
                {/* Front Face: The 3D Render Image */}
                <div
                  style={{ 
                    transform: "translateZ(1px)",
                    backfaceVisibility: "hidden"
                  }}
                  className="absolute inset-0 rounded-3xl overflow-hidden border border-white/10 bg-black/40 shadow-xl"
                >
                  <img 
                    src="/src/assets/images/hero_landing_3d_1784023264636.jpg" 
                    alt="WoodNest 3D Showcase" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Back Face: Ultra HD 3D Emblem Logo */}
                <div
                  style={{ 
                    transform: "rotateY(180deg) translateZ(1px)",
                    backfaceVisibility: "hidden"
                  }}
                  className="absolute inset-0 rounded-3xl overflow-hidden border-2 border-wood-gold/50 shadow-2xl bg-black"
                >
                  <img 
                    src="/src/assets/images/woodnest_hd_logo_3d_1786383915475.jpg" 
                    alt="WoodNest 3D HD Logo Emblem" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-center">
                    <span className="font-serif text-sm font-bold text-white tracking-wider block drop-shadow-md">
                      WoodNest Decor
                    </span>
                    <span className="font-sans text-[9px] text-wood-gold tracking-widest uppercase block">
                      3D Emblem Logo
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Caption placed BELOW the rotating card, completely clear! */}
              <div className="w-full max-w-xs sm:max-w-md bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-left mt-6 shadow-xl">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="inline-block bg-wood-gold/20 border border-wood-gold/40 text-wood-gold text-[8px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full">
                    Master Render
                  </span>
                  <span className="text-[10px] text-gray-400">• 3D Showcase</span>
                </div>
                <p className="font-serif text-sm font-bold text-white">
                  Handcrafted Entryway Organizers
                </p>
                <p className="font-sans text-[11px] text-gray-300 font-light mt-1 leading-relaxed">
                  Staggered walnut shelves with custom premium hooks and home accents — as displayed in the perfect luxury interior.
                </p>
              </div>
            </div>
          ) : (
            /* Main Showcase Plate with Glow */
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-br from-wood-dark/40 to-black/60 p-1 border border-white/10 flex items-center justify-center shadow-2xl mt-4">
              {/* Absolute radial spotlights */}
              <div className="absolute inset-0 rounded-full bg-radial-gradient from-wood-gold/10 to-transparent blur-md" />

              {/* Rotating 3D Keyholder Representation (Layered CSS) */}
              <motion.div
                animate={{
                  rotateY: [0, 360],
                  y: [0, -8, 0]
                }}
                transition={{
                  rotateY: { duration: 18, repeat: Infinity, ease: "linear" },
                  y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                }}
                style={{ transformStyle: "preserve-3d", perspective: 800 }}
                className="relative w-60 h-60 sm:w-80 sm:h-80 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing"
              >
                {/* Backing Wood Plaque */}
                <div 
                  style={{ transform: "translateZ(-15px)" }}
                  className="absolute inset-4 rounded-2xl bg-gradient-to-br from-[#8B5A2B] to-[#5A3A22] border-2 border-wood-gold/40 shadow-xl flex flex-col items-center justify-center p-6 text-center"
                >
                  {/* Silhouette tree laser-cut */}
                  <div className="w-16 h-16 sm:w-24 sm:h-24 opacity-25 border border-wood-gold rounded-full flex items-center justify-center mb-2">
                    <span className="font-serif text-4xl text-wood-gold">🌳</span>
                  </div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#F8F4EC]">
                    WoodNest
                  </h3>
                  <p className="font-sans text-[9px] sm:text-xs text-wood-gold tracking-widest uppercase">
                    Est. 2021 • Handcrafted
                  </p>
                </div>

                {/* Front Plate (Glassmorphism overlap) */}
                <div 
                  style={{ transform: "translateZ(15px)" }}
                  className="absolute bottom-8 left-6 right-6 p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg flex justify-around items-center"
                >
                  <div className="text-center">
                    <span className="block text-xl">🗝️</span>
                    <span className="text-[9px] text-gray-300 font-display">Key Slot 1</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-xl">🗝️</span>
                    <span className="text-[9px] text-gray-300 font-display">Key Slot 2</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-xl">🏠</span>
                    <span className="text-[9px] text-gray-300 font-display">Home Safe</span>
                  </div>
                </div>

                {/* Metal Brass Hooks (3D Pins) */}
                <div 
                  style={{ transform: "translateZ(25px)" }}
                  className="absolute bottom-16 flex space-x-12"
                >
                  <div className="w-2.5 h-6 bg-wood-gold rounded-full border border-yellow-200 shadow-md transform rotate-12" />
                  <div className="w-2.5 h-6 bg-wood-gold rounded-full border border-yellow-200 shadow-md transform rotate-12" />
                  <div className="w-2.5 h-6 bg-wood-gold rounded-full border border-yellow-200 shadow-md transform rotate-12" />
                </div>
              </motion.div>
            </div>
          )}

          {/* Secondary Floating Accents */}
          <motion.div
            animate={{ y: [0, 10, 0], rotate: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-4 right-2 sm:right-6 bg-gradient-to-br from-[#8B5A2B] to-[#5A3A22] border border-wood-gold/50 text-[#F8F4EC] text-[10px] font-display px-3 py-1.5 rounded-xl shadow-md rotate-12 flex items-center space-x-1.5 z-10"
          >
            <span>✨ 3D Customized Preview</span>
          </motion.div>

          <motion.div
            animate={{ y: [0, -12, 0], rotate: [0, 8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-4 left-6 bg-wood-gold text-wood-dark text-[10px] font-bold font-display px-3 py-1.5 rounded-xl shadow-lg -rotate-6 z-10"
          >
            🔥 Bestseller key stand
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
