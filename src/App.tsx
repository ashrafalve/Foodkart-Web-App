import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import './styles/variables.css';

// Lazy loading pages for better performance
const Home = lazy(() => import('./pages/Home'));
const RestaurantMenu = lazy(() => import('./pages/RestaurantMenu'));
const Cart = lazy(() => import('./pages/Cart'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Payment = lazy(() => import('./pages/Payment'));
const OrderSuccess = lazy(() => import('./pages/OrderSuccess'));

const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/login" />;

    return children;
};

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <Router>
                    <div className="app">
                        <Navbar />
                        <Suspense fallback={<div className="loading-screen">Loading FoodKart...</div>}>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/restaurant/:id" element={<RestaurantMenu />} />
                                <Route path="/cart" element={<Cart />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/signup" element={<Signup />} />
                                <Route
                                    path="/payment"
                                    element={
                                        <ProtectedRoute>
                                            <Payment />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/order-success"
                                    element={
                                        <ProtectedRoute>
                                            <OrderSuccess />
                                        </ProtectedRoute>
                                    }
                                />
                            </Routes>
                        </Suspense>
                    </div>
                </Router>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;
