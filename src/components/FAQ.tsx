import { useState } from "react";
import { HelpCircle, Search, ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      q: "How can I contact customer support or place an order query?",
      a: "You can reach our dedicated customer care team directly via Email at syedmuhammadamir837@gmail.com or via Mobile & WhatsApp at +92 326 2259614. We respond promptly to order trackings, customization requests, and product queries!"
    },
    {
      q: "What is premium MDF and why do you use it?",
      a: "Medium-Density Fiberboard (MDF) is an engineered wood product made by breaking down hardwood or softwood residuals into wood fibers. We source premium, water-resistant, ultra-high-density boards which do not warp, shrink, or crack over time unlike standard low-grade wood. It allows our precision laser cutters to create ultra-detailed, clean script engravings."
    },
    {
      q: "Can I request custom sizes, shapes, or corporate logos?",
      a: "Yes! While our online interactive customizer offers three standard dimensions, you can easily communicate with our design team via WhatsApp or our Contact Form for bespoke corporate emblems, larger sizes up to 120cm, or custom vectors."
    },
    {
      q: "How are the key hanging stand hooks mounted?",
      a: "We pre-install solid brass metal hooks into the wood board with structural heavy-duty threads. For wall hanging, each plaque comes pre-fit with heavy-duty metal keyhole hanger brackets on the reverse side. Wall screws and dry-wall rawl plugs are included with every order!"
    },
    {
      q: "How long does custom laser carving and delivery take?",
      a: "Because each custom plaque is hand-sanded and double-polished in multiple coats of satin rosewood or walnut lacquer, manufacturing takes 2-3 business days. Delivery takes an additional 2-3 business days depending on your location. Standard orders ship faster!"
    },
    {
      q: "How do I clean and maintain my WoodNest decor?",
      a: "Simply wipe it down with a dry, soft microfiber cloth once a week. Avoid harsh liquid chemical sprays or damp sponges, as they can wear out the glossy satin protective lacquer seal over several years."
    }
  ];

  const filteredFaqs = faqs.filter(
    (item) =>
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="faq-section" className="py-24 px-4 bg-[#F8F4EC] wood-grain-overlay">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="font-display text-xs font-bold text-wood-primary uppercase tracking-widest block">
            Answering Your Queries
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-wood-dark tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="h-1 w-16 bg-wood-gold mx-auto rounded-full" />
        </div>

        {/* Search FAQ */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-wood-charcoal/40 w-4 h-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Type keyword e.g., 'MDF', 'Custom', 'Hooks'..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-wood-primary/15 bg-white focus:outline-none focus:ring-2 focus:ring-wood-primary/30 text-xs font-sans text-wood-charcoal"
          />
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl border border-wood-primary/10 overflow-hidden shadow-sm transition-shadow hover:shadow-md"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center gap-4 focus:outline-none cursor-pointer"
                >
                  <div className="flex items-center space-x-3 text-wood-dark">
                    <HelpCircle className="w-5 h-5 text-wood-gold flex-shrink-0" />
                    <span className="font-serif text-sm sm:text-base font-bold">
                      {faq.q}
                    </span>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-wood-primary" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-wood-primary" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-xs sm:text-sm text-wood-charcoal/75 leading-relaxed font-sans font-light border-t border-wood-primary/5 pt-4 animate-in fade-in duration-300">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <p className="text-center text-xs text-wood-charcoal/50 font-sans py-8">
              No matching questions found. Ask Woody AI Assistant in the bottom right!
            </p>
          )}
        </div>

      </div>
    </section>
  );
}
