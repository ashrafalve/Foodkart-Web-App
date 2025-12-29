import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { db } from '../firebase/config.ts';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useAuth } from './AuthContext';

interface CartItem {
    id: string | number;
    name: string;
    price: number;
    quantity: number;
    image?: string;
    [key: string]: any;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: any) => void;
    removeFromCart: (id: string | number) => void;
    updateQuantity: (id: string | number, amount: number) => void;
    clearCart: () => Promise<void>;
    cartTotal: number;
    cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const { user } = useAuth();

    // Load cart from Firebase when user logs in
    useEffect(() => {
        const loadCart = async () => {
            if (user) {
                const cartDoc = await getDoc(doc(db, 'carts', user.uid));
                if (cartDoc.exists()) {
                    setCartItems(cartDoc.data().items || []);
                } else {
                    setCartItems([]);
                    await setDoc(doc(db, 'carts', user.uid), { items: [] });
                }
            } else {
                // Fallback to localStorage for guest users
                const savedCart = localStorage.getItem('guest_cart');
                if (savedCart) {
                    setCartItems(JSON.parse(savedCart));
                } else {
                    setCartItems([]);
                }
            }
        };
        loadCart();
    }, [user]);

    // Sync cart to Firebase or localStorage whenever it changes
    useEffect(() => {
        const syncCart = async () => {
            if (user) {
                await setDoc(doc(db, 'carts', user.uid), { items: cartItems });
            } else {
                localStorage.setItem('guest_cart', JSON.stringify(cartItems));
            }
        };
        syncCart();
    }, [cartItems, user]);

    const addToCart = (product: any) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevItems, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (id: string | number) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    const updateQuantity = (id: string | number, amount: number) => {
        setCartItems(prevItems => {
            return prevItems.map(item => {
                if (item.id === id) {
                    const newQuantity = item.quantity + amount;
                    return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
                }
                return item;
            });
        });
    };

    const clearCart = async () => {
        setCartItems([]);
        if (user) {
            await setDoc(doc(db, 'carts', user.uid), { items: [] });
        } else {
            localStorage.removeItem('guest_cart');
        }
    };

    const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            cartTotal,
            cartCount
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
