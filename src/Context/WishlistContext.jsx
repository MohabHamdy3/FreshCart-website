import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';

export const WishlistContext = createContext();

function WishlistContextProvider({ children }) {
    const { token } = useContext(AuthContext);
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(false);
  

    // Add product to wishlist
    async function addProductToWishlist(id) {
        try {
            const { data } = await axios.post(
                "https://ecommerce.routemisr.com/api/v1/wishlist",
                { productId: id },
                { headers: { token: localStorage.getItem("tkn") } }
            );
            getUserWishlist();
            setWishlist(data);
            return data;
        } catch (err) {
            console.error("Error adding to wishlist", err);
        }
    }

    // Get user wishlist
    async function getUserWishlist() {
        setLoading(true);
        try {
            const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
                headers: { token: localStorage.getItem("tkn") }
            });
            setWishlist(Array.isArray(data.data) ? data.data : []); // Ensure wishlist is an array
        } catch (err) {
            console.error("Error getting wishlist", err);
            setWishlist([]); // Set to empty array in case of error
        }
        setLoading(false);
    }
    

    // Remove product from wishlist
    async function removeProductFromWishlist(id) {
        try {
            await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
                headers: { token: localStorage.getItem("tkn") }
            });
            setWishlist(wishlist.filter(item => item._id !== id));

        } catch (err) {
            console.error("Error removing product from wishlist", err);
        }
    }

    // Clear wishlist
    async function clearWishlist() {
        setWishlist([]);
    }

    useEffect(() => {
        if (token) {
            getUserWishlist();
        }
    }, [token]);

    return (
        <WishlistContext.Provider value={{ wishlist, loading, addProductToWishlist, removeProductFromWishlist, clearWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
}

export default WishlistContextProvider;
