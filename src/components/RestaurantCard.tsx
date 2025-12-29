import React from 'react';
import { Star, ArrowRight, Clock, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Restaurant } from '../types';
import '../styles/RestaurantCard.css';

interface RestaurantCardProps {
    restaurant: Restaurant;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
    return (
        <div className="restaurant-card">
            <div className="card-image">
                <img src={restaurant.image} alt={restaurant.name} />
                {restaurant.offer && (
                    <div className="card-offer-tag">
                        <Tag size={12} /> {restaurant.offer}
                    </div>
                )}
                <div className="rating">
                    <Star size={14} fill="white" />
                    <span>{restaurant.rating}</span>
                </div>
            </div>
            <div className="card-info">
                <h3>{restaurant.name}</h3>
                <p className="cuisine">{restaurant.cuisine}</p>
                <div className="card-meta">
                    <span className="delivery-time">
                        <Clock size={14} /> {restaurant.deliveryTime}
                    </span>
                </div>
                <Link to={`/restaurant/${restaurant.id}`} className="view-menu">
                    View Menu <ArrowRight size={16} />
                </Link>
            </div>
        </div>
    );
};

export default RestaurantCard;
