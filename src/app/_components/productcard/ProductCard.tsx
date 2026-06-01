"use client"
import React, { useContext } from 'react'
import { FaStar } from 'react-icons/fa6';
import { productType } from '@/api/services/types/product.type';
import { IoReloadCircleOutline } from "react-icons/io5";
import { BiSolidShow } from "react-icons/bi";
import AddBtn from '../addbtn/AddBtn';
import { WishlistContext } from "@/context/WishlistContext"
import { addToWishlist, removeProductFromWishlist } from "@/actions/wishlist.actions"
import { toast } from "sonner"
import { IoHeart, IoHeartOutline } from "react-icons/io5"
import { useSession } from 'next-auth/react'

export default function ProductCard({product} :{product: productType}) {

  const { wishlistIds, setWishlistIds } = useContext(WishlistContext)
  const { status } = useSession()
  const isWishlisted = wishlistIds.includes(product._id)

  async function toggleWishlist() {
    if (status === "unauthenticated") {
      toast.error("Please login first🚫", { position: "top-center" })
      return
    }
    if (isWishlisted) {
      const res = await removeProductFromWishlist(product._id)
      if (res.status === "success") {
        setWishlistIds(wishlistIds.filter(id => id !== product._id))
        toast.success("Removed from wishlist", { position: "top-center" })
      }
    } else {
      const res = await addToWishlist(product._id)
      if (res.status === "success") {
        setWishlistIds([...wishlistIds, product._id])
        toast.success("Added to wishlist", { position: "top-center" })
      }
    }
  }

  const discountPercentage = product.priceAfterDiscount
    ? ((product.price - product.priceAfterDiscount) / product.price) * 100
    : 0;

  return (
    <div className="">
      <div className="relative p-4 border rounded-lg hover:translate-y-1 hover:shadow-gray-600 hover:shadow-2xl transition-[5s]">

        <div className="all flex flex-col justify-center items-center gap-2 absolute top-3 right-3">
          <div className="share p-2.5 rounded-full border-3 border-gray-100 bg-white">
            <IoReloadCircleOutline className='hover:text-[#00A63E] text-lg' />
          </div>
          <div
            onClick={(e) => { e.preventDefault(); toggleWishlist() }}
            className="heart p-2.5 rounded-full border-3 border-gray-100 bg-white cursor-pointer"
          >
            {isWishlisted
              ? <IoHeart className="text-red-500 text-lg" />
              : <IoHeartOutline className="hover:text-[#00A63E] text-lg" />}
          </div>
          <div className="show p-2.5 rounded-full border-3 border-gray-100 bg-white">
            <BiSolidShow className='hover:text-[#00A63E] text-lg' />
          </div>
        </div>

        <img src={product.imageCover} alt={product.title} />
        <h2 className='line-clamp-1 text-sm text-gray-500 my-1'>{product.slug}</h2>
        <h3 className='line-clamp-2 text-lg text-gray-700 mb-1'>{product.title}</h3>

        <div className="rate flex items-center gap-2 ml-2 mb-2">
          <FaStar className='text-yellow-500' />
          <FaStar className='text-yellow-500' />
          <FaStar className='text-yellow-500' />
          <FaStar className='text-yellow-500' />
          <span className='text-sm text-gray-700'>{product.ratingsAverage}</span>
          {`(${product.ratingsQuantity})`}
        </div>

        <div className="price flex justify-between mx-3">
          {product.priceAfterDiscount ? (
            <div className='flex gap-2'>
              <h3 className='text-green-700 text-lg font-bold mt-2 relative'>${product.priceAfterDiscount}</h3>
              <span className='text-sm text-slate-500 line-through mt-4'>${product.price}</span>
              <span className="absolute top-6 left-4 bg-red-500 text-white text-xs px-4 py-1 rounded">
                {Math.round(-discountPercentage)}%
              </span>
            </div>
          ) : (
            <div className='mt-3 text-slate-900 text-2xl font-bold'>${product.price}</div>
          )}

          <AddBtn
            id={product._id}
            classes='size-12 mb-1 cursor-pointer rounded-full bg-green-600 items-center font-bold text-2xl'
            word='+'
          />
        </div>
      </div>
    </div>
  )
}
