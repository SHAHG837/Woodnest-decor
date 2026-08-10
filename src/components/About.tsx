import { motion } from "motion/react";
import { Hammer, Award, TrendingUp, ShieldCheck, HelpCircle } from "lucide-react";

export default function About() {
  const milestones = [
    {
      year: "2021",
      title: "The Solitary Laser Cutter",
      desc: "Founded in a small, cozy timber garage in Yorkshire with just a single high-precision laser cutting machine and a passion for premium MDF art.",
      icon: Hammer
    },
    {
      year: "2023",
      title: "Layered 3D masterworks",
      desc: "Revolutionised the home décor space by introducing multi-layered laser designs, combining rosewood finishes, mirrored gold acrylics, and brass details.",
      icon: Award
    },
    {
      year: "2025",
      title: "AI Design & Live Previews",
      desc: "Laid out our virtual doors with interactive 3D configurators allowing customers to dynamically generate custom plates with instant font updates.",
      icon: TrendingUp
    }
  ];

  const virtues = [
    {
      title: "Premium Medium-Density Fiberboard (MDF)",
      desc: "We exclusively source premium 12mm-18mm high-density, water-resistant MDF boards that provide absolute structural density, zero warping, and flawless edge cuts.",
      icon: ShieldCheck
    },
    {
      title: "Handcrafted Double-Lacquered Polish",
      desc: "Every plaque goes through meticulous double-sanding and is hand-painted in multiple satin coats (walnut, mahogany, or wenge black) for a lifetime shine.",
      icon: Hammer
    }
  ];

  return (
    <section id="about-section" className="py-24 px-4 bg-wood-cream wood-grain-overlay">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-wood-dark tracking-tight">
            Our Legacy of Craftsmanship
          </h2>
          <div className="h-1 w-20 bg-wood-gold mx-auto rounded-full" />
          <p className="font-sans text-sm sm:text-base text-wood-charcoal/70 leading-relaxed font-light">
            WoodNest Decor creates elegant MDF home décor that combines absolute beauty, extreme durability, and everyday functionality. Every product is thoughtfully designed to enhance your home with timeless style and premium craftsmanship.
          </p>
        </div>

        {/* Visual Showcase Card & Materials */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Materials Showcase */}
          <div className="space-y-6">
            <h3 className="font-serif text-2xl font-bold text-wood-dark">
              Why MDF is the Superior Canvas
            </h3>
            <p className="font-sans text-sm text-wood-charcoal/80 leading-relaxed font-light">
              Unlike raw timber, premium high-density MDF does not check, expand, or warp under different humidity levels. It gives our master laser guides a perfectly uniform canvas to cut beautiful complex scriptures, trees, and custom family names.
            </p>

            <div className="space-y-4 pt-2">
              {virtues.map((v, index) => (
                <div key={index} className="flex gap-4 p-5 bg-white/60 backdrop-blur-sm rounded-2xl border border-wood-primary/10 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-wood-primary/10 flex items-center justify-center text-wood-primary">
                    <v.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-semibold text-wood-dark">{v.title}</h4>
                    <p className="font-sans text-xs text-wood-charcoal/70 mt-1 leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Wood Texture Plaque Graphic */}
          <div className="relative p-6 rounded-3xl bg-gradient-to-tr from-wood-dark to-wood-primary text-wood-cream shadow-xl flex flex-col justify-between min-h-[350px] overflow-hidden border border-wood-gold/30">
            {/* Absolute radial shine */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-wood-gold/15 rounded-full blur-3xl" />
            
            <div className="space-y-4 relative z-10">
              <span className="font-display text-[10px] bg-wood-gold/25 border border-wood-gold/40 text-wood-gold px-3 py-1 rounded-full uppercase font-bold tracking-widest inline-block">
                WoodNest Statement of Quality
              </span>
              <p className="font-serif text-xl sm:text-2xl italic font-light leading-relaxed">
                "We don't just cut wood. We shape memories, frame blessings, and build the warm wooden focal points where families hang their keys, welcome their guests, and celebrate their names."
              </p>
            </div>

            <div className="flex items-center space-x-4 border-t border-wood-cream/20 pt-6 mt-8 relative z-10">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-wood-gold/50 shadow-md flex-shrink-0">
                <img 
                  src="/src/assets/images/woodnest_hd_logo_3d_1786383915475.jpg" 
                  alt="WoodNest 3D Logo Emblem" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <p className="font-serif text-sm font-bold text-wood-gold">The WoodNest Carpentry League</p>
                <p className="font-sans text-[10px] text-wood-cream/70 uppercase tracking-widest">Master Artisans</p>
              </div>
            </div>
          </div>

        </div>

        {/* Animated Timeline */}
        <div className="pt-8">
          <div className="text-center mb-12">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-wood-dark">Our Journey Across Time</h3>
            <p className="font-sans text-xs text-wood-charcoal/60">From humble beginnings to your beautiful living rooms</p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Middle vertical line for timeline */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-wood-primary/20 top-0 bottom-0 hidden md:block" />

            <div className="space-y-12 md:space-y-8">
              {milestones.map((m, i) => (
                <div key={i} className={`flex flex-col md:flex-row items-center ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                  {/* Outer spacer / left column */}
                  <div className="w-full md:w-1/2 flex justify-center md:justify-end px-6">
                    <div className={`w-full max-w-sm p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-wood-primary/10 shadow-sm space-y-2 text-center md:text-left ${i % 2 === 0 ? "md:text-left" : "md:text-right"}`}>
                      <span className="font-serif text-2xl font-bold text-wood-primary">{m.year}</span>
                      <h4 className="font-serif text-base font-bold text-wood-dark">{m.title}</h4>
                      <p className="font-sans text-xs text-wood-charcoal/70 leading-relaxed">{m.desc}</p>
                    </div>
                  </div>

                  {/* Circle Node indicator */}
                  <div className="my-4 md:my-0 relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-wood-dark text-wood-cream border-2 border-wood-gold shadow">
                    <m.icon className="w-4 h-4 text-wood-gold" />
                  </div>

                  {/* Spacer for other side */}
                  <div className="hidden md:block w-1/2 px-6" />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
