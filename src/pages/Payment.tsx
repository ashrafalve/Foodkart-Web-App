import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase/config.ts';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { CreditCard, DollarSign, ShieldCheck, Loader2 } from 'lucide-react';
import '../styles/Checkout.css';

const Payment: React.FC = () => {
    const { cartTotal, cartItems } = useCart();
    const { user } = useAuth();
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');
    const [processing, setProcessing] = useState(false);
    const navigate = useNavigate();

    React.useEffect(() => {
        document.title = 'Secure Payment | FoodKart';
    }, []);

    const tax = cartTotal * 0.05;
    const grandTotal = cartTotal + tax;

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (user && parseFloat(amount) === parseFloat(grandTotal.toFixed(2))) {
            setProcessing(true);
            try {
                // Save order to Firebase
                const orderData = {
                    userId: user.uid,
                    userName: user.name,
                    userEmail: user.email,
                    items: cartItems,
                    totalAmount: grandTotal,
                    status: 'Confirmed',
                    createdAt: serverTimestamp()
                };

                await addDoc(collection(db, 'orders'), orderData);
                navigate('/order-success');
            } catch (err) {
                console.error("Error saving order:", err);
                setError("Failed to process order. Please try again.");
            } finally {
                setProcessing(false);
            }
        } else {
            setError(`Incorrect amount. Please enter exactly $${grandTotal.toFixed(2)}`);
        }
    };

    return (
        <div className="checkout-page animate-in">
            <div className="container payment-container">
                <div className="payment-card">
                    <div className="payment-header">
                        <CreditCard size={32} color="var(--primary)" />
                        <h1>Complete Your Payment</h1>
                        <p>Enter the exact amount to confirm your order</p>
                    </div>

                    <div className="order-summary">
                        <h3>Order Summary</h3>
                        {cartItems.map(item => (
                            <div key={item.id} className="summary-row">
                                <span>{item.name} x {item.quantity}</span>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                        <div className="summary-total">
                            <span>Total Amount to Pay</span>
                            <span>${grandTotal.toFixed(2)}</span>
                        </div>
                    </div>

                    {error && <div className="payment-error">{error}</div>}

                    <form onSubmit={handlePayment} className="payment-form">
                        <div className="input-group">
                            <label>Enter Amount ($)</label>
                            <div className="input-with-icon">
                                <DollarSign size={20} />
                                <input
                                    type="number"
                                    step="0.01"
                                    required
                                    placeholder="0.00"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    disabled={processing}
                                />
                            </div>
                        </div>
                        <button type="submit" className="pay-btn" disabled={processing}>
                            {processing ? <><Loader2 className="spinner" size={18} /> Processing...</> : 'Pay Now'}
                        </button>
                    </form>

                    <div className="secure-tag">
                        <ShieldCheck size={16} /> 100% Secure Payment Powered by FoodKart
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
