import { getProductsByBrand, getAllBrands } from '@/api/services/product.service';
import ProductCard from '@/app/_components/productcard/ProductCard';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function BrandPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [products, allBrands] = await Promise.all([
    getProductsByBrand(id),
    getAllBrands()
  ]);

  if (!products || products.length === 0) redirect('/notFoundProducts');

  const currentBrand = allBrands?.find((brand) => brand._id === id);

  return (
    <div>
      <div className="w-full bg-gradient-to-r from-purple-700 to-purple-400 py-10 px-8 mb-6">

        <div className="flex items-center gap-2 text-purple-200 text-sm mb-4">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/brands" className="hover:text-white transition-colors">Brands</Link>
          <span>/</span>
          <span className="text-white font-medium">{currentBrand?.name}</span>
        </div>

        <div className="flex items-center gap-4">
          {currentBrand?.image && (
            <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-white/30 bg-white/90 p-1">
              <img
                src={currentBrand.image}
                alt={currentBrand.name}
                className="w-full h-full object-contain"
              />
            </div>
          )}
          <div>
            <h1 className="text-3xl font-bold text-white">{currentBrand?.name}</h1>
            <p className="text-purple-100 text-sm mt-1">Browse products from {currentBrand?.name}</p>
          </div>
        </div>
      </div>

      <div className="w-[90%] mx-auto pb-10">

        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
            </svg>
            <span className="font-medium">Active Filters:</span>
          </div>
          <div className="flex items-center gap-2 bg-purple-100 text-purple-700 text-sm px-3 py-1 rounded-full">
            <div className="w-2 h-2 rounded-full bg-purple-500"></div>
            <span>{currentBrand?.name}</span>
            <Link href="/brands" className="ml-1 hover:text-purple-900 font-bold">x</Link>
          </div>
          <Link href="/brands" className="text-sm text-gray-500 hover:text-gray-700 underline">
            Clear all
          </Link>
        </div>

        <p className="text-sm text-gray-500 mb-6">Showing {products.length} products</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {products.map((product) => (
            <Link href={`/productdetails/${product._id}`} key={product._id}>
              <ProductCard product={product} />
            </Link>
          ))}
        </div>

      </div>
    </div>
  )
}
