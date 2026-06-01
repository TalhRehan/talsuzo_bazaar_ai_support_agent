import ProductTabs from '@/app/_components/ProductTabs/ProductTabs'
import { getSingleProduct, getProductsByCategory } from '@/api/services/product.service';
import ProductImages from '@/app/_components/ProductImages/ProductImages';
import QuantitySelector from '@/app/_components/QuantitySelector/QuantitySelector';
import Link from 'next/link';
import React from 'react'
import { FaRegStar, FaStar } from 'react-icons/fa6';

export default async function ProductDetails(props: { params: Promise<{ id: string }> }) {

  const params = await props.params
  const id = params.id
  const myProduct = await getSingleProduct(id)

  const relatedProducts = myProduct?.category?._id
    ? await getProductsByCategory(myProduct.category._id)
    : []

  const filteredRelated = relatedProducts?.filter((product) => product._id !== id).slice(0, 5) ?? []

  const discountPercentage = myProduct?.priceAfterDiscount
    ? Math.round(((myProduct.price - myProduct.priceAfterDiscount) / myProduct.price) * 100)
    : 0

  return (
    <div className='w-full max-w-7xl mx-auto px-4 md:px-8'>

      {/* Product Details - Stack on mobile, side by side on desktop */}
      <div className='my-6 flex flex-col md:flex-row gap-6 md:gap-10'>

        {/* Images - Full width on mobile, 1/3 on desktop */}
        <div className='w-full md:w-1/3'>
          <ProductImages
            imageCover={myProduct?.imageCover ?? ""}
            images={myProduct?.images ?? []}
          />
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col gap-4">
          <div className='flex gap-2 text-sm text-gray-500'>
            <span className='text-green-600 cursor-pointer hover:underline'>{myProduct?.category?.name}</span>
            <span>/</span>
            <span className='text-green-600 cursor-pointer hover:underline'>{myProduct?.brand?.name}</span>
          </div>

          <h2 className='text-xl md:text-2xl font-bold text-gray-900 leading-snug'>{myProduct?.title}</h2>

          <div className="flex items-center gap-2 flex-wrap">
            <div className='flex items-center gap-0.5'>
              {[1,2,3,4,5].map((star) => (
                star <= Math.round(myProduct?.ratingsAverage ?? 0)
                  ? <FaStar key={star} className='text-yellow-400 text-sm' />
                  : <FaRegStar key={star} className='text-yellow-400 text-sm' />
              ))}
            </div>
            <span className='text-gray-700 text-sm font-medium'>{myProduct?.ratingsAverage}</span>
            <span className='text-gray-400 text-sm'>({myProduct?.ratingsQuantity} reviews)</span>
          </div>

          <div className='flex items-center gap-3 flex-wrap'>
            {myProduct?.priceAfterDiscount ? (
              <>
                <h3 className='text-2xl md:text-3xl font-bold text-gray-900'>${myProduct.priceAfterDiscount}</h3>
                <span className='text-base text-slate-400 line-through'>${myProduct.price}</span>
                <span className='bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded'>-{discountPercentage}%</span>
              </>
            ) : (
              <h3 className='text-2xl md:text-3xl font-bold text-gray-900'>${myProduct?.price}</h3>
            )}
          </div>

          <div className='flex items-center gap-2'>
            <span className='w-2 h-2 rounded-full bg-green-500 inline-block'></span>
            <span className='text-green-600 text-sm font-medium'>In Stock</span>
          </div>

          <p className='text-gray-500 text-sm leading-relaxed'>{myProduct?.description}</p>

          <hr className='border-gray-200' />

          <QuantitySelector
            id={id}
            price={myProduct?.priceAfterDiscount ?? myProduct?.price ?? 0}
          />
        </div>
      </div>

      {/* Tabs */}
      {myProduct && <ProductTabs product={myProduct} />}

      {/* You May Also Like */}
      {filteredRelated.length > 0 && (
        <div className='py-8 border-t border-gray-100'>
          <h2 className='text-xl md:text-2xl font-bold text-gray-800 mb-6'>
            You May Also <span className='text-green-500'>Like</span>
          </h2>

          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3'>
            {filteredRelated.map((product) => {
              const discount = product.priceAfterDiscount
                ? Math.round(((product.price - product.priceAfterDiscount) / product.price) * 100)
                : 0

              return (
                <Link
                  href={`/productdetails/${product._id}`}
                  key={product._id}
                  className='border rounded-xl p-3 hover:shadow-md transition-shadow group relative'
                >
                  {product.priceAfterDiscount && (
                    <span className='absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded z-10'>
                      -{discount}%
                    </span>
                  )}

                  <img
                    src={product.imageCover}
                    alt={product.title}
                    className='w-full h-28 md:h-36 object-contain mb-3'
                  />

                  <p className='text-xs text-gray-400 mb-1'>{product.category?.name}</p>
                  <p className='text-sm font-semibold text-gray-800 line-clamp-2 mb-2'>{product.title}</p>

                  <div className='flex items-center gap-0.5 mb-2'>
                    {[1,2,3,4,5].map((star) => (
                      star <= Math.round(product.ratingsAverage ?? 0)
                        ? <FaStar key={star} className='text-yellow-400 text-xs' />
                        : <FaRegStar key={star} className='text-yellow-400 text-xs' />
                    ))}
                    <span className='text-xs text-gray-400 ml-1'>({product.ratingsQuantity})</span>
                  </div>

                  <div className='flex items-center justify-between'>
                    <div>
                      {product.priceAfterDiscount ? (
                        <div className='flex flex-col'>
                          <span className='text-sm font-bold text-gray-900'>${product.priceAfterDiscount}</span>
                          <span className='text-xs text-gray-400 line-through'>${product.price}</span>
                        </div>
                      ) : (
                        <span className='text-sm font-bold text-gray-900'>${product.price}</span>
                      )}
                    </div>
                    <div className='w-8 h-8 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center text-lg font-bold transition-colors'>
                      +
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      )}

    </div>
  )
}
