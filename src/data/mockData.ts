import { Restaurant, MenuItem, Offer } from '../types';

export const offers: Offer[] = [
    {
        id: 1,
        title: "50% OFF",
        discount: "Up to $10 on your first order",
        code: "WELCOME50",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800",
        color: "#FF4757"
    },
    {
        id: 2,
        title: "FREE DELIVERY",
        discount: "On orders above $25",
        code: "FREEDEL",
        image: "https://images.unsplash.com/photo-1526367790999-0150786486a9?auto=format&fit=crop&q=80&w=800",
        color: "#2ED573"
    },
    {
        id: 3,
        title: "BOGO DEAL",
        discount: "Buy 1 Get 1 on all Pizzas",
        code: "PIZZALOVE",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800",
        color: "#FFA502"
    }
];

export const restaurants: Restaurant[] = [
    {
        id: 1,
        name: "The Italian Garden",
        rating: 4.8,
        cuisine: "Italian, Pasta, Pizza",
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800",
        description: "Authentic wood-fired pizzas and homemade pasta.",
        deliveryTime: "25-30 min",
        offer: "Flat 20% OFF"
    },
    {
        id: 2,
        name: "Burger Haven",
        rating: 4.5,
        cuisine: "American, Burgers, Fries",
        image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&q=80&w=800",
        description: "Juicy burgers made with 100% grass-fed beef.",
        deliveryTime: "15-20 min",
        offer: "Free Drink on $15+"
    },
    {
        id: 3,
        name: "Sushi Zen",
        rating: 4.9,
        cuisine: "Japanese, Sushi, Seafood",
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=800",
        description: "Premium sushi prepared by master chefs.",
        deliveryTime: "35-40 min",
        offer: "10% OFF"
    },
    {
        id: 4,
        name: "Spice Route",
        rating: 4.7,
        cuisine: "Indian, Curry, Tandoori",
        image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=800",
        description: "Experience the rich flavors of traditional Indian spices.",
        deliveryTime: "30-35 min",
        offer: "Free Naan on $20+"
    },
    {
        id: 5,
        name: "Healthy Greens",
        rating: 4.6,
        cuisine: "Salads, Vegan, Healthy",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800",
        description: "Fresh, organic salads and cold-pressed juices.",
        deliveryTime: "20-25 min",
        offer: "Flat 15% OFF"
    },
    {
        id: 6,
        name: "Taco Fiesta",
        rating: 4.4,
        cuisine: "Mexican, Tacos, Nachos",
        image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&q=80&w=800",
        description: "Authentic Mexican street food and refreshing margaritas.",
        deliveryTime: "20-30 min",
        offer: "Buy 2 Get 1 Tacos"
    }
];

export const menuItems: { [key: number]: (Partial<MenuItem> & { tags?: string[] })[] } = {
    1: [
        { id: 101, name: "Margherita Pizza", price: 12.99, image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&q=80&w=400", tags: ["Best Seller", "Veg"], description: "Classic tomato sauce, mozzarella, and fresh basil." },
        { id: 102, name: "Truffle Pasta", price: 18.50, image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=400", tags: ["Premium"], description: "Creamy pasta infused with black truffle oil." },
        { id: 103, name: "Lasagna", price: 15.99, image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=400", tags: ["Cheesy"], description: "Layered pasta with rich meat sauce and cheese." },
        { id: 104, name: "Garlic Bread", price: 5.99, image: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&q=80&w=400", tags: ["Side"], description: "Toasted bread with garlic butter and herbs." },
        { id: 105, name: "Tiramisu", price: 7.50, image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=400", tags: ["Dessert"], description: "Classic Italian coffee-flavored dessert." }
    ],
    2: [
        { id: 201, name: "Classic Cheeseburger", price: 10.99, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400", tags: ["Classic"], description: "Beef patty with cheddar cheese, lettuce, and tomato." },
        { id: 202, name: "Bacon BBQ Burger", price: 13.50, image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&q=80&w=400", tags: ["Spicy"], description: "Beef patty with crispy bacon and BBQ sauce." },
        { id: 203, name: "Loaded Fries", price: 6.99, image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=400", tags: ["Must Try"], description: "Fries topped with cheese, bacon bits, and jalapenos." },
        { id: 204, name: "Chicken Wings", price: 9.99, image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=400", tags: ["Starter"], description: "Spicy buffalo wings served with ranch dip." },
        { id: 205, name: "Vanilla Milkshake", price: 4.99, image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=400", tags: ["Beverage"], description: "Creamy vanilla milkshake topped with whipped cream." }
    ],
    3: [
        { id: 301, name: "Salmon Nigiri", price: 8.99, image: "https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?auto=format&fit=crop&q=80&w=400", tags: ["Fresh"], description: "Fresh slices of salmon on vinegared rice." },
        { id: 302, name: "Dragon Roll", price: 14.50, image: "https://images.unsplash.com/photo-1559410545-0bdcd187e0a6?auto=format&fit=crop&q=80&w=400", tags: ["Specialty"], description: "Eel and cucumber roll topped with avocado." },
        { id: 303, name: "Miso Soup", price: 4.50, image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=400", tags: ["Healthy"], description: "Traditional Japanese soup with tofu and seaweed." },
        { id: 304, name: "Tempura Shrimp", price: 12.00, image: "https://images.unsplash.com/photo-1568214343859-00100d81c850?auto=format&fit=crop&q=80&w=400", tags: ["Crunchy"], description: "Deep-fried shrimp in a light tempura batter." },
        { id: 305, name: "Green Tea Mochi", price: 5.99, image: "https://images.unsplash.com/photo-1582231246903-88849646b5d9?auto=format&fit=crop&q=80&w=400", tags: ["Dessert"], description: "Sweet rice cake filled with green tea ice cream." }
    ],
    4: [
        { id: 401, name: "Butter Chicken", price: 16.99, image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=400", tags: ["Best Seller"], description: "Chicken in a rich, creamy tomato-based gravy." },
        { id: 402, name: "Garlic Naan", price: 3.50, image: "https://images.unsplash.com/photo-1533777324565-a04c11d33dca?auto=format&fit=crop&q=80&w=400", tags: ["Essential"], description: "Soft leavened bread with garlic and butter." },
        { id: 403, name: "Paneer Tikka", price: 12.99, image: "https://images.unsplash.com/photo-1567184109411-b28f2703b142?auto=format&fit=crop&q=80&w=400", tags: ["Veg"], description: "Marinated paneer cheese grilled to perfection." },
        { id: 404, name: "Biryani", price: 14.50, image: "https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?auto=format&fit=crop&q=80&w=400", tags: ["Aromatic"], description: "Fragrant basmati rice cooked with spices and meat." },
        { id: 405, name: "Mango Lassi", price: 4.00, image: "https://images.unsplash.com/photo-1546173159-315724a9389a?auto=format&fit=crop&q=80&w=400", tags: ["Beverage"], description: "Sweet and refreshing yogurt-based mango drink." }
    ],
    5: [
        { id: 501, name: "Quinoa Bowl", price: 13.99, image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400", tags: ["Superfood"], description: "Healthy bowl with quinoa, vegetables, and seeds." },
        { id: 502, name: "Caesar Salad", price: 11.50, image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&q=80&w=400", tags: ["Classic"], description: "Romaine lettuce with Caesar dressing and croutons." },
        { id: 503, name: "Avocado Toast", price: 9.99, image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=400", tags: ["Popular"], description: "Toasted bread topped with mashed avocado and eggs." },
        { id: 504, name: "Hummus Platter", price: 8.50, image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&q=80&w=400", tags: ["Vegan"], description: "Creamy hummus served with pita bread and olives." },
        { id: 505, name: "Smoothie Bowl", price: 10.99, image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&q=80&w=400", tags: ["Fresh"], description: "Antioxidant-rich berry smoothie topped with fruit." }
    ],
    6: [
        { id: 601, name: "Al Pastor Tacos", price: 3.50, image: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&q=80&w=400", tags: ["Street Food"], description: "Tacos with marinated pork and pineapple." },
        { id: 602, name: "Chicken Quesadilla", price: 10.99, image: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?auto=format&fit=crop&q=80&w=400", tags: ["Cheesy"], description: "Tortilla filled with chicken and melted cheese." },
        { id: 603, name: "Guacamole & Chips", price: 6.50, image: "https://images.unsplash.com/photo-1541288097105-563ddc4af802?auto=format&fit=crop&q=80&w=400", tags: ["Side"], description: "Freshly made guacamole served with corn chips." },
        { id: 604, name: "Burrito Bowl", price: 12.99, image: "https://images.unsplash.com/photo-1546241072-48010ad2862c?auto=format&fit=crop&q=80&w=400", tags: ["Filling"], description: "Mexican bowl with rice, beans, meat, and salsa." },
        { id: 605, name: "Churros", price: 5.50, image: "https://images.unsplash.com/photo-1544333303-5775af6d2602?auto=format&fit=crop&q=80&w=400", tags: ["Sweet"], description: "Crispy fried dough sticks rolled in cinnamon sugar." }
    ]
};
