import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config.ts';
import { collection, getDocs, QueryDocumentSnapshot, type DocumentData } from 'firebase/firestore';
import RestaurantCard from '../components/RestaurantCard';
import OffersCard from '../components/OffersCard';
import { Search, Zap, RefreshCw } from 'lucide-react';
import { seedDatabase } from '../data/seedFirebase.ts';
import type { Restaurant, Offer } from '../types';
import '../styles/Home.css';

const Home: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [offers, setOffers] = useState<Offer[]>([]);
    const [loading, setLoading] = useState(true);

    const filters = ['All', 'Italian', 'American', 'Indian', 'Healthy', 'Mexican', 'Japanese'];

    useEffect(() => {
        document.title = 'FoodKart | Home - Order Delicious Food';
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            // Fetch Restaurants
            const resSnapshot = await getDocs(collection(db, 'restaurants'));
            const resData = resSnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
                id: doc.id,
                ...doc.data()
            })) as Restaurant[];
            setRestaurants(resData);

            // Fetch Offers
            const offersSnapshot = await getDocs(collection(db, 'offers'));
            const offersData = offersSnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
                id: doc.id,
                ...doc.data()
            })) as Offer[];
            setOffers(offersData);
        } catch (error) {
            console.error("Error fetching firebase data:", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);


    const handleSeed = async () => {
        if (window.confirm('Seed database with mock data?')) {
            await seedDatabase();
            fetchData();
        }
    };

    const filteredRestaurants = restaurants.filter(res => {
        const matchesSearch = res.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            res.cuisine?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = activeFilter === 'All' || res.cuisine?.includes(activeFilter);
        return matchesSearch && matchesFilter;
    });

    if (loading) return <div className="loading-screen">Waking up the kitchen...</div>;

    return (
        <div className="home-page animate-in">
            <header className="hero">
                <div className="container hero-content">
                    <h1>Order Food From Your <span>Favorite</span> Restaurants</h1>
                    <p>Hungry? We've got you covered with the best local cuisines delivered fresh.</p>
                    <div className="search-bar">
                        <Search size={20} color="var(--text-light)" />
                        <input
                            type="text"
                            placeholder="Search for restaurants or cuisines..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </header>

            <main className="container main-content">
                {/* Seed helper - can be removed in production */}
                {restaurants.length === 0 && (
                    <div className="seed-helper">
                        <p>Your database is empty. Populate it with sample data?</p>
                        <button onClick={handleSeed} className="seed-btn">
                            <RefreshCw size={18} /> Seed Data to Firebase
                        </button>
                    </div>
                )}

                {offers.length > 0 && (
                    <section className="offers-section">
                        <div className="section-header">
                            <h2 className="with-icon"><Zap size={24} color="#FFA502" /> Top Offers For You</h2>
                        </div>
                        <div className="offers-grid">
                            {offers.map(offer => (
                                <OffersCard key={offer.id} offer={offer} />
                            ))}
                        </div>
                    </section>
                )}

                <section className="restaurant-list">
                    <div className="section-header">
                        <h2>Popular Restaurants</h2>
                        <div className="filters">
                            {filters.map(filter => (
                                <button
                                    key={filter}
                                    className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                                    onClick={() => setActiveFilter(filter)}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid">
                        {filteredRestaurants.map(res => (
                            <RestaurantCard key={res.id} restaurant={res} />
                        ))}
                    </div>

                    {filteredRestaurants.length === 0 && (
                        <div className="empty-state">
                            <p>No restaurants found. Try seeding data if you haven't yet!</p>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

export default Home;
