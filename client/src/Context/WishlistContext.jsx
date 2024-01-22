import React, { createContext, useEffect, useState } from "react";

export const WishlistContext = createContext();

const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(
    localStorage.getItem("wishlist")
      ? JSON.parse(localStorage.getItem("wishlist"))
      : []
  );
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (product) => {
    const isItemExist = wishlist.findIndex((item) => item._id === product._id);
    if (isItemExist === -1) {
      setWishlist([...wishlist, product]);
    } else {
      setWishlist(wishlist.filter((item) => item._id !== product._id));
    }
  };

  const data = {
    toggleWishlist,
    wishlist,
  };
  return (
    <>
      <WishlistContext.Provider value={data}>
        {children}
      </WishlistContext.Provider>
    </>
  );
};

export default WishlistProvider;
