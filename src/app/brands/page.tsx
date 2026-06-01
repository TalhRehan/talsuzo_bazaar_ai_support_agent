import { getAllBrands } from '@/api/services/product.service';
import Link from 'next/link';
import React from 'react'
import { FaTags } from 'react-icons/fa'

export default async function BrandsPage() {
  const brands = await getAllBrands();

  return (
    <div>
      <div className="w-full bg-gradient-to-r from-purple-700 to-purple-400 py-10 px-8 mb-8">

        <div className="flex items-center gap-2 text-purple-200 text-sm mb-4">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-white font-medium">Brands</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-white/20 border-2 border-white/30 flex items-center justify-center">
            <FaTags className="text-white text-2xl" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Top Brands</h1>
            <p className="text-purple-100 text-sm mt-1">Shop from your favorite brands</p>
          </div>
        </div>
      </div>

      <div className="w-[90%] mx-auto pb-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {brands?.map((brand) => (
            <Link href={`/brands/${brand._id}`} key={brand._id}>
              <div className="group border rounded-2xl bg-white hover:border-purple-300 hover:shadow-lg transition-all p-6 flex flex-col items-center gap-3 cursor-pointer">
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="w-24 h-24 object-contain"
                />
                <h2 className="font-semibold text-sm text-center text-gray-700 group-hover:text-purple-600 transition-colors">
                  {brand.name}
                </h2>
                <span className="text-xs text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  View Products →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
