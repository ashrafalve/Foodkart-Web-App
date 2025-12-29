import { db } from '../firebase/config';
import { collection, doc, setDoc } from 'firebase/firestore';
import { restaurants, menuItems, offers } from './mockData';

export const seedDatabase = async () => {
    console.log('Starting seed...');

    try {
        // 1. Seed Restaurants
        for (const res of restaurants) {
            await setDoc(doc(db, 'restaurants', res.id.toString()), res);
            console.log(`Seeded Restaurant: ${res.name}`);
        }

        // 2. Seed Menu Items
        for (const [resId, items] of Object.entries(menuItems)) {
            const menuCollection = collection(db, 'restaurants', resId, 'menu');
            for (const item of items) {
                if (item.id) {
                    await setDoc(doc(menuCollection, item.id.toString()), item);
                }
            }
            console.log(`Seeded ${items.length} items for Restaurant ID: ${resId}`);
        }

        // 3. Seed Offers
        for (const offer of offers) {
            await setDoc(doc(db, 'offers', offer.id.toString()), offer);
            console.log(`Seeded Offer: ${offer.title}`);
        }

        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
};
