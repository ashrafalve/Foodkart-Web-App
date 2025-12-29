import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { auth, db } from '../firebase/config.ts';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile,
    type User as FirebaseUser
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

interface UserData {
    uid: string;
    email: string | null;
    name: string;
    [key: string]: any;
}

interface AuthContextType {
    user: UserData | null;
    signup: (userData: any) => Promise<FirebaseUser>;
    login: (email: string, password: string) => Promise<FirebaseUser>;
    logout: () => Promise<void>;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                // Fetch additional user data from Firestore if needed
                const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
                setUser({
                    uid: currentUser.uid,
                    email: currentUser.email,
                    name: currentUser.displayName || (userDoc.exists() ? userDoc.data().name : 'User'),
                    ...userDoc.data()
                });
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const signup = async (userData: any) => {
        try {
            const { user } = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
            await updateProfile(user, { displayName: userData.name });

            // Store extra info in Firestore
            await setDoc(doc(db, 'users', user.uid), {
                name: userData.name,
                email: userData.email,
                createdAt: new Date().toISOString()
            });

            return user;
        } catch (error) {
            throw error;
        }
    };

    const login = async (email: string, password: string) => {
        try {
            const { user } = await signInWithEmailAndPassword(auth, email, password);
            return user;
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        return signOut(auth);
    };

    return (
        <AuthContext.Provider value={{ user, signup, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
