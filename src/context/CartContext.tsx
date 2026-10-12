import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Garment } from '../types';

interface CartContextType {
  items: CartItem[];
  addToCart: (garment: Garment, size: string, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  totalCount: number;
  subtotal: number;
  discountAmount: number;
  discountCode: string;
  applyDiscountCode: (code: string) => { success: boolean; message: string };
  removeDiscount: () => void;
  shippingFee: number;
  total: number;
  freeShippingThreshold: number;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  notification: string | null;
  dismissNotification: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

const CART_STORAGE_KEY = '0x01_studio_cart_v1';
const FREE_SHIPPING_THRESHOLD = 500;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [discountRate, setDiscountRate] = useState(0); // 0.1 for 10%
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const addToCart = (garment: Garment, size: string, quantity = 1) => {
    const itemId = `${garment.id}-${size}`;
    setItems(prev => {
      const existing = prev.find(i => i.id === itemId);
      if (existing) {
        return prev.map(i =>
          i.id === itemId ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          garmentId: garment.id,
          title: garment.title,
          serialCode: garment.serialCode,
          size,
          price: garment.price,
          image: garment.images[0],
          quantity,
        },
      ];
    });

    setNotification(`ADDED ${garment.serialCode} [SIZE ${size}] TO BAG`);
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  const removeFromCart = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems(prev =>
      prev
        .map(i => {
          if (i.id === id) {
            const nextQty = i.quantity + delta;
            return nextQty > 0 ? { ...i, quantity: nextQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const applyDiscountCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'SYNTAX10') {
      setDiscountCode('SYNTAX10');
      setDiscountRate(0.1);
      return { success: true, message: 'VIP PASS APPLIED: 10% OFF ENTIRE DROP' };
    }
    if (clean === '0X01VIP' || clean === 'ARCHIVE01') {
      setDiscountCode(clean);
      setDiscountRate(0.15);
      return { success: true, message: 'ATELIER PRIVILEGE: 15% OFF ORDER' };
    }
    return { success: false, message: 'INVALID OR EXPIRED SERIAL CODE' };
  };

  const removeDiscount = () => {
    setDiscountCode('');
    setDiscountRate(0);
  };

  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const discountAmount = Math.round(subtotal * discountRate);
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 35;
  const total = Math.max(0, subtotal - discountAmount + shippingFee);

  const dismissNotification = () => setNotification(null);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        totalCount,
        subtotal,
        discountAmount,
        discountCode,
        applyDiscountCode,
        removeDiscount,
        shippingFee,
        total,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        isCheckoutOpen,
        setIsCheckoutOpen,
        notification,
        dismissNotification,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
