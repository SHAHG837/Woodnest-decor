import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Package, Calendar, Tag, ShieldAlert, CheckCircle, Truck, ClipboardList, Loader2 } from "lucide-react";
import { Order } from "../types";

export default function Dashboard() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        fetchUserOrders(user.uid);
      } else {
        setOrders([]);
        setIsLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const fetchUserOrders = async (userId: string) => {
    setIsLoading(true);
    try {
      const ordersRef = collection(db, "orders");
      const q = query(
        ordersRef,
        where("userId", "==", userId)
      );
      
      const querySnapshot = await getDocs(q);
      const fetchedOrders: Order[] = [];
      querySnapshot.forEach((doc) => {
        fetchedOrders.push({ id: doc.id, ...doc.data() } as Order);
      });

      // Sort by date manually (or via query if indexed)
      fetchedOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setOrders(fetchedOrders);
    } catch (err) {
      console.error("Error loading user orders:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending':
        return <ClipboardList className="w-5 h-5 text-amber-500" />;
      case 'Processing':
        return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />;
      case 'Shipped':
        return <Truck className="w-5 h-5 text-purple-500" />;
      case 'Delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <Package className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-100 text-amber-800';
      case 'Processing':
        return 'bg-blue-100 text-blue-800';
      case 'Shipped':
        return 'bg-purple-100 text-purple-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!currentUser) {
    return (
      <div className="py-24 px-4 bg-wood-cream text-center max-w-xl mx-auto space-y-6">
        <div className="w-16 h-16 rounded-full bg-wood-primary/10 flex items-center justify-center mx-auto text-wood-primary">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-wood-dark">Dashboard Account Access</h2>
        <p className="font-sans text-xs text-wood-charcoal/75 leading-relaxed">
          Please log in or register your account using the <strong>Sign In</strong> button in the navigation header to track your personalized wooden designs and view order receipt details.
        </p>
      </div>
    );
  }

  return (
    <div className="py-16 px-4 max-w-5xl mx-auto space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-wood-dark to-[#7c4d24] rounded-3xl p-6 sm:p-8 text-wood-cream flex flex-col sm:flex-row items-center justify-between shadow-lg border border-wood-gold/20">
        <div className="space-y-1.5 text-center sm:text-left">
          <span className="text-[10px] uppercase font-display font-bold text-wood-gold tracking-widest">
            Welcome back to WoodNest
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold">
            {currentUser.email.split('@')[0]}'s Workbench
          </h2>
          <p className="font-sans text-xs text-gray-300 font-light">
            User ID: {currentUser.uid.substring(0, 10)}... • Verified Customer Account
          </p>
        </div>
        <button
          onClick={() => fetchUserOrders(currentUser.uid)}
          className="mt-4 sm:mt-0 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-xs font-display font-bold tracking-wide transition-all cursor-pointer"
        >
          Refresh Orders list
        </button>
      </div>

      {/* Main Order logs */}
      <div className="space-y-6">
        <div>
          <h3 className="font-serif text-xl font-bold text-wood-dark">Your Order History</h3>
          <p className="font-sans text-xs text-wood-charcoal/60">Bespoke carvings under tracking and delivery</p>
        </div>

        {isLoading ? (
          <div className="py-16 text-center space-y-2">
            <Loader2 className="w-8 h-8 animate-spin text-wood-primary mx-auto" />
            <p className="font-sans text-xs text-wood-charcoal/60">Reading database records...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="p-12 text-center bg-white/50 border border-wood-primary/10 rounded-2xl">
            <Package className="w-12 h-12 text-wood-primary/30 mx-auto mb-3" />
            <p className="font-serif text-base text-wood-dark font-semibold">No orders logged yet</p>
            <p className="font-sans text-xs text-wood-charcoal/60 mt-1 max-w-sm mx-auto leading-relaxed">
              Once you configure a custom plaque or purchase standard home decors, your logs and receipt invoices will sync here in real-time.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white/95 border border-wood-primary/15 rounded-3xl p-6 shadow-sm space-y-4">
                
                {/* Order Top Bar Info */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-wood-primary/10">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 bg-wood-primary/10 rounded-xl text-wood-primary">
                      <Package className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-[10px] font-display text-wood-charcoal/50 uppercase">Order Identifier</span>
                      <span className="font-mono text-xs font-bold text-wood-dark">#{order.id.substring(0, 12).toUpperCase()}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-wood-cream text-wood-dark border border-wood-primary/10">
                      <Calendar className="w-3.5 h-3.5 text-wood-primary" />
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>

                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Items Purchased in this order */}
                <div className="space-y-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex gap-4 p-3 bg-wood-cream/20 rounded-xl border border-wood-primary/5">
                      <div className="w-14 h-14 bg-white rounded-lg overflow-hidden border border-wood-primary/10">
                        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-serif text-sm font-bold text-wood-dark">{item.product.name}</h4>
                        <p className="font-sans text-[10px] text-wood-charcoal/60 mt-0.5">
                          Category: {item.product.category} • Quantity: {item.quantity}
                        </p>

                        {/* If customized */}
                        {item.customConfig && (
                          <div className="mt-2 p-2 bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-lg text-[9px] font-display flex flex-wrap gap-x-4 text-wood-dark">
                            <span>✍ Engraved: "<strong>{item.customConfig.name}</strong>"</span>
                            <span>🎨 Finish: {item.customConfig.color}</span>
                            <span>📐 Size: {item.customConfig.size}</span>
                            <span>✒ Font: {item.customConfig.font}</span>
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <span className="font-serif text-sm font-bold text-wood-primary">${item.product.price}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Bottom checkout summaries */}
                <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center pt-4 border-t border-wood-primary/10 gap-4">
                  <div className="text-xs font-sans text-wood-charcoal/70 space-y-1">
                    <p><strong>Deliver to:</strong> {order.shippingAddress.fullName} ({order.shippingAddress.phone})</p>
                    <p><strong>Address:</strong> {order.shippingAddress.addressLine}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                    <p><strong>Payment Mode:</strong> {order.paymentMethod} • Cash on Delivery</p>
                  </div>

                  <div className="text-right">
                    <span className="block text-[10px] font-display text-wood-charcoal/50 uppercase">Total Bill Amount</span>
                    <span className="font-serif text-xl font-bold text-wood-primary">${order.total}</span>
                    {order.trackingNumber && (
                      <span className="block text-[10px] font-mono text-gray-500 mt-1 bg-gray-100 px-2 py-1 rounded">
                        Tracking: {order.trackingNumber}
                      </span>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
