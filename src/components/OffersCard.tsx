import React from 'react';
import { Offer } from '../types';
import '../styles/OffersCard.css';

interface OffersCardProps {
    offer: Offer;
}

const OffersCard: React.FC<OffersCardProps> = ({ offer }) => {
    return (
        <div className="offer-card" style={{ '--accent-color': offer.color } as React.CSSProperties}>
            <div className="offer-image">
                <img src={offer.image} alt={offer.title} />
                <div className="offer-overlay"></div>
            </div>
            <div className="offer-info">
                <div className="offer-badge">HOT DEAL</div>
                <h3>{offer.title}</h3>
                <p>{offer.discount}</p>
                <div className="offer-code">
                    Code: <span>{offer.code}</span>
                </div>
            </div>
        </div>
    );
};

export default OffersCard;
