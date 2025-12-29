import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Home } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import '../styles/Checkout.css';

const OrderSuccess: React.FC = () => {
    const { clearCart } = useCart();

    useEffect(() => {
        // Clear cart after reaching success page
        clearCart();
        document.title = 'Order Confirmed | FoodKart';
    }, []);

    return (
        <div className="success-page">
            <motion.div
                className="success-card"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <div className="success-icon">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1.2 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                    >
                        <CheckCircle size={100} color="var(--success)" />
                    </motion.div>
                </div>

                <h1>Order Placed Successfully!</h1>
                <p>Thank you for your order. Your food is being prepared and will be delivered shortly.</p>

                <div className="order-placeholder-details">
                    <div className="detail-item">
                        <span>Order ID:</span>
                        <span>#FK-{Math.floor(Math.random() * 90000) + 10000}</span>
                    </div>
                    <div className="detail-item">
                        <span>Estimated Delivery:</span>
                        <span>30-45 minutes</span>
                    </div>
                </div>

                <div className="success-actions">
                    <Link to="/" className="home-btn">
                        <Home size={20} /> Back to Home
                    </Link>
                    <Link to="/" className="orders-btn">
                        View Order Status
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default OrderSuccess;
