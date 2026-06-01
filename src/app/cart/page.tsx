
"use client"
import { FaSpinner } from "react-icons/fa";

import React, { useCallback, useContext, useEffect, useState } from 'react'
import { clearAllCartProducts, getLoggedUserCart, removeProductFromCart, updateProductQuantity } from '@/actions/cart.actions'
import { toast } from 'sonner'
import { CartData } from "@/api/services/types/cart.type";
import { CartContext } from "@/context/CartContext";
import Link from "next/link";
import { FaUser } from "react-icons/fa6";
import { FiShoppingCart, FiTrash2 } from "react-icons/fi";
import { ArrowRight, LucideShoppingBag, RotateCcw } from "lucide-react";
export default function Cart() {

  const [productDetails, setproductDetails] = useState <null| CartData>(null)
  const [disabledUpdate, setdisabledUpdate] = useState(false)
  const [updateLoading, setupdateLoading] = useState(false)
  const [currentId, setcurrentId] = useState  <null |string>(null)
  const [removeDisabled, setremoveDisabled] = useState(false)
  const { setnumberOfCartItems, setCartData } = useContext(CartContext)
const [cartId, setcartId] = useState("")







  const getUserCart = useCallback(async function getUserCart() {
  const res= await getLoggedUserCart()  ;
    console.log(res);
    setcartId(res.cartId)
if(res.status==="success"){
  setproductDetails(res.data)
  setCartData(res.data, res.cartId, res.numOfCartItems)
}
}, [setCartData])


async function updateProduct(id:string ,newCount:number) {
setcurrentId(id)
setdisabledUpdate(true)
setupdateLoading(true)
  const res = await updateProductQuantity(id , newCount)
  console.log(res);
  if(res.status ==="success"){toast.success(res.message ,{position:"top-center",duration:2000}
  )
  setproductDetails(res.data)
  setCartData(res.data, cartId, res.numOfCartItems)
  setnumberOfCartItems(res.numOfCartItems)
  setdisabledUpdate(false)
  setupdateLoading(false)


  }    

  else{    toast.error(res.message ,{position:"top-center",duration:2000})
    setdisabledUpdate(false)
      setupdateLoading(false)


}
}

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getUserCart();
  },[getUserCart])
    
  
    async function removeProduct(productId:string) {
      setremoveDisabled(true)
   const res = await   removeProductFromCart(productId)
   console.log(res);
   if(res.status ==="success")
    {toast.success(res.message ,{position:"top-center",duration:2000})
  ;setproductDetails(res.data)
  setCartData(res.data, cartId, res.numOfCartItems)
  setnumberOfCartItems(res.numOfCartItems)
  ;setremoveDisabled(false)
  
  
    }else{toast.error(res.message ,{position:"top-center",duration:2000}
  )}}
  
async function removeAllProducts() {
  const res = await clearAllCartProducts()
    console.log(res);

  if(res.status ==="success"){toast.success(res.message ,{position:"top-center",duration:2000}
  )
  setproductDetails(res.data)
 setCartData(res.data ?? null, cartId, 0)
 setnumberOfCartItems(0)


  }    

  else{    toast.error(res.message ,{position:"top-center",duration:2000})
  


}
}

  if (!productDetails) {
    return (
      <div className="flex justify-center items-center font-bold h-screen">
        <FaSpinner className="animate-spin text-4xl text-[#0aad0a]" />
      </div>
    )
  }
 
  return (
    <>
      {productDetails?.products.length > 0 ? (
        <section className="max-w-7xl mx-auto px-4 py-8">
 
          <nav className="text-sm text-gray-500 mb-4">
            <span className="hover:text-[#0aad0a] cursor-pointer">Home</span>
            <span className="mx-2">/</span>
            <span className="text-gray-800 font-medium">Shopping Cart</span>
          </nav>
 
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-[#0aad0a] p-2 rounded-md">
              <FiShoppingCart className="text-white text-2xl" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Shopping Cart</h1>
          </div>
          <p className="text-gray-500 mb-8">
            You have{" "}
            <span className="text-[#0aad0a] font-semibold">
              {productDetails.products.length} items
            </span>{" "}
            in your cart
          </p>
 
          <div className="flex flex-col lg:flex-row gap-8">
 
            <div className="flex-1 flex flex-col gap-4">
              {productDetails?.products.map((product) => (
                <div
                  key={product.product.id}
                  className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-5 shadow-sm"
                >
                  <img
                    src={product.product.imageCover}
                    alt={product.product.title}
                    className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                  />
 
                  <div className="flex-1 min-w-0">
                    <span className="inline-block text-xs font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full mb-1">
                      Men&apos;s Fashion
                    </span>
                    <h3 className="font-semibold text-gray-800 text-base break-words">
                      {product.product.title}
                    </h3>
                    <p className="text-[#0aad0a] font-bold text-lg mt-1 mb-3">
                      ${product.price}
                    </p>
 
                    <div className="flex items-center gap-2">
                      <button
                        disabled={disabledUpdate}
                        onClick={() => updateProduct(product.product.id, product.count - 1)}
                        className="w-7 h-7 rounded border border-gray-300 text-gray-600 font-bold text-base flex items-center justify-center hover:border-[#0aad0a] hover:text-[#0aad0a] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        −
                      </button>
 
                      <div className="w-8 text-center font-semibold text-gray-700 text-sm">
                        {updateLoading && product.product.id === currentId ? (
                          <FaSpinner className="animate-spin mx-auto text-[#0aad0a]" />
                        ) : (
                          product.count
                        )}
                      </div>
 
                      <button
                        disabled={disabledUpdate}
                        onClick={() => updateProduct(product.product.id, product.count + 1)}
                        className="w-7 h-7 rounded bg-[#0aad0a] text-white font-bold text-base flex items-center justify-center hover:bg-[#098f09] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        +
                      </button>
                    </div>
                  </div>
 
                  <div className="flex flex-col items-end justify-between gap-6 flex-shrink-0 self-stretch">
                    <button
                      onClick={() => removeProduct(product.product.id)}
                      disabled={removeDisabled}
                      className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <FiTrash2 className="text-sm" />
                    </button>
                    <div className="text-right">
                      <p className="text-xs text-gray-400">Total</p>
                      <p className="font-bold text-gray-800">
                        {product.count * product.price}{" "}
                        <span className="text-xs text-gray-400 font-normal">USD</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
 
              <div className="flex justify-end mt-2">
                <button
                  onClick={() => removeAllProducts()}
                  className="text-sm text-red-500 border border-red-300 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                >
                  Clear All Items
                </button>
              </div>
            </div>
 
            <div className="lg:w-80 flex-shrink-0">
              <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm sticky top-4">
 
                <div className="bg-[#1a2332] px-6 py-4">
                  <h2 className="text-white font-bold text-lg">Order Summary</h2>
                </div>
 
                <div className="bg-white px-6 py-5">
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600 text-sm">
                      Subtotal ({productDetails.products.length} items)
                    </span>
                    <span className="font-semibold text-gray-800">
                      ${productDetails.totalCartPrice}
                    </span>
                  </div>
 
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600 text-sm">Shipping</span>
                    <span className="text-[#0aad0a] text-sm font-medium">
                      Calculated at checkout
                    </span>
                  </div>
 
                  <div className="flex justify-between items-center py-4">
                    <span className="font-bold text-gray-800">Estimated Total</span>
                    <span className="font-bold text-[#0aad0a] text-lg">
                      ${productDetails.totalCartPrice}
                    </span>
                  </div>
 
                  <Link href={`/checkout/${cartId}`}>
                    <button className="w-full bg-[#0aad0a] hover:bg-[#098f09] text-white font-semibold py-3.5 rounded-lg transition-colors flex items-center justify-center gap-2 mt-1">
                      <FaUser className="text-sm" />
                      Login to Checkout
                    </button>
                  </Link>
 
                  <p className="text-center text-xs text-gray-400 mt-3">
                    Don&apos;t have an account?{" "}
                    <span className="text-[#0aad0a] font-medium cursor-pointer hover:underline">
                      Sign up
                    </span>
                  </p>
 
                  <div className="mt-4 pt-4 border-t border-gray-100 space-y-1.5">
                    {[
                      "Your cart items will be saved",
                      "Track your orders easily",
                      "Access exclusive member deals",
                    ].map((benefit) => (
                      <div key={benefit} className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="text-[#0aad0a] font-bold">✓</span>
                        {benefit}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
 
          </div>
        </section>
      ) : (

          <div className="min-h-screen bg-gray-50 flex flex-col">

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-20">

        <div className="relative mb-8">
          <div className="w-28 h-28 rounded-full bg-green-100 flex items-center justify-center animate-bounce">
            <LucideShoppingBag className="w-12 h-12 text-green-600 stroke-[1.5]"/>  
          </div>
         
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">
Your cart is empty
        </h1>
        <p className="text-gray-500  text-center text-sm max-w-sm mb-8 ">
you haven&apos;t added anything to your cart yet. <br />
Start exploring our products!
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link className="flex items-center gap-2 px-6 py-3 rounded-full bg-green-600 text-white font-semibold text-sm hover:bg-green-700 transition-colors" href="/shop">
                      Start Shopping
            <ArrowRight className="w-4 h-4" />

</Link>
         
        </div>
      </main>

      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-200">

          {[
            {
              icon: (
                <svg className="w-5 h-5 stroke-green-600" fill="none" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                  <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                </svg>
              ),
              title: "Free Shipping",
              sub: "On orders over $500",
            },
            {
              icon: <RotateCcw className="w-5 h-5 stroke-green-600" strokeWidth={1.8} />,
              title: "Easy Returns",
              sub: "14-day return policy",
            },
            {
              icon: (
                <svg className="w-5 h-5 stroke-green-600" fill="none" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              ),
              title: "Secure Payment",
              sub: "100% secure checkout",
            },
            {
              icon: (
                <svg className="w-5 h-5 stroke-green-600" fill="none" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
              ),
              title: "24/7 Support",
              sub: "Contact us anytime",
            },
          ].map(({ icon, title, sub }) => (
            <div key={title} className="flex items-center gap-3 px-6 py-5">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                {icon}
              </div>
              <div>
                <p className="text-sm font-600 font-semibold text-gray-800">{title}</p>
                <p className="text-xs text-gray-500">{sub}</p>
              </div>
            </div>
          ))}

        </div>
      </div>

    </div>
      )}
    </>
  )
}
 







































