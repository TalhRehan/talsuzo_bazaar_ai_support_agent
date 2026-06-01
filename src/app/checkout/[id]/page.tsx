// "use client"
 
// import { Field, FieldError, FieldLabel,FieldDescription } from '@/components/ui/field'
// import { Input } from '@/components/ui/input'
// import { zodResolver } from '@hookform/resolvers/zod'
// import React from 'react'
// import { useForm ,Controller} from 'react-hook-form'
// import * as zod from "zod"
// import { toast } from "sonner"
// import { LoginSchema ,LoginType } from '@/schemas/auth.schema'
// import { UserLogin } from '@/actions/auth.action'
// import { signIn } from 'next-auth/react'
// import Credentials from 'next-auth/providers/credentials'
// import { Button } from '@/components/ui/button'
// import {   redirect, useParams, useRouter } from 'next/navigation'
// import { checkoutSchema, checkoutSchemaType } from '@/schemas/checkout.schema'
// import { onlinePayment } from '@/actions/checkout.action'
// import Link from 'next/link'









// export default function Checkout() {
// const { id } = useParams() as { id: string }  

//  const form =useForm<checkoutSchemaType>({
//   defaultValues : {
//     details:"",
//     phone:"",
//     city:"",
//   },
//   resolver:zodResolver(checkoutSchema)

//  });

 
//   const {control,handleSubmit}= form;

//  async function mySubmit(data:checkoutSchemaType ){
//   console.log(data);
 
// const res = await onlinePayment(id,"" ,data)
// console.log(res);
// if(res.status ==="success"){
//   window.location.href=res.session.url
// }



    

//  }


//  return (<>
  
//   <div className=" w-1/2  mx-auto my-8 p-4">
//   <h1 className=' text-center  text-green-500 font-bold text-4xl mb-6 '>Welcome to TalSuzo Bazaar
// </h1>




// <form onSubmit={handleSubmit(mySubmit)} className='flex flex-col  gap-4'>


// <h1 className='my-8 text-center font-bold text-4xl '>Checkout online payment</h1>


// <Controller
//   name="details"
//   control={control}
//   render={({ field, fieldState }) => (
//     <Field data-invalid={fieldState.invalid}>
//       <FieldLabel htmlFor="details">Details:</FieldLabel>
//       <Input type='text'
//         {...field}
//         id="details"
//         aria-invalid={fieldState.invalid}
//         placeholder="ENTER YOUR Details..."
//         autoComplete="off"
//       />
//       <FieldDescription>
//         Provide a concise title for your bug report.
//       </FieldDescription>
//       {fieldState.invalid && <FieldError  errors={[fieldState.error]} />}
//     </Field>
//   )}
// />










// <Controller
//   name="phone"
//   control={control}
//   render={({ field, fieldState }) => (
//     <Field data-invalid={fieldState.invalid}>
//       <FieldLabel htmlFor="phone">Phone:</FieldLabel>
//       <Input type='tel'
//         {...field}
      
//         id="phone"
//         aria-invalid={fieldState.invalid}
//         placeholder="ENTER YOUR PHONE NUMBER ..."
//         autoComplete="off"
//       />
//       <FieldDescription>
// Enter your full address details.      </FieldDescription>
//       {fieldState.invalid && <FieldError  errors={[fieldState.error]} />}
//     </Field>
//   )}
// />





// <Controller
//   name="city"
//   control={control}
//   render={({ field, fieldState }) => (
//     <Field data-invalid={fieldState.invalid}>
//       <FieldLabel htmlFor="city">city:</FieldLabel>
//       <Input type='text'
//         {...field}
      
//         id="city"
//         aria-invalid={fieldState.invalid}
//         placeholder="ENTER YOUR PHONE CITY ..."
//         autoComplete="off"
//       />
//       <FieldDescription>
//         Provide a concise title for your bug report.
//       </FieldDescription>
//       {fieldState.invalid && <FieldError  errors={[fieldState.error]} />}
//     </Field>
//   )}
// />







// <Button type='submit' className=" w-full p-4 cursor-pointer  font-bold text-white"> Checkout Now</Button>
// </form>





// </div>
  
//   </>
//   )
// }






"use client"

import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useContext } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { useParams, useRouter } from 'next/navigation'
import { checkoutSchema, checkoutSchemaType } from '@/schemas/checkout.schema'
import { onlinePayment } from '@/actions/checkout.action'
import Link from 'next/link'
import { FaCity, FaPhone, FaMapMarkerAlt, FaLock, FaTruck, FaShieldAlt } from 'react-icons/fa'
import { CartContext } from '@/context/CartContext'

export default function Checkout() {
  const router = useRouter()
  const { id } = useParams() as { id: string }
  const { cartProducts, numberOfCartItems, totalCartPrice } = useContext(CartContext)

  const form = useForm<checkoutSchemaType>({
    defaultValues: { details: "", phone: "", city: "" },
    resolver: zodResolver(checkoutSchema)
  });

  const { control, handleSubmit } = form;

  async function mySubmit(data: checkoutSchemaType) {
    const res = await onlinePayment(id, undefined, data)
    if (res.status === "success") {
      router.push(res.session.url)
    }
  }

  const calculatedTotal = cartProducts.reduce((acc, item) => acc + item.count * item.price, 0)
  const orderTotal = totalCartPrice || calculatedTotal

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">

      {/* Header */}
      <div className="max-w-6xl mx-auto mb-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
            <FaTruck className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Complete Your Order</h1>
            <p className="text-gray-500 text-sm">Review your items and complete your purchase</p>
          </div>
        </div>
        <Link href="/cart" className="flex items-center gap-2 text-green-600 hover:text-green-700 text-sm font-medium">
          Back to Cart
        </Link>
      </div>

      <form onSubmit={handleSubmit(mySubmit)}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Shipping form */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* Shipping Address */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-green-600 px-6 py-4">
                <div className="flex items-center gap-2 text-white">
                  <FaMapMarkerAlt className="text-lg" />
                  <div>
                    <h2 className="font-bold text-lg">Shipping Address</h2>
                    <p className="text-green-100 text-sm">Where should we deliver your order?</p>
                  </div>
                </div>
              </div>

              <div className="p-6 flex flex-col gap-5">

                {/* Info Banner */}
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs">i</span>
                  </div>
                  <div>
                    <p className="font-medium text-blue-800 text-sm">Delivery Information</p>
                    <p className="text-blue-600 text-xs mt-0.5">Please ensure your address is accurate for smooth delivery</p>
                  </div>
                </div>

                {/* City */}
                <Controller name="city" control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="city">
                        City <span className="text-red-500">*</span>
                      </FieldLabel>
                      <div className="relative">
                        <FaCity className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                        <Input type="text" {...field} id="city"
                          aria-invalid={fieldState.invalid}
                          placeholder="e.g. Cairo, Alexandria, Giza"
                          className="pl-9" autoComplete="off" />
                      </div>
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />

                {/* Details / Street Address */}
                <Controller name="details" control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="details">
                        Street Address <span className="text-red-500">*</span>
                      </FieldLabel>
                      <div className="relative">
                        <FaMapMarkerAlt className="absolute left-3 top-4 text-gray-400 text-sm" />
                        <textarea
                          {...field}
                          id="details"
                          aria-invalid={fieldState.invalid}
                          placeholder="Street name, building number, floor, apartment..."
                          autoComplete="off"
                          rows={3}
                          className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-500 resize-none"
                        />
                      </div>
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />

                {/* Phone */}
                <Controller name="phone" control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="phone">
                        Phone Number <span className="text-red-500">*</span>
                      </FieldLabel>
                      <div className="relative">
                        <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                        <Input type="tel" {...field} id="phone"
                          aria-invalid={fieldState.invalid}
                          placeholder="01xxxxxxxxx"
                          className="pl-9" autoComplete="off" />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                          Egyptian numbers only
                        </span>
                      </div>
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-green-600 px-6 py-4">
                <div className="flex items-center gap-2 text-white">
                  <FaLock className="text-lg" />
                  <div>
                    <h2 className="font-bold text-lg">Payment Method</h2>
                    <p className="text-green-100 text-sm">Choose how you&apos;d like to pay</p>
                  </div>
                </div>
              </div>

              <div className="p-6 flex flex-col gap-3">
                {/* Pay Online - selected */}
                <div className="border-2 border-green-500 bg-green-50 rounded-xl p-4 flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <FaLock className="text-green-600 text-lg" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Pay Online</p>
                      <p className="text-gray-500 text-xs">Secure payment with Credit/Debit Card via Stripe</p>
                    </div>
                  </div>
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                    <span className="text-white text-xs">OK</span>
                  </div>
                </div>

                {/* Secure & Encrypted */}
                <div className="border border-gray-100 bg-gray-50 rounded-xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <FaShieldAlt className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">Secure & Encrypted</p>
                    <p className="text-green-600 text-xs">Your payment info is protected with 256-bit SSL encryption</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
              <div className="bg-green-600 px-6 py-4">
                <div className="flex items-center gap-2 text-white">
                  <FaLock className="text-sm" />
                  <div>
                    <h2 className="font-bold text-lg">Order Summary</h2>
                    <p className="text-green-100 text-sm">{numberOfCartItems || 0} items</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* Products */}
                <div className="flex flex-col gap-3 max-h-48 overflow-y-auto mb-4">
                  {cartProducts.map((item) => (
                    <div key={item.product._id} className="flex items-center gap-3">
                      <img src={item.product.imageCover} alt={item.product.title}
                        className="w-12 h-12 object-cover rounded-lg border border-gray-100" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-800 truncate">{item.product.title}</p>
                        <p className="text-xs text-gray-500">{item.count} x ${item.price}</p>
                      </div>
                      <span className="text-sm font-bold text-gray-800">${item.count * item.price}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-100 pt-4 flex flex-col gap-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span>${orderTotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 flex items-center gap-1">Shipping</span>
                    <span className="text-green-600 font-medium">FREE</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t border-gray-100">
                    <span>Total</span>
                    <span className="text-green-600">
                      ${orderTotal}
                      <span className="text-sm font-normal text-gray-500 ml-1">USD</span>
                    </span>
                  </div>
                </div>

                <Button type="submit"
                  className="w-full py-6 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl text-base mt-4 transition-colors flex items-center justify-center gap-2">
                  <FaLock className="text-sm" /> Place Order
                </Button>

                <div className="flex justify-center gap-4 mt-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">Secure</span>
                  <span className="flex items-center gap-1">Fast Delivery</span>
                  <span className="flex items-center gap-1">Easy Returns</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </form>
    </div>
  )
}
