import { useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, UserCheck } from "lucide-react";
import { Review } from "../types";

export default function Reviews() {
  const [activeIndex, setActiveIndex] = useState(0);

  const reviews: Review[] = [
    {
      id: "rev-1",
      customerName: "Syed Muhammad Amir",
      rating: 5,
      comment: "Absolutely breathless. I ordered the customized rosewood gold-plated calligraphy and it has completely changed the vibe of my home's entrance hallway. Masterclass engineering!",
      productName: "Ayat al-Kursi Royal Calligraphy",
      date: "2026-06-18"
    },
    {
      id: "rev-2",
      customerName: "Emily Robinson",
      rating: 5,
      comment: "The tree of life key organizer is beautifully sanded down and has a lovely matte dark walnut smell. Customer service was highly cooperative during delivery. 10/10!",
      productName: "Classic Oak Tree Key Organiser",
      date: "2026-07-02"
    },
    {
      id: "rev-3",
      customerName: "Imran Farooq",
      rating: 5,
      comment: "Remarkable precision on the mandala star triptych. Perfect, symmetric alignment on all eight layered sheets. A premium wood-art center-piece indeed.",
      productName: "Mandala Harmony Geometric Star",
      date: "2026-07-10"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % reviews.length);
  };

  const activeReview = reviews[activeIndex];

  return (
    <section id="reviews-section" className="py-24 px-4 bg-wood-dark text-wood-cream relative overflow-hidden">
      {/* Wooden rings backdrop */}
      <div className="absolute top-[-50px] left-[-50px] w-48 h-48 rounded-full border border-wood-gold/10 pointer-events-none" />
      <div className="absolute bottom-[-80px] right-[-50px] w-72 h-72 rounded-full border border-wood-primary/15 pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center space-y-12 relative z-10">
        
        {/* Header */}
        <div className="space-y-3">
          <span className="font-display text-xs font-bold text-wood-gold uppercase tracking-widest block">
            Verified Customer Praise
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
            Loved by Luxury Home Enthusiasts
          </h2>
          <div className="h-1 w-16 bg-wood-gold mx-auto rounded-full" />
        </div>

        {/* Carousel Testimonial Panel */}
        <div className="relative min-h-[250px] flex items-center justify-center px-8">
          
          <div className="space-y-6 max-w-2xl mx-auto animate-in fade-in zoom-in-95 duration-500">
            {/* Quote Icon */}
            <div className="flex justify-center text-wood-gold/25">
              <Quote className="w-16 h-16 fill-current" />
            </div>

            {/* Stars */}
            <div className="flex justify-center space-x-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 text-wood-gold fill-current" />
              ))}
            </div>

            {/* Quote content */}
            <p className="font-serif text-lg sm:text-xl italic font-light leading-relaxed text-gray-100">
              "{activeReview.comment}"
            </p>

            {/* Author */}
            <div className="space-y-1 pt-2">
              <div className="flex items-center justify-center space-x-1.5">
                <span className="font-serif text-base font-bold text-wood-gold">
                  {activeReview.customerName}
                </span>
                <span className="inline-flex items-center gap-0.5 bg-wood-primary/30 text-wood-gold text-[9px] font-display font-semibold uppercase px-2 py-0.5 rounded-full">
                  <UserCheck className="w-2.5 h-2.5" /> Verified Buyer
                </span>
              </div>
              <p className="font-sans text-[10px] text-gray-400">
                Purchased: {activeReview.productName} • {activeReview.date}
              </p>
            </div>
          </div>

          {/* Left Navigation Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-0 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-wood-cream border border-white/10 hover:border-wood-gold/40 cursor-pointer transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Navigation Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-0 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-wood-cream border border-white/10 hover:border-wood-gold/40 cursor-pointer transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Slide Indicator Dots */}
        <div className="flex justify-center space-x-2 pt-4">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                activeIndex === idx ? "bg-wood-gold w-6" : "bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
