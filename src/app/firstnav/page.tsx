// import React from 'react'
// import { HiOutlineMail } from "react-icons/hi";
// import { FaPhoneAlt } from "react-icons/fa";

// import { FaUserAlt } from "react-icons/fa";
// import { FaUserPlus } from "react-icons/fa";

// import { FaTruck } from "react-icons/fa";
// import { IoIosGift } from "react-icons/io";
// import { Link } from 'lucide-react';

// export default function FirstNav() {
//   return (
// <>
// <div className='w-[90%] mx-[40px] p-2 hidden   xl:flex flex justify-between  bg-white border-b-2 border-slate-100  '>


// <div className='left-side flex gap-7  bg-amber-700'>
//     <span className='flex  items-center gap-3 text-sm'><FaTruck />
// Free Shipping on Orders $500</span>
//     <span className='flex gap-2 items-center text-sm '><IoIosGift />

// New Arrivals Daily</span>
// </div>


// <div className='right-side flex    gap-9  bg-blue-400'>
//    <div className="flex gap-2"> <span className='flex  items-center gap-2 text-sm'><FaPhoneAlt />+1 (800) 123-4567

// </span>
//     <span className='flex gap-2 items-center text-sm bg-amber-300'><HiOutlineMail />


// support@talsuzobazaar.com</span>
// </div>

// <div className='flex  bg-red-400 gap-4 '> <span className='flex gap-2 items-center'><FaUserAlt />
// <Link href='/login' className=' cursor-pointer text-sm'>Sign in</Link>
// </span>


//  <span className='flex gap-2 items-center'><FaUserPlus />

// <Link href='/register text-sm'>Sign up</Link>
// </span></div>

// </div>
// </div>


// </>  )
// }










"use client"


import React from 'react'
import { HiOutlineMail } from "react-icons/hi";
import { FaPhoneAlt } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { FaTruck } from "react-icons/fa";
import { IoIosGift } from "react-icons/io";
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function FirstNav() {
  const { status } = useSession();
  
  return (
    <>
      <div className='w-full px-10 py-2 hidden md:flex justify-between items-center bg-white border-b border-slate-100'>
        <div className='flex gap-7'>
          <span className='flex items-center gap-2 text-sm text-gray-600'>
            <FaTruck className='text-green-500' />
            Free Shipping on Orders $500
          </span>
          <span className='flex items-center gap-2 text-sm text-gray-600'>
            <IoIosGift className='text-green-500' />
            New Arrivals Daily
          </span>
        </div>

        <div className='flex items-center gap-8'>

          <div className='flex items-center gap-5'>
            <span className='flex items-center gap-2 text-sm text-gray-600'>
              <FaPhoneAlt className='text-gray-400' />
              +1 (800) 123-4567
            </span>
            <span className='flex items-center gap-2 text-sm text-gray-600'>
              <HiOutlineMail className='text-gray-400' />
              support@talsuzobazaar.com
            </span>
          </div>

          {status==="unauthenticated"? 
         ( <div className='flex items-center gap-5'>
            <Link href='/login' className='flex items-center gap-2 text-sm text-gray-600 hover:text-green-600 transition-colors cursor-pointer'>
              <FaUserAlt className='text-gray-400' />
              Sign In
            </Link>
            <Link href='/register' className='flex items-center gap-2 text-sm text-gray-600 hover:text-green-600 transition-colors cursor-pointer'>
              <FaUserPlus className='text-gray-400' />
              Sign Up
            </Link>
          </div>):("")}
         

        </div>
      </div>
    </>
  )
}
