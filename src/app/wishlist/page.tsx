"use client"

import { useContext, useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Heart, ShoppingCart, Trash2 } from "lucide-react"
import { FaSpinner } from "react-icons/fa"
import { toast } from "sonner"
import { addToCard } from "@/actions/cart.actions"
import { getLoggedUserWishlist, removeProductFromWishlist } from "@/actions/wishlist.actions"
import { CartContext } from "@/context/CartContext"
import { WishlistContext } from "@/context/WishlistContext"
import { productType } from "@/api/services/types/product.type"

export default function WishlistPage() {
  const [products, setProducts] = useState<productType[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingId, setLoadingId] = useState<string | null>(null)

  const { setnumberOfCartItems, numberOfCartItems } = useContext(CartContext)
  const { setWishlistIds, wishlistIds } = useContext(WishlistContext)

  useEffect(() => {
    getLoggedUserWishlist().then((res) => {
      if (res.status === "success") {
        setProducts(res.data)
      }
      setLoading(false)
    })
  }, [])

  async function handleAddToCart(productId: string) {
    setLoadingId(productId)
    const res = await addToCard(productId)

    if (res.status === "success") {
      setnumberOfCartItems(numberOfCartItems + 1)
      toast.success("Added to cart", { position: "top-center" })
    }

    setLoadingId(null)
  }

  async function handleRemove(productId: string) {
    setLoadingId(productId)
    const res = await removeProductFromWishlist(productId)

    if (res.status === "success") {
      setProducts(products.filter((product) => product._id !== productId))
      setWishlistIds(wishlistIds.filter((id) => id !== productId))
      toast.success("Removed from wishlist", { position: "top-center" })
    }

    setLoadingId(null)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-4xl text-[#0aad0a]" />
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-red-500 p-2 rounded-md">
          <Heart className="text-white w-5 h-5" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Wishlist</h1>
          <p className="text-gray-500 text-sm">{products.length} item{products.length !== 1 ? "s" : ""} saved</p>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Heart className="w-16 h-16 text-gray-300" />
          <p className="text-gray-500 text-lg">Your wishlist is empty</p>
          <Link href="/shop" className="bg-[#0aad0a] text-white px-6 py-2 rounded-full">
            Start Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="border rounded-xl overflow-hidden">
            <div className="grid grid-cols-12 bg-gray-50 px-6 py-3 text-sm font-semibold text-gray-500 border-b">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Status</div>
              <div className="col-span-2 text-center">Actions</div>
            </div>

            {products.map((product) => (
              <div key={product._id} className="grid grid-cols-12 items-center px-6 py-4 border-b last:border-0 hover:bg-gray-50 transition-colors">
                <div className="col-span-6 flex items-center gap-4">
                  <Link href={`/productdetails/${product._id}`}>
                    <img
                      src={product.imageCover}
                      alt={product.title}
                      className="w-16 h-16 object-cover rounded-lg border"
                    />
                  </Link>
                  <div>
                    <Link href={`/productdetails/${product._id}`}>
                      <p className="font-semibold text-gray-800 line-clamp-1 hover:text-[#0aad0a] transition-colors">
                        {product.title}
                      </p>
                    </Link>
                    <p className="text-sm text-gray-400">{product.category?.name}</p>
                  </div>
                </div>

                <div className="col-span-2 text-center">
                  <span className="font-bold text-gray-800">
                    ${product.priceAfterDiscount ?? product.price}
                  </span>
                </div>

                <div className="col-span-2 text-center">
                  <span className="inline-flex items-center gap-1 text-green-600 text-sm font-medium">
                    <span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span>
                    In Stock
                  </span>
                </div>

                <div className="col-span-2 flex flex-col items-center gap-2">
                  <button
                    onClick={() => handleAddToCart(product._id)}
                    disabled={loadingId === product._id}
                    className="flex items-center gap-2 bg-[#0aad0a] hover:bg-[#089408] text-white text-sm px-4 py-2 rounded-lg transition-colors disabled:opacity-60 w-full justify-center"
                  >
                    {loadingId === product._id
                      ? <FaSpinner className="animate-spin" />
                      : <><ShoppingCart className="w-4 h-4" /> Add to Cart</>
                    }
                  </button>
                  <button
                    onClick={() => handleRemove(product._id)}
                    disabled={loadingId === product._id}
                    className="flex items-center gap-1 text-red-500 hover:text-red-700 text-sm transition-colors"
                  >
                    <Trash2 className="w-4 h-4" /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Link href="/shop" className="flex items-center gap-2 text-gray-500 hover:text-[#0aad0a] transition-colors text-sm">
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
          </div>
        </>
      )}
    </div>
  )
}
