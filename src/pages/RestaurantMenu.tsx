import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Star, ShoppingBag, Plus, Minus, Tag, Clock } from 'lucide-react';
import { db } from '../firebase/config.ts';
import { doc, getDoc, collection, getDocs, QueryDocumentSnapshot, type DocumentData } from 'firebase/firestore';
import { useCart } from '../context/CartContext';
import type { Restaurant, MenuItem } from '../types';
import '../styles/RestaurantMenu.css';

const RestaurantMenu: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { addToCart, updateQuantity, cartItems } = useCart();
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const [items, setItems] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (restaurant) {
            document.title = `${restaurant.name} | FoodKart Menu`;
        }
    }, [restaurant]);

    useEffect(() => {
        const fetchMenu = async () => {
            if (!id) return;
            setLoading(true);
            try {
                // Fetch restaurant details
                const resDoc = await getDoc(doc(db, 'restaurants', id));
                if (resDoc.exists()) {
                    setRestaurant({ id: resDoc.id, ...resDoc.data() } as Restaurant);
                }

                // Fetch menu items from subcollection
                const menuSnapshot = await getDocs(collection(db, 'restaurants', id, 'menu'));
                const menuData = menuSnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
                    id: doc.id,
                    ...doc.data()
                })) as MenuItem[];
                setItems(menuData);
            } catch (error) {
                console.error("Error fetching menu:", error);
            }
            setLoading(false);
        };

        fetchMenu();
    }, [id]);

    const getItemQuantity = (itemId: string | number) => {
        const item = cartItems.find(i => i.id === itemId);
        return item ? item.quantity : 0;
    };

    if (loading) return <div className="loading-screen">Preparing the table...</div>;
    if (!restaurant) return <div className="loading">Restaurant not found.</div>;

    return (
        <div className="menu-page animate-in">
            <div className="menu-header">
                <div className="container">
                    <Link to="/" className="back-link">
                        <ChevronLeft size={20} /> Back to Restaurants
                    </Link>
                    <div className="header-content">
                        <div className="header-info">
                            <h1>{restaurant.name}</h1>
                            <div className="meta">
                                <span className="rating"><Star size={16} fill="currentColor" /> {restaurant.rating}</span>
                                <span className="dot">•</span>
                                <span>{restaurant.cuisine}</span>
                                <span className="dot">•</span>
                                <span className="time"><Clock size={16} /> {restaurant.deliveryTime}</span>
                            </div>
                            <p className="description">{restaurant.description}</p>
                            {restaurant.offer && (
                                <div className="header-offer">
                                    <Tag size={16} /> {restaurant.offer}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container menu-content">
                <div className="menu-list">
                    <div className="menu-list-header">
                        <h2>Recommended Items</h2>
                        <p>{items.length} items available</p>
                    </div>
                    <div className="items-grid">
                        {items.map(item => (
                            <div key={item.id} className="menu-item">
                                <div className="item-detail">
                                    <div className="item-text">
                                        <h3>{item.name}</h3>
                                        <p className="price">${item.price.toFixed(2)}</p>
                                        <p className="item-desc">{item.description}</p>
                                    </div>
                                    <div className="item-controls">
                                        {getItemQuantity(item.id) > 0 ? (
                                            <div className="quantity-toggle">
                                                <button onClick={() => updateQuantity(item.id, -1)}><Minus size={16} /></button>
                                                <span>{getItemQuantity(item.id)}</span>
                                                <button onClick={() => updateQuantity(item.id, 1)}><Plus size={16} /></button>
                                            </div>
                                        ) : (
                                            <button onClick={() => addToCart(item)} className="add-btn">
                                                <Plus size={16} /> ADD
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <div className="item-image">
                                    <img src={item.image} alt={item.name} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="menu-sidebar">
                    {cartItems.length > 0 ? (
                        <div className="cart-summary-card">
                            <h3>My Cart</h3>
                            <div className="summary-items">
                                {cartItems.map(item => (
                                    <div key={item.id} className="summary-item">
                                        <div className="sum-item-name">
                                            {item.name} x {item.quantity}
                                        </div>
                                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="summary-total">
                                <span>Subtotal</span>
                                <span>${cartItems.reduce((acc, i) => acc + i.price * i.quantity, 0).toFixed(2)}</span>
                            </div>
                            <Link to="/cart" className="checkout-btn">
                                Checkout <ShoppingBag size={20} />
                            </Link>
                        </div>
                    ) : (
                        <div className="cart-summary-card empty">
                            <div className="empty-cart-icon">
                                <ShoppingBag size={48} />
                            </div>
                            <p>Empty Cart</p>
                            <small>Good food is always cooking! Go ahead, order some.</small>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RestaurantMenu;
