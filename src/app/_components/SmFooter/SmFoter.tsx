import React from 'react'
import { FaShieldAlt, FaUndo } from 'react-icons/fa'
import { FaHeadphones, FaTruck } from 'react-icons/fa6'

export default function SmFoter() {
  return (
<>
<div className="bg-green-50 py-6  mb-7">
  <div className="max-w-6xl  mx-3 px-4  flex justify-between grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 ">

    <div className="flex items-center gap-3">
      <div className="bg-green-100 p-3 rounded-xl">
        <FaTruck/>
      </div>
      <div>
        <h4 className="font-semibold text-gray-800">Free Shipping</h4>
        <p className="text-sm text-gray-500">On orders over $500</p>
      </div>
    </div>

    <div className="flex items-center gap-3">
      <div className="bg-green-100 p-3 rounded-xl">
        <FaUndo/>


      </div>
      <div>
        <h4 className="font-semibold text-sm text-gray-800">Easy Returns</h4>
        <p className="text-sm text-gray-500">14-day return policy</p>
      </div>
    </div>

    <div className="flex items-center gap-3">
      <div className="bg-green-100 p-3 rounded-xl">
        <FaShieldAlt/>
      </div>
      <div>
        <h4 className="font-semibold text-sm text-gray-800">Secure Payment</h4>
        <p className="text-sm text-gray-500">100% secure checkout</p>
      </div>
    </div>

    <div className="flex items-center gap-3">
      <div className="bg-green-100 p-3 rounded-xl">
        <FaHeadphones/>

      </div>
      <div>
        <h4 className="font-semibold text-sm text-gray-800">24/7 Support</h4>
        <p className="text-sm text-gray-500">Contact us anytime</p>
      </div>
    </div>

  </div>
</div></>  )
}
