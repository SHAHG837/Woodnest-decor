import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare, Check, Loader2 } from "lucide-react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsSuccess(false);

    try {
      // Save contact submission directly to Firebase Firestore
      await addDoc(collection(db, "contact_submissions"), {
        fullName: name,
        email: email,
        phone: phone,
        message: message,
        createdAt: new Date().toISOString()
      });

      setIsSuccess(true);
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (err) {
      console.error("Error saving contact submission to Firestore:", err);
      alert("Submission failed. Please check your internet connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-section" className="py-24 px-4 bg-wood-cream wood-grain-overlay">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="font-display text-xs font-bold text-wood-primary uppercase tracking-widest block">
            Get in Touch
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-wood-dark tracking-tight">
            Contact WoodNest Guild
          </h2>
          <div className="h-1 w-20 bg-wood-gold mx-auto rounded-full" />
          <p className="font-sans text-xs sm:text-sm text-wood-charcoal/70 leading-relaxed font-light">
            Have a question about raw MDF durability, custom vectors, or wholesale orders? Drop our master carpenters a ticket.
          </p>
        </div>

        {/* Info & Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Info Side (Left 5-cols) */}
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-wood-dark">
                Studio Showrooms
              </h3>
              <p className="font-sans text-xs sm:text-sm text-wood-charcoal/80 leading-relaxed font-light">
                Our main manufacturing mill is situated in Yorkshire, UK, with collaborative partner sanding networks spanning globally. Drop by to feel our dual-layered gloss lacquer finishes in person!
              </p>

              {/* Contact Icons */}
              <div className="space-y-4">
                
                {/* Location */}
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-wood-primary/10 rounded-xl text-wood-primary">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-semibold text-wood-dark">Yorkshire Guild Mill</h4>
                    <p className="font-sans text-xs text-wood-charcoal/70 mt-0.5 leading-relaxed">
                      WoodNest Guild, 12 Craftsman Lane, York, YO1 9NX, United Kingdom
                    </p>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-wood-primary/10 rounded-xl text-wood-primary">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-semibold text-wood-dark">Direct Lines</h4>
                    <p className="font-sans text-xs text-wood-charcoal/70 mt-0.5 leading-relaxed">
                      UK Main office: +44 20 7946 0192 <br />
                      Studio Hotline: +92 300 1234567
                    </p>
                  </div>
                </div>

                {/* Email Address */}
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-wood-primary/10 rounded-xl text-wood-primary">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-semibold text-wood-dark">Electronic Mail</h4>
                    <p className="font-sans text-xs text-wood-charcoal/70 mt-0.5 leading-relaxed">
                      Support: info@woodnestdecor.com <br />
                      Bespoke Orders: custom@woodnestdecor.com
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Quick WhatsApp action card */}
            <div className="p-5 rounded-2xl bg-gradient-to-tr from-wood-dark to-wood-primary text-white space-y-3.5 border border-wood-gold/20 shadow-md">
              <div className="flex items-center space-x-2.5">
                <MessageSquare className="w-5 h-5 text-wood-gold" />
                <h4 className="font-serif text-sm font-bold text-white">Live Carpentry Hotline</h4>
              </div>
              <p className="font-sans text-[11px] text-gray-200">
                Want immediate price quotes or font approvals? Chat with our lead designer live on WhatsApp.
              </p>
              <a
                href="https://wa.me/923000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-1.5 px-4 py-2 rounded-xl bg-wood-gold text-wood-dark text-[10px] font-display font-extrabold uppercase tracking-wider hover:bg-yellow-400 transition-colors"
              >
                Launch WhatsApp Chat
              </a>
            </div>
          </div>

          {/* Form Side (Right 7-cols) */}
          <div className="lg:col-span-7 bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-wood-primary/10 shadow-lg space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-wood-dark">Send Inquiry</h3>
              <p className="font-sans text-xs text-wood-charcoal/60">We reply to all tickets within 12 business hours</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-[10px] font-display font-semibold text-wood-charcoal mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="E.g., Alexander Wood"
                    className="w-full px-4 py-2.5 rounded-xl border border-wood-primary/15 bg-white text-xs font-sans text-wood-charcoal focus:outline-none focus:ring-1 focus:ring-wood-primary"
                  />
                </div>

                {/* Email address */}
                <div>
                  <label className="block text-[10px] font-display font-semibold text-wood-charcoal mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-wood-primary/15 bg-white text-xs font-sans text-wood-charcoal focus:outline-none focus:ring-1 focus:ring-wood-primary"
                  />
                </div>
              </div>

              {/* Phone number */}
              <div>
                <label className="block text-[10px] font-display font-semibold text-wood-charcoal mb-1">Phone Number (with Country Code)</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="E.g., +44 7946 0192"
                  className="w-full px-4 py-2.5 rounded-xl border border-wood-primary/15 bg-white text-xs font-sans text-wood-charcoal focus:outline-none focus:ring-1 focus:ring-wood-primary"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-[10px] font-display font-semibold text-wood-charcoal mb-1">Message Detail</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your wall styling requirements or custom ideas..."
                  className="w-full px-4 py-2.5 rounded-xl border border-wood-primary/15 bg-white text-xs font-sans text-wood-charcoal focus:outline-none focus:ring-1 focus:ring-wood-primary resize-none"
                />
              </div>

              {isSuccess && (
                <div className="p-3 bg-green-50 text-green-700 text-xs rounded-xl flex items-center justify-center space-x-2 border border-green-200">
                  <Check className="w-4.5 h-4.5" />
                  <span>Your message was logged successfully in Firestore! Woody will reply via email shortly.</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-wood-primary hover:bg-wood-dark text-white font-display text-xs font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Inquiry</span>
                  </>
                )}
              </button>
            </form>

            {/* Custom styled map container mockup */}
            <div className="mt-6 pt-4 border-t border-wood-primary/10">
              <span className="block text-[10px] font-display text-wood-charcoal/50 uppercase mb-2">Showroom Geography (UK)</span>
              <div className="h-40 rounded-2xl bg-neutral-200 border border-wood-primary/15 relative overflow-hidden flex items-center justify-center">
                {/* Graphic mockup of map */}
                <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center text-center p-4">
                  <div className="space-y-1 text-[#F8F4EC]">
                    <p className="font-serif text-sm font-bold tracking-tight">🗺️ YORKSHIRE WORKSHOP MAP</p>
                    <p className="font-sans text-[10px] text-gray-400">12 Craftsman Lane, York, YO1 9NX • 10:00 - 18:00 BST</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
