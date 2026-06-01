"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useEffect, useState } from 'react';

import 'swiper/css';

import 'swiper/css/navigation';

import 'swiper/css/pagination';


export default function SliderShowProduct({
 spaceBetween = 0,
  slidesPerView = 2,
  heightclass,
  productId,
}: {
  spaceBetween?: number;
  slidesPerView?: number;
  heightclass: string;
  productId: string;
}) {
 const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (!productId) return;

    async function fetchImages() {
      try {
        const res = await fetch(
          `https://ecommerce.routemisr.com/api/v1/products/${productId}`
        );
        const data = await res.json();
        setImages(data.data.images ?? []);
      } catch (err) {
        console.log("error fetching slider images", err);
      }
    }

    fetchImages();
  }, [productId]);

  return (
    <div>
      <Swiper
        className={`${heightclass} my-4`}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        modules={[Navigation, Pagination]}
        navigation
        pagination={{
          clickable: true,
          renderBullet(index, className) {
            return `<span class="${className} bg-white!"></span>`;
          },
        }}
      >
        {images.map((src) => (
          <SwiperSlide key={src}>
            <img className="w-full h-full object-cover" src={src} alt={src} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

















