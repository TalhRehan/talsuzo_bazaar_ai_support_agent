import { getProductsByCategory, getAllCategory } from '@/api/services/product.service';
import ProductCard from '@/app/_components/productcard/ProductCard';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [products, allCategories] = await Promise.all([
    getProductsByCategory(id),
    getAllCategory()
  ]);

  if (!products || products.length === 0) redirect('/notFoundProducts');

  const currentCategory = allCategories?.find((cat) => cat._id === id);

  return (
    <div>
      <div className="w-full bg-gradient-to-r from-green-600 to-green-400 py-10 px-8 mb-6">
        
        <div className="flex items-center gap-2 text-green-100 text-sm mb-4">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/categories" className="hover:text-white transition-colors">Categories</Link>
          <span>/</span>
          <Link href={`/categories/${id}`} className="hover:text-white transition-colors">
            {currentCategory?.name}
          </Link>
          <span>/</span>
          <span className="text-white font-medium">{currentCategory?.name}</span>
        </div>

        <div className="flex items-center gap-4">
          {currentCategory?.image && (
            <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-white/30 bg-white/20">
              <img
                src={currentCategory.image}
                alt={currentCategory.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div>
            <h1 className="text-3xl font-bold text-white">{currentCategory?.name}</h1>
            <p className="text-green-100 text-sm mt-1">Browse products in {currentCategory?.name}</p>
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
          <div className="flex items-center gap-2 bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span>{currentCategory?.name}</span>
            <Link href="/categories" className="ml-1 hover:text-green-900 font-bold">x</Link>
          </div>
          <Link href="/categories" className="text-sm text-gray-500 hover:text-gray-700 underline">
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
