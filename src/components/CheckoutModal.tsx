import React, { useState } from "react";
import { X, Check, ShoppingBag, CreditCard, Gift, Loader2 } from "lucide-react";
import { CartItem, Order } from "../types";
import { db, auth } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

interface CheckoutModalProps {
  cart: CartItem[];
  cartTotal: number;
  onClose: () => void;
  onClearCart: () => void;
  onOrderPlaced: (orderId: string) => void;
}

export default function CheckoutModal({
  cart,
  cartTotal,
  onClose,
  onClearCart,
  onOrderPlaced
}: CheckoutModalProps) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [coupon, setCoupon] = useState("");
  const [activeDiscount, setActiveDiscount] = useState(0); // decimal
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'Stripe' | 'PayPal'>('COD');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [successOrder, setSuccessOrder] = useState<Order | null>(null);

  const applyCoupon = () => {
    setCouponError("");
    setCouponSuccess("");
    const code = coupon.trim().toUpperCase();
    if (code === "WOODNEST15") {
      setActiveDiscount(0.15);
      setCouponSuccess("WOODNEST15 applied successfully! 15% discount credited.");
    } else {
      setCouponError("Invalid coupon code. Try 'WOODNEST15'!");
    }
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPlacingOrder(true);

    const discountAmount = Math.round((cartTotal * activeDiscount) * 100) / 100;
    const finalBill = Math.round((cartTotal - discountAmount) * 100) / 100;
    const randomTrackNo = "WN-" + Math.floor(10000000 + Math.random() * 90000000);

    const currentUser = auth.currentUser;
    const orderData: Omit<Order, 'id'> = {
      userId: currentUser ? currentUser.uid : "guest-session",
      customerName: fullName,
      customerEmail: currentUser?.email || "guest@woodnestdecor.com",
      items: cart,
      total: finalBill,
      status: 'Pending',
      paymentMethod,
      shippingAddress: {
        fullName,
        phone,
        addressLine: address,
        city,
        postalCode
      },
      trackingNumber: randomTrackNo,
      createdAt: new Date().toISOString()
    };

    try {
      // Save order to Firebase Firestore "orders" collection
      const docRef = await addDoc(collection(db, "orders"), orderData);
      
      const createdOrder: Order = {
        id: docRef.id,
        ...orderData
      };

      setSuccessOrder(createdOrder);
      onClearCart();
    } catch (err) {
      console.error("Error creating Firestore order log:", err);
      alert("Order placement failed. Check internet access or database rules.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (successOrder) {
    return (
      <div id="checkout-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <div className="w-full max-w-md bg-[#F8F4EC] p-8 rounded-3xl relative shadow-2xl border border-wood-primary/10 text-center space-y-6">
          <div className="w-16 h-16 bg-green-100 border border-green-300 rounded-full flex items-center justify-center mx-auto text-green-600">
            <Check className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="font-serif text-2xl font-bold text-wood-dark">Order Placed Successfully!</h2>
            <p className="font-sans text-xs text-wood-charcoal/70 leading-relaxed">
              Your customized carpentry request has been synced with our workshop logs. Your master laser cutters are firing up!
            </p>
          </div>

          {/* Receipt details */}
          <div className="p-4 bg-white rounded-2xl border border-wood-primary/10 text-left text-xs space-y-2 font-sans">
            <p className="text-wood-dark"><strong>Invoice Reference:</strong> <span className="font-mono font-bold">{successOrder.id.substring(0, 15).toUpperCase()}</span></p>
            <p className="text-wood-dark"><strong>Delivery Address:</strong> {successOrder.shippingAddress.addressLine}, {successOrder.shippingAddress.city}</p>
            <p className="text-wood-dark"><strong>Total Amount:</strong> <span className="font-serif font-bold text-wood-primary">Rs. {successOrder.total.toLocaleString()}</span></p>
            <p className="text-wood-dark"><strong>Tracking Number:</strong> <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-gray-700">{successOrder.trackingNumber}</span></p>
            <p className="text-[10px] text-wood-primary font-display uppercase tracking-wider text-center mt-3 pt-3 border-t border-dashed border-wood-primary/10">
              ✦ Use this tracking ID inside your Dashboard ✦
            </p>
          </div>

          <button
            onClick={() => {
              onOrderPlaced(successOrder.id);
              onClose();
            }}
            className="w-full py-3.5 rounded-xl bg-wood-primary hover:bg-wood-dark text-white font-display text-xs font-bold uppercase tracking-wider transition-colors shadow-md cursor-pointer"
          >
            Go to My Dashboard
          </button>
        </div>
      </div>
    );
  }

  const discountAmount = Math.round((cartTotal * activeDiscount) * 100) / 100;
  const finalBill = Math.round((cartTotal - discountAmount) * 100) / 100;

  return (
    <div id="checkout-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="w-full max-w-2xl bg-wood-cream p-6 sm:p-8 rounded-3xl relative shadow-2xl border border-wood-primary/15 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-wood-primary/10 text-wood-charcoal/60 transition-colors"
        >
          ✕
        </button>

        <div className="flex items-center space-x-2.5 pb-4 border-b border-wood-primary/10 mb-6">
          <ShoppingBag className="w-5 h-5 text-wood-primary" />
          <h3 className="font-serif text-lg font-bold text-wood-dark">WoodNest Secure Checkout</h3>
        </div>

        <form onSubmit={handleCheckoutSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Shipping Address Forms (Left) */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-bold text-wood-dark">Shipping Coordinates</h4>
            
            {/* Full Name */}
            <div>
              <label className="block text-[10px] font-display font-semibold text-wood-charcoal mb-1">Full Name</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="E.g., Syed Muhammad Amir"
                className="w-full px-3 py-2.5 rounded-xl border border-wood-primary/20 bg-white text-xs font-sans text-wood-charcoal focus:outline-none"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-[10px] font-display font-semibold text-wood-charcoal mb-1">Phone Number</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+44 7946 0192"
                className="w-full px-3 py-2.5 rounded-xl border border-wood-primary/20 bg-white text-xs font-sans text-wood-charcoal focus:outline-none"
              />
            </div>

            {/* Address Line */}
            <div>
              <label className="block text-[10px] font-display font-semibold text-wood-charcoal mb-1">Street Address Line</label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Showroom 12, Craftsman Lane"
                className="w-full px-3 py-2.5 rounded-xl border border-wood-primary/20 bg-white text-xs font-sans text-wood-charcoal focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* City */}
              <div>
                <label className="block text-[10px] font-display font-semibold text-wood-charcoal mb-1">City</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="York"
                  className="w-full px-3 py-2.5 rounded-xl border border-wood-primary/20 bg-white text-xs font-sans text-wood-charcoal focus:outline-none"
                />
              </div>

              {/* Postal Code */}
              <div>
                <label className="block text-[10px] font-display font-semibold text-wood-charcoal mb-1">Postal Code</label>
                <input
                  type="text"
                  required
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="YO1 9NX"
                  className="w-full px-3 py-2.5 rounded-xl border border-wood-primary/20 bg-white text-xs font-sans text-wood-charcoal focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Checkout Totals & Payments (Right) */}
          <div className="space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h4 className="font-serif text-sm font-bold text-wood-dark">Billing summary</h4>

              {/* Coupon input */}
              <div className="space-y-1.5 p-3.5 bg-white/50 rounded-2xl border border-wood-primary/10">
                <label className="block text-[10px] font-display font-semibold text-wood-charcoal mb-1 flex items-center gap-1">
                  <Gift className="w-3.5 h-3.5 text-wood-gold" /> Apply Promotional Coupon
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Try 'WOODNEST15'"
                    className="flex-grow px-3 py-1.5 rounded-xl border border-wood-primary/15 bg-white text-xs font-sans text-wood-charcoal focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={applyCoupon}
                    className="px-4 py-1.5 rounded-xl bg-wood-dark hover:bg-wood-primary text-white text-[10px] font-display font-bold uppercase cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {couponError && <p className="text-[10px] text-red-600 font-sans mt-1">{couponError}</p>}
                {couponSuccess && <p className="text-[10px] text-green-600 font-sans mt-1">{couponSuccess}</p>}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 text-xs font-sans text-wood-charcoal/80">
                <div className="flex justify-between">
                  <span>Cart Items Subtotal:</span>
                  <span>Rs. {cartTotal.toLocaleString()}</span>
                </div>
                {activeDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount (15%):</span>
                    <span>-Rs. {discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Standard Box Packaging & Shipping:</span>
                  <span className="text-green-600 font-medium">FREE</span>
                </div>
                <div className="h-px bg-wood-primary/10 my-2" />
                <div className="flex justify-between text-sm text-wood-dark font-bold">
                  <span>Total Amount Due:</span>
                  <span className="font-serif text-base text-wood-primary">Rs. {finalBill.toLocaleString()}</span>
                </div>
              </div>

              {/* Payment methods */}
              <div className="space-y-2">
                <label className="block text-[10px] font-display font-semibold text-wood-charcoal mb-1">
                  Select Gateway Mode
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('COD')}
                    className={`p-3 rounded-xl border text-[10px] font-display font-bold text-center transition-all cursor-pointer ${
                      paymentMethod === 'COD'
                        ? "bg-wood-primary text-white border-wood-primary"
                        : "bg-white text-wood-charcoal border-wood-primary/15 hover:bg-wood-primary/5"
                    }`}
                  >
                    💵 Cash (COD)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Stripe')}
                    className={`p-3 rounded-xl border text-[10px] font-display font-bold text-center transition-all cursor-pointer ${
                      paymentMethod === 'Stripe'
                        ? "bg-wood-primary text-white border-wood-primary"
                        : "bg-white text-wood-charcoal border-wood-primary/15 hover:bg-wood-primary/5"
                    }`}
                  >
                    💳 Stripe C.C.
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('PayPal')}
                    className={`p-3 rounded-xl border text-[10px] font-display font-bold text-center transition-all cursor-pointer ${
                      paymentMethod === 'PayPal'
                        ? "bg-wood-primary text-white border-wood-primary"
                        : "bg-white text-wood-charcoal border-wood-primary/15 hover:bg-wood-primary/5"
                    }`}
                  >
                    🅿 PayPal
                  </button>
                </div>
                <p className="text-[9px] text-wood-primary font-sans leading-relaxed mt-1 block">
                  {paymentMethod === 'COD'
                    ? "✓ No card required. Pay on delivery."
                    : "✓ Complete secure payment simulation (no actual charges applied)."}
                </p>
              </div>
            </div>

            {/* Place order button */}
            <button
              type="submit"
              disabled={isPlacingOrder}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-wood-primary to-wood-dark hover:from-wood-gold hover:to-wood-primary text-white font-display text-xs font-extrabold uppercase tracking-widest shadow-md transition-all cursor-pointer flex items-center justify-center space-x-2"
            >
              {isPlacingOrder ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <CreditCard className="w-4 h-4" />
                  <span>Finalise & Place Order</span>
                </>
              )}
            </button>

            <p className="text-[10px] text-wood-charcoal/60 text-center font-sans">
              Need assistance with your order? Contact us at <a href="mailto:syedmuhammadamir837@gmail.com" className="text-wood-primary font-semibold hover:underline">syedmuhammadamir837@gmail.com</a> or WhatsApp <a href="https://wa.me/923262259614" target="_blank" rel="noopener noreferrer" className="text-wood-primary font-semibold hover:underline">+92 326 2259614</a>
            </p>
          </div>

        </form>
      </div>
    </div>
  );
}
