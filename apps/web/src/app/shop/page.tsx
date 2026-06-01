import React from 'react'
import FeaturedProducts from '../_components/featuredproducts/FeaturedProducts'

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>
}) {
  const { search = "" } = await searchParams

  return (
<>


<div className=" ">

<section className="bg-gradient-to-r from-green-500 to-green-400 px-10 py-12">

    <nav className="text-sm text-green-100 mb-4 flex items-center gap-2">
      <a href="#" className="hover:text-white transition-colors">Home</a>
      <span className="text-green-200">/</span>
      <span className="text-white font-medium">All Products</span>
    </nav>

    <div className="flex items-center gap-4">
      <div className="w-14 h-14 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {/* <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/> */}
        </svg>
      </div>
      <div>
        <h1 className="text-white text-3xl font-bold">All Products</h1>
        <p className="text-green-100 text-base mt-1">Explore our complete product collection</p>
      </div>
    </div>

  </section>

</div>
<h2 className='text-lg text-gray-500 ms-[100px]'>
{search ? `Search results for "${search}"` : "Showing products"}
</h2>
<FeaturedProducts searchQuery={search}/></>  )
}
