import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import '../styles/Cart.css';

const Cart: React.FC = () => {
    const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
    const navigate = useNavigate();

    React.useEffect(() => {
        document.title = 'Your Cart | FoodKart';
    }, []);

    const tax = cartTotal * 0.05;
    const grandTotal = cartTotal + tax;

    if (cartItems.length === 0) {
        return (
            <div className="container empty-cart-page">
                <div className="empty-content">
                    <div className="icon-circle">
                        <ShoppingBag size={80} color="var(--primary)" />
                    </div>
                    <h1>Your cart is hungry</h1>
                    <p>It looks like you haven't added anything to your cart yet.</p>
                    <Link to="/" className="browse-btn">Browse Restaurants</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container cart-page">
            <div className="cart-header">
                <h1>Your Shopping Cart</h1>
                <Link to="/" className="continue-link"><ArrowLeft size={16} /> Continue Shopping</Link>
            </div>

            <div className="cart-content">
                <div className="cart-items-list">
                    {cartItems.map(item => (
                        <div key={item.id} className="cart-item">
                            <div className="item-img">
                                <img src={item.image} alt={item.name} />
                            </div>
                            <div className="item-info">
                                <h3>{item.name}</h3>
                                <p className="unit-price">${item.price.toFixed(2)}</p>
                            </div>
                            <div className="item-qty">
                                <button onClick={() => updateQuantity(item.id, -1)} className="qty-btn"><Minus size={16} /></button>
                                <span>{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, 1)} className="qty-btn"><Plus size={16} /></button>
                            </div>
                            <div className="item-total">
                                <p>${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="remove-btn"
                                title="Remove item"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="cart-checkout-section">
                    <div className="bill-details">
                        <h3>Bill Details</h3>
                        <div className="bill-row">
                            <span>Item Total</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="bill-row">
                            <span>Tax (5%)</span>
                            <span>${tax.toFixed(2)}</span>
                        </div>
                        <div className="bill-row">
                            <span>Delivery Fee</span>
                            <span className="free">FREE</span>
                        </div>
                        <div className="bill-row total">
                            <span>To Pay</span>
                            <span>${grandTotal.toFixed(2)}</span>
                        </div>
                    </div>
                    <button
                        className="proceed-btn"
                        onClick={() => navigate('/payment')}
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
