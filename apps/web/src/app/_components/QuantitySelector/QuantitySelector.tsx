"use client"

import { useContext, useState } from "react"
import { useSession } from "next-auth/react"
import { Share2, ShoppingCart, Zap } from "lucide-react"
import { IoHeart, IoHeartOutline } from "react-icons/io5"
import { toast } from "sonner"
import { addToCard } from "@/actions/cart.actions"
import { addToWishlist, removeProductFromWishlist } from "@/actions/wishlist.actions"
import { CartContext } from "@/context/CartContext"
import { WishlistContext } from "@/context/WishlistContext"

export default function QuantitySelector({
  id,
  price,
}: {
  id: string
  price: number
}) {
  const [quantity, setQuantity] = useState(1)
  const [cartLoading, setCartLoading] = useState(false)
  const [wishLoading, setWishLoading] = useState(false)

  const { status } = useSession()
  const { numberOfCartItems, setnumberOfCartItems } = useContext(CartContext)
  const { wishlistIds, setWishlistIds } = useContext(WishlistContext)
  const isWishlisted = wishlistIds.includes(id)

  async function handleAddToCart() {
    if (status === "unauthenticated") {
      toast.error("Please login first", { position: "top-center" })
      return
    }

    setCartLoading(true)
    try {
      const res = await addToCard(id)
      if (res.status === "success") {
        setnumberOfCartItems(numberOfCartItems + quantity)
        toast.success(res.message, { position: "top-center", duration: 2000 })
      } else {
        toast.error(res.message, { position: "top-center", duration: 2000 })
      }
    } catch {}
    setCartLoading(false)
  }

  async function toggleWishlist() {
    if (status === "unauthenticated") {
      toast.error("Please login first", { position: "top-center" })
      return
    }

    setWishLoading(true)
    try {
      if (isWishlisted) {
        const res = await removeProductFromWishlist(id)
        if (res.status === "success") {
          setWishlistIds(wishlistIds.filter((wid) => wid !== id))
          toast.success("Removed from wishlist", { position: "top-center" })
        }
      } else {
        const res = await addToWishlist(id)
        if (res.status === "success") {
          setWishlistIds([...wishlistIds, id])
          toast.success("Added to wishlist", { position: "top-center" })
        }
      }
    } catch {}
    setWishLoading(false)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <span className="text-sm font-semibold text-gray-700">Quantity</span>
        <div className="flex items-center gap-3">
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-4 py-2 text-lg text-gray-600 hover:bg-gray-100 transition-colors"
            >
              -
            </button>
            <span className="px-5 py-2 text-sm font-semibold border-x border-gray-300">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="px-4 py-2 text-lg text-gray-600 hover:bg-gray-100 transition-colors"
            >
              +
            </button>
          </div>
          <span className="text-sm text-gray-400">600 available</span>
        </div>
      </div>

      <div className="flex justify-between items-center bg-gray-50 rounded-lg px-4 py-3">
        <span className="text-sm text-gray-500 font-medium">Total Price:</span>
        <span className="text-xl font-bold text-green-600">
          ${(price * quantity).toFixed(2)}
        </span>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleAddToCart}
          disabled={cartLoading}
          className="flex-1 cursor-pointer rounded-xl bg-[#0aad0a] hover:bg-[#089408] text-white font-semibold text-base py-3 flex items-center justify-center gap-2 transition-colors disabled:opacity-60"
        >
          <ShoppingCart className="w-4 h-4" />
          {cartLoading ? "Adding..." : "Add to Cart"}
        </button>

        <button className="flex-1 cursor-pointer rounded-xl bg-gray-900 hover:bg-gray-700 text-white font-semibold text-base py-3 flex items-center justify-center gap-2 transition-colors">
          <Zap className="w-4 h-4" /> Buy Now
        </button>
      </div>

      <div className="flex gap-3">
        <button
          onClick={toggleWishlist}
          disabled={wishLoading}
          className="flex-1 cursor-pointer rounded-xl border border-gray-300 hover:border-gray-400 bg-white text-gray-700 font-medium text-base py-3 flex items-center justify-center gap-2 transition-colors disabled:opacity-60"
        >
          {isWishlisted
            ? <><IoHeart className="text-red-500 text-lg" /> Remove from Wishlist</>
            : <><IoHeartOutline className="text-lg" /> Add to Wishlist</>
          }
        </button>

        <button className="px-5 py-3 rounded-xl border border-gray-300 hover:border-gray-400 bg-white text-gray-500 transition-colors">
          <Share2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
