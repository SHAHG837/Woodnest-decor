import { Product } from "./data/products";

export interface CustomConfig {
  name: string;
  color: string;
  size: string;
  font: string;
  design: string;
}

export interface CartItem {
  id: string; // unique cart item id (combines product id and hash of options)
  product: Product;
  quantity: number;
  customConfig?: CustomConfig;
}

export interface Order {
  id: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  items: CartItem[];
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  paymentMethod: 'COD' | 'Stripe' | 'PayPal';
  shippingAddress: {
    fullName: string;
    phone: string;
    addressLine: string;
    city: string;
    postalCode: string;
  };
  trackingNumber?: string;
  createdAt: string;
}

export interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  productName: string;
  date: string;
}
