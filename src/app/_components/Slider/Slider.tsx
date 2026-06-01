// "use client"
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import { FaHeadphones, FaTruck } from 'react-icons/fa6';
// import { FaShieldAlt, FaUndo } from 'react-icons/fa';

// export default function Slider({
//   spaceBetween = 0,
//   slidesPerView = 1,
//   listOfImg,
//   heightclass
// }: {
//   spaceBetween?: number,
//   slidesPerView?: number,
//   listOfImg: string[],
//   heightclass: string
// }) {
//   return (

//     <>
//     <div className={heightclass}>
//       <Swiper
//         className="w-full h-full"
//         spaceBetween={spaceBetween}
//         slidesPerView={slidesPerView}
//         modules={[Navigation, Pagination]}
//         navigation
//         pagination={{
//           clickable: true,
//           renderBullet(index, className) {
//             return `<span class="${className} bg-white!"></span>`;
//           },
//         }}
//       >

        
//         {listOfImg.map((src) => (
//           <SwiperSlide key={src} className="h-full">
//             <img className='w-full h-full object-cover object-center' src={src} alt={src} />
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>


 
// </>

//   );
// }




"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import "swiper/css"

import "swiper/css/navigation"

import "swiper/css/pagination"

export default function Slider({
  spaceBetween = 0,
  slidesPerView = 1,
  listOfImg,
  heightclass,
}: {
  spaceBetween?: number
  slidesPerView?: number
  listOfImg: string[]
  heightclass: string
}) {
  return (
    <div className={heightclass}>
      <Swiper
        className="w-full h-full"
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        modules={[Navigation, Pagination]}
        navigation
        pagination={{
          clickable: true,
          renderBullet(_, className) {
            return `<span class="${className} bg-white"></span>`
          },
        }}
      >
        {listOfImg.map((src, index) => (
          <SwiperSlide key={`${src}-${index}`} className="h-full">
            <img
              className="w-full h-full object-cover object-center"
              src={src}
              alt={`slide-${index}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
