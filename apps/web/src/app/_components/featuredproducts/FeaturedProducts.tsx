import { getAllProducts } from '@/api/services/product.service';
import ProductCard from '../productcard/ProductCard';
import Link from 'next/link';



 export default async function FeaturedProducts({ searchQuery = "" }: { searchQuery?: string }) {




const allProducts = await getAllProducts()
const normalizedSearch = searchQuery.trim().toLowerCase()
const filteredProducts = normalizedSearch
  ? allProducts?.filter((product) =>
      [product.title, product.slug, product.category?.name, product.brand?.name]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(normalizedSearch))
    )
  : allProducts



  return (
<>


<div className="flex w-[90%] mx-auto flex-wrap   ">

    {filteredProducts?.length ? filteredProducts.map((product) => (
            <Link href={`/productdetails/${product.id}`} key={product.id} className='p-2 w-full lg:w-1/4 xl:w-1/5 '>

    <ProductCard  product={product} /></Link>
    
      
      
     ) ) : (
      <div className="w-full py-12 text-center text-gray-500">
        No products found.
      </div>
     )}

</div>

</>  )}
