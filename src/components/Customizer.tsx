import { useState } from "react";
import { Sparkles, Check, ShoppingCart, HelpCircle } from "lucide-react";
import { CustomConfig } from "../types";
import { Product } from "../data/products";

interface CustomizerProps {
  onAddToCart: (product: Product, quantity: number, customConfig?: CustomConfig) => void;
}

export default function Customizer({ onAddToCart }: CustomizerProps) {
  const [engravedText, setEngravedText] = useState<string>("Bismillah");
  const [selectedColor, setSelectedColor] = useState<string>("Teak Orange");
  const [selectedSize, setSelectedSize] = useState<string>("Large");
  const [selectedFont, setSelectedFont] = useState<string>("Great Vibes");
  const [selectedDesign, setSelectedDesign] = useState<string>("Key Hanging Plaque");
  const [wallColor, setWallColor] = useState<string>("bg-neutral-800"); // Slate wall, cream wall, etc.
  const [isAdded, setIsAdded] = useState<boolean>(false);

  // Available options
  const designs = [
    { name: "Key Hanging Plaque", basePrice: 2999, desc: "Includes 5 polished solid brass hanging hooks" },
    { name: "Grand Name Plaque", basePrice: 3499, desc: "Double-layered laser cut border details" },
    { name: "Sacred Islamic Plaque", basePrice: 4299, desc: "Intricate laser-cut patterns with acrylic details" },
    { name: "Family Circular Ring", basePrice: 2699, desc: "Double circle portrait wreath frame design" }
  ];

  const colors = [
    { name: "Teak Orange", code: "bg-[#D98A41]", fontColor: "text-amber-950", border: "border-[#A05C23]" },
    { name: "Walnut Brown", code: "bg-[#704622]", fontColor: "text-[#F8F4EC]", border: "border-[#4A2D13]" },
    { name: "Rosewood Red", code: "bg-[#802D2A]", fontColor: "text-amber-100", border: "border-[#521917]" },
    { name: "Ebony Black", code: "bg-[#282828]", fontColor: "text-amber-300", border: "border-black" },
    { name: "Royal Gold Overlay", code: "bg-gradient-to-br from-[#D4AF37] to-[#AA7C11]", fontColor: "text-amber-950", border: "border-amber-600" }
  ];

  const fonts = [
    { name: "Playfair Display", class: "font-serif" },
    { name: "Great Vibes", class: "italic font-light tracking-wide text-3xl font-serif" },
    { name: "Poppins", class: "font-sans uppercase tracking-widest font-semibold" },
    { name: "Montserrat", class: "font-display font-extrabold uppercase" }
  ];

  const sizes = [
    { name: "Standard (30x20cm)", multiplier: 1.0 },
    { name: "Large (45x25cm)", multiplier: 1.25 },
    { name: "Royal (60x35cm)", multiplier: 1.5 }
  ];

  const walls = [
    { name: "Luxury Charcoal", class: "bg-neutral-800" },
    { name: "Warm Cream", class: "bg-[#F3EFE0]" },
    { name: "Slate Grey", class: "bg-slate-500" },
    { name: "Royal Teal", class: "bg-teal-900" }
  ];

  // Price calculations
  const designObj = designs.find(d => d.name === selectedDesign) || designs[0];
  const sizeObj = sizes.find(s => s.name === selectedSize) || sizes[0];
  const finalPrice = Math.round((designObj.basePrice * sizeObj.multiplier) * 100) / 100;

  const handleCustomAddToCart = () => {
    // Generate a temporary mock Product object representing this customized creation
    const customProduct: Product = {
      id: `custom-${Date.now()}`,
      name: `${selectedDesign} - "${engravedText}"`,
      category: "Customized Gifts",
      price: finalPrice,
      description: `Bespoke handcrafted wooden plaque customized with text "${engravedText}", finished in ${selectedColor} (${selectedSize}) utilizing ${selectedFont} lettering style.`,
      rating: 5.0,
      reviewCount: 1,
      image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=600",
      specifications: {
        material: "High Density Engineered MDF",
        thickness: "12mm layered",
        dimensions: selectedSize,
        finish: `${selectedColor} Polish`
      },
      customizable: true
    };

    const config: CustomConfig = {
      name: engravedText,
      color: selectedColor,
      size: selectedSize,
      font: selectedFont,
      design: selectedDesign
    };

    onAddToCart(customProduct, 1, config);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  const activeColor = colors.find(c => c.name === selectedColor) || colors[0];
  const activeFont = fonts.find(f => f.name === selectedFont) || fonts[0];

  return (
    <section id="customizer-section" className="py-24 px-4 bg-wood-cream wood-grain-overlay">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="font-display text-xs font-bold text-wood-primary uppercase tracking-widest block">
            Co-Create Your Vision
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-wood-dark tracking-tight">
            MDF Custom Configurator
          </h2>
          <div className="h-1 w-20 bg-wood-gold mx-auto rounded-full" />
          <p className="font-sans text-xs sm:text-sm text-wood-charcoal/70 leading-relaxed font-light">
            Type your script, select your colors, pick dimensions, and watch your custom wooden masterpiece come to life in front of luxury room backgrounds.
          </p>
        </div>

        {/* Configurator Workbench */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Controls Column (Left) */}
          <div className="lg:col-span-5 bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-wood-primary/10 shadow-lg space-y-6 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex items-center space-x-2 pb-4 border-b border-wood-primary/10">
                <Sparkles className="w-5 h-5 text-wood-gold" />
                <h3 className="font-serif text-lg font-bold text-wood-dark">Design Workbench</h3>
              </div>

              {/* Engraved text */}
              <div className="space-y-1.5">
                <label className="block text-xs font-display font-semibold text-wood-charcoal">
                  Your Engraved Script (Names / Phrase)
                </label>
                <input
                  type="text"
                  maxLength={25}
                  value={engravedText}
                  onChange={(e) => setEngravedText(e.target.value)}
                  placeholder="E.g., Welcome / The Smiths"
                  className="w-full px-4 py-2.5 rounded-xl border border-wood-primary/15 bg-wood-cream/20 font-sans text-sm text-wood-charcoal focus:outline-none focus:ring-2 focus:ring-wood-primary/40"
                />
              </div>

              {/* Design Categories */}
              <div className="space-y-1.5">
                <label className="block text-xs font-display font-semibold text-wood-charcoal">
                  Plaque Layout Style
                </label>
                <select
                  value={selectedDesign}
                  onChange={(e) => setSelectedDesign(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-wood-primary/15 bg-white text-xs font-display text-wood-charcoal focus:outline-none"
                >
                  {designs.map((d) => (
                    <option key={d.name} value={d.name}>
                      {d.name} (Base: ${d.basePrice})
                    </option>
                  ))}
                </select>
                <span className="block text-[10px] text-wood-primary font-sans font-light">
                  {designObj.desc}
                </span>
              </div>

              {/* Wooden Colors */}
              <div className="space-y-1.5">
                <label className="block text-xs font-display font-semibold text-wood-charcoal mb-2">
                  Wooden Stain & Lacquer Polish
                </label>
                <div className="flex flex-wrap gap-2">
                  {colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`px-3 py-2 rounded-xl text-[10px] font-display font-bold flex items-center space-x-1.5 border transition-all cursor-pointer ${
                        selectedColor === c.name
                          ? "border-wood-dark ring-2 ring-wood-primary/20 scale-105"
                          : "border-wood-primary/15 opacity-80"
                      }`}
                    >
                      <span className={`w-3 h-3 rounded-full ${c.code} border border-black/10 inline-block`} />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Fonts List */}
              <div className="space-y-1.5">
                <label className="block text-xs font-display font-semibold text-wood-charcoal">
                  Typography Script Font
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {fonts.map((f) => (
                    <button
                      key={f.name}
                      onClick={() => setSelectedFont(f.name)}
                      className={`p-3 rounded-xl border text-xs text-center transition-all cursor-pointer ${
                        selectedFont === f.name
                          ? "bg-wood-primary text-white border-wood-primary shadow"
                          : "bg-white text-wood-charcoal border-wood-primary/15 hover:bg-wood-primary/5"
                      }`}
                    >
                      <span className={`${f.class} block text-xs`}>
                        {f.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dimensions selection */}
              <div className="space-y-1.5">
                <label className="block text-xs font-display font-semibold text-wood-charcoal">
                  Board Dimensions
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {sizes.map((s) => (
                    <button
                      key={s.name}
                      onClick={() => setSelectedSize(s.name)}
                      className={`p-2.5 rounded-xl border text-[10px] font-display font-bold text-center transition-all cursor-pointer ${
                        selectedSize === s.name
                          ? "bg-wood-dark text-[#F8F4EC] border-wood-dark"
                          : "bg-white text-wood-charcoal border-wood-primary/15 hover:bg-wood-primary/5"
                      }`}
                    >
                      {s.name.split(" ")[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Wallpaper background switcher */}
              <div className="space-y-1.5 pt-2">
                <label className="block text-xs font-display font-semibold text-wood-charcoal">
                  Preview Background Wall Color
                </label>
                <div className="flex space-x-2">
                  {walls.map((w) => (
                    <button
                      key={w.name}
                      onClick={() => setWallColor(w.class)}
                      className={`w-6 h-6 rounded-full ${w.class} border-2 transition-all cursor-pointer ${
                        wallColor === w.class ? "border-wood-gold ring-2 ring-wood-gold/30 scale-110" : "border-white/50"
                      }`}
                      title={w.name}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Price section & Purchase button */}
            <div className="pt-6 border-t border-wood-primary/10 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="block text-[10px] font-display text-wood-charcoal/50 uppercase tracking-wider">
                    Bespoke Handcrafted Price
                  </span>
                  <span className="font-serif text-3xl font-bold text-wood-dark">
                    Rs. {finalPrice.toLocaleString()}
                  </span>
                </div>
                <div className="text-right">
                  <span className="inline-block bg-green-100 text-green-800 text-[9px] font-display font-bold uppercase px-2.5 py-1 rounded">
                    ✓ Shipping Included
                  </span>
                </div>
              </div>

              {isAdded ? (
                <div className="p-3.5 bg-green-50 text-green-700 rounded-xl font-sans text-xs font-semibold text-center border border-green-200 flex items-center justify-center space-x-2">
                  <Check className="w-5 h-5 animate-pulse" />
                  <span>Custom wood masterpiece added to your basket!</span>
                </div>
              ) : (
                <button
                  onClick={handleCustomAddToCart}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-wood-primary to-wood-dark hover:from-wood-gold hover:to-wood-primary text-white font-display text-xs font-extrabold uppercase tracking-widest shadow-md transition-all cursor-pointer flex items-center justify-center space-x-2.5"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add Customized Plaque to Cart</span>
                </button>
              )}
            </div>
          </div>

          {/* Interactive Live Preview Canvas Column (Right) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            {/* Live Backdrop Display */}
            <div className={`flex-grow ${wallColor} rounded-3xl min-h-[400px] flex items-center justify-center p-6 sm:p-12 transition-all duration-500 shadow-inner relative overflow-hidden border border-wood-primary/10`}>
              {/* Luxury spotlights reflecting on the wall */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-white/10 rounded-full blur-[60px] pointer-events-none" />
              
              {/* Plaque Canvas Card */}
              <div className={`relative ${activeColor.code} ${activeColor.border} border-4 rounded-2xl w-full max-w-md p-8 text-center flex flex-col items-center justify-center shadow-2xl transition-all duration-500 min-h-[180px] transform hover:scale-[1.02] cursor-default`}>
                
                {/* Board Hanging String Loop */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-28 h-12 border-t-2 border-x-2 border-yellow-800/30 rounded-t-full pointer-events-none" />
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-wood-dark rounded-full shadow" />

                {/* Laser Cut Intricate border framing */}
                <div className="absolute inset-2 border-2 border-dashed border-white/20 rounded-xl pointer-events-none" />

                {/* Sacred design icons / stars */}
                {selectedDesign === "Sacred Islamic Plaque" && (
                  <div className="mb-2 text-white/50 text-xs">🕌 ✦ 🕌</div>
                )}
                
                {selectedDesign === "Family Circular Ring" && (
                  <div className="w-16 h-16 rounded-full border border-white/30 flex items-center justify-center mb-2 animate-slow-spin text-white/40 text-sm">
                    🌿
                  </div>
                )}

                {/* Customized Text */}
                <h4 className={`${activeFont.class} ${activeColor.fontColor} text-2xl sm:text-3xl font-bold tracking-tight drop-shadow-md select-none transition-all break-all`}>
                  {engravedText || "Welcome"}
                </h4>

                {/* Standard subtexts */}
                <p className={`font-sans text-[9px] uppercase tracking-widest mt-1 opacity-70 ${activeColor.fontColor}`}>
                  {selectedSize.split(" ")[0]} Edition • WoodNest Custom
                </p>

                {/* Solid brass key hooks if key-hanging is selected */}
                {selectedDesign === "Key Hanging Plaque" && (
                  <div className="absolute bottom-[-16px] left-0 right-0 flex justify-around px-4">
                    <div className="flex flex-col items-center">
                      <div className="w-2.5 h-5 bg-[#D4AF37] rounded-full border border-amber-300 shadow transform rotate-12" />
                      <span className="text-[7px] text-white/50 font-sans mt-0.5">🗝️</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-2.5 h-5 bg-[#D4AF37] rounded-full border border-amber-300 shadow transform rotate-12" />
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-2.5 h-5 bg-[#D4AF37] rounded-full border border-amber-300 shadow transform rotate-12" />
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-2.5 h-5 bg-[#D4AF37] rounded-full border border-amber-300 shadow transform rotate-12" />
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-2.5 h-5 bg-[#D4AF37] rounded-full border border-amber-300 shadow transform rotate-12" />
                      <span className="text-[7px] text-white/50 font-sans mt-0.5">🗝️</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Customizer helper description */}
            <div className="mt-4 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-wood-primary/10 text-xs text-wood-charcoal/70 flex items-center space-x-3">
              <span className="text-xl">💡</span>
              <p className="font-sans leading-relaxed">
                <strong>Interior Tip:</strong> Frame your custom family wood sign with a matching warm white or charcoal gray background to create a breathtaking contrast in your house hallway lobby.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
