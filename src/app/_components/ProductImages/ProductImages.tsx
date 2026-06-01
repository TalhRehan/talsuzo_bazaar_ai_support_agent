"use client"
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function ProductImages({
  imageCover,
  images,
}: {
  imageCover: string;
  images: string[];
}) {
  const [mainImage, setMainImage] = useState(imageCover);

  return (
    <div className='w-full p-4'>

      <img
        src={mainImage}
        alt="product"
        className='w-full mb-4 rounded-lg object-cover transition-all duration-300'
      />

      <Swiper
        className="h-24 my-2"
        spaceBetween={8}
        slidesPerView={3}
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
      >
        {images.map((src) => (
          <SwiperSlide key={src}>
            <img
              src={src}
              alt={src}
              onClick={() => setMainImage(src)}
              className={`w-full h-full object-cover rounded-lg cursor-pointer border-2 transition-all duration-200
                ${mainImage === src ? 'border-green-500' : 'border-transparent hover:border-green-300'}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  );
}
