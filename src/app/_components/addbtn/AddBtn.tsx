"use client"

import { useContext } from "react"
import { useSession } from "next-auth/react"
import { toast } from "sonner"
import { addToCard } from "@/actions/cart.actions"
import { addToWishlist } from "@/actions/wishlist.actions"
import { Button } from "@/components/ui/button"
import { CartContext } from "@/context/CartContext"
import { WishlistContext } from "@/context/WishlistContext"

export default function AddBtn({
  classes,
  word,
  id,
  type = "cart",
}: {
  classes: string
  word: string
  id: string
  type?: "cart" | "wishlist"
}) {
  const { numberOfCartItems, setnumberOfCartItems } = useContext(CartContext)
  const { wishlistIds, setWishlistIds } = useContext(WishlistContext)
  const { status } = useSession()

  async function handleClick() {
    if (status === "unauthenticated") {
      toast.error("Please login first", { position: "top-center" })
      return
    }

    try {
      if (type === "cart") {
        const res = await addToCard(id)
        if (res.status === "success") {
          toast.success(res.message, { position: "top-center", duration: 2000 })
          setnumberOfCartItems(numberOfCartItems + 1)
        } else {
          toast.error(res.message, { position: "top-center", duration: 2000 })
        }
      } else {
        const res = await addToWishlist(id)
        if (res.status === "success") {
          toast.success(res.message, { position: "top-center", duration: 2000 })
          setWishlistIds([...wishlistIds, id])
        } else {
          toast.error(res.message, { position: "top-center", duration: 2000 })
        }
      }
    } catch {}
  }

  return (
    <Button
      onClick={(event) => {
        event.preventDefault()
        handleClick()
      }}
      className={classes}
    >
      {word}
    </Button>
  )
}
