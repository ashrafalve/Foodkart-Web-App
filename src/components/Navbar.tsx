import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, LogOut, UtensilsCrossed, Percent } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

const Navbar: React.FC = () => {
    const { cartCount } = useCart();
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="container nav-content">
                <Link to="/" className="logo">
                    <UtensilsCrossed size={32} color="var(--primary)" />
                    <span>Food<span>Kart</span></span>
                </Link>
                <div className="nav-links">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/" className="nav-link offers-link">
                        <Percent size={18} /> Offers
                    </Link>
                    <Link to="/cart" className="nav-link cart-link">
                        <ShoppingCart size={20} />
                        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                    </Link>
                    {user ? (
                        <div className="user-menu">
                            <span className="user-name">Hi, {user.name.split(' ')[0]}</span>
                            <button onClick={handleLogout} className="logout-btn">
                                <LogOut size={20} />
                            </button>
                        </div>
                    ) : (
                        <div className="auth-buttons">
                            <Link to="/login" className="login-btn">Login</Link>
                            <Link to="/signup" className="signup-btn">Sign Up</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
