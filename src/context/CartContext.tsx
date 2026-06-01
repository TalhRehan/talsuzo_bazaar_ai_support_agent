"use client"

import React, { createContext, ReactNode, useCallback, useEffect, useState } from "react"
import { getLoggedUserCart } from "@/actions/cart.actions"
import { CartData, product as CartProduct } from "@/api/services/types/cart.type"

type CartContextType = {
  cartId: string
  cartProducts: CartProduct[]
  numberOfCartItems: number
  totalCartPrice: number
  setcartId: React.Dispatch<React.SetStateAction<string>>
  setCartProducts: React.Dispatch<React.SetStateAction<CartProduct[]>>
  setnumberOfCartItems: React.Dispatch<React.SetStateAction<number>>
  setTotalCartPrice: React.Dispatch<React.SetStateAction<number>>
  setCartData: (cart: CartData | null, cartId?: string, numOfCartItems?: number) => void
  refreshCart: () => Promise<void>
}

const defaultCartContext: CartContextType = {
  cartId: "",
  cartProducts: [],
  numberOfCartItems: 0,
  totalCartPrice: 0,
  setcartId: () => {},
  setCartProducts: () => {},
  setnumberOfCartItems: () => {},
  setTotalCartPrice: () => {},
  setCartData: () => {},
  refreshCart: async () => {},
}

export const CartContext = createContext<CartContextType>(defaultCartContext)

export default function CartContextProvider({ children }: { children: ReactNode }) {
  const [cartId, setcartId] = useState("")
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([])
  const [numberOfCartItems, setnumberOfCartItems] = useState(0)
  const [totalCartPrice, setTotalCartPrice] = useState(0)

  const setCartData = useCallback((cart: CartData | null, nextCartId = "", numOfCartItems?: number) => {
    const products = cart?.products ?? []

    setcartId(nextCartId || cart?._id || "")
    setCartProducts(products)
    setTotalCartPrice(cart?.totalCartPrice ?? 0)
    setnumberOfCartItems(
      typeof numOfCartItems === "number"
        ? numOfCartItems
        : products.reduce((sum, item) => sum + item.count, 0)
    )
  }, [])

  const refreshCart = useCallback(async () => {
    try {
      const res = await getLoggedUserCart()

      if (res?.status === "success") {
        setCartData(res.data, res.cartId, res.numOfCartItems)
      }
    } catch (err: unknown) {
      if (err instanceof Error) console.log(err.message)
    }
  }, [setCartData])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refreshCart()
  }, [refreshCart])

  return (
    <CartContext.Provider
      value={{
        cartId,
        cartProducts,
        numberOfCartItems,
        totalCartPrice,
        setcartId,
        setCartProducts,
        setnumberOfCartItems,
        setTotalCartPrice,
        setCartData,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
