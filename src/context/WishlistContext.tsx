"use client"

import React, { createContext, ReactNode, useEffect, useState } from "react";
import { getLoggedUserWishlist } from "@/actions/wishlist.actions";
import { productType } from "@/api/services/types/product.type";

export const WishlistContext = createContext({
  wishlistIds: [] as string[],
  setWishlistIds: (() => {}) as React.Dispatch<React.SetStateAction<string[]>>
});

export default function WishlistContextProvider({ children }: { children: ReactNode }) {
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  async function getUserWishlist() {
    try {
      const res = await getLoggedUserWishlist();
      if (res.status === "success") {
        setWishlistIds(res.data.map((product: productType) => product._id));
      }
    } catch (err: unknown) {
      if (err instanceof Error) console.log(err.message);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getUserWishlist();
  }, []);

  return (
    <WishlistContext.Provider value={{ wishlistIds, setWishlistIds }}>
      {children}
    </WishlistContext.Provider>
  );
}
