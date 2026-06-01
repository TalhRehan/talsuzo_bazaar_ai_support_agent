import { getAllCategory } from '@/api/services/product.service';
import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import Link from 'next/link'; 

export default async function HomeCategories() {
  const allCategories = await getAllCategory()

  return (
    <div className="w-full px-4 md:px-8 lg:px-12">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div className="flex items-center gap-2">
          <div className='border-s-8 border-[#009966] h-8'></div>

          <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold'>
            Shop By <span className='text-[#009966]'>Category</span>
          </h1>
        </div>

        <Link 
          href="/categories" 
          className="flex items-center gap-2 text-[#009966] text-sm md:text-base"
        >
          View all categories
          <FaArrowRight className="text-sm md:text-lg" />
        </Link>

      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-6">

        {allCategories?.map((category) => (
          <Link 
            href={`/categories/${category._id}`} 
            key={category._id}
          >
            <div className='p-4 flex flex-col items-center gap-3 border rounded-lg shadow hover:shadow-xl transition-all cursor-pointer'>

              <img 
                src={category.image} 
                alt={category.name} 
                className='w-16 h-16 md:w-20 md:h-20 rounded-full object-cover'
              />

              <h2 className='text-sm md:text-base text-center'>
                {category.name}
              </h2>

            </div>
          </Link>
        ))}

      </div>
    </div>
  )
}
