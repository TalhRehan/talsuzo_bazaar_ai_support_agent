// "use client"
// import { Button } from '@/components/ui/button'
// import React, { useEffect, useRef, useState } from 'react'
// import { FaLongArrowAltRight } from "react-icons/fa";

// export default function CartComp() {
//   const [visible, setVisible] = useState(false);
//   const ref = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => { if (entry.isIntersecting) setVisible(true); },
//       { threshold: 0.2 }
//     );
//     if (ref.current) observer.observe(ref.current);
//     return () => observer.disconnect();
//   }, []);

//   return (
//     <div ref={ref} className="flex justify-center gap-7 xl:w-[90%] my-[80px] ml-10 overflow-hidden">

//       <div
//         className={`bg-[#009565] rounded-[16px] w-[48%] px-[30px] pb-[50px] pt-[30px] relative overflow-hidden
//           transition-all duration-700 ease-out
//           ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'}`}
//       >
//         <div className="absolute top-[-40px] right-[-40px] w-40 h-40 rounded-full bg-white/10" />
//         <div className="absolute bottom-[-30px] right-[60px] w-24 h-24 rounded-full bg-white/10" />

//         <span className='rounded-full bg-[#33C192] text-white text-sm py-2 px-3'>🔥 Deal of the Day</span>
//         <h2 className='font-bold text-3xl text-white my-5'>Premium Organic Fruits</h2>
//         <h3 className='text-[#CCEEE3] text-lg'>Get up to 40% off on selected organic fruits</h3>
//         <div className='flex gap-4 items-center'>
//           <h2 className='text-4xl font-bold text-white my-5'>40% OFF</h2>
//           <h3 className='text-[#CCEEE3] text-sm'>Use code: <span className='text-white text-lg font-bold'>ORGANIC40</span></h3>
//         </div>
//         <Button className="bg-white text-[#00895E] rounded-full py-6 px-6 text-lg hover:bg-green-50 transition-colors">
//           Shop Now <FaLongArrowAltRight className='text-[#00895E] ml-2' />
//         </Button>
//       </div>

//       <div
//         className={`bg-gradient-to-br from-[#FF653E] to-[#FF3E6C] rounded-[16px] w-[48%] px-[30px] pb-[50px] pt-[30px] relative overflow-hidden
//           transition-all duration-700 ease-out
//           ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}
//       >
//         <div className="absolute top-[-40px] left-[-40px] w-40 h-40 rounded-full bg-white/10" />
//         <div className="absolute bottom-[-30px] left-[60px] w-24 h-24 rounded-full bg-white/10" />

//         <span className='rounded-full bg-[#FF984F] text-white text-sm py-2 px-3'>✨ New Arrivals</span>
//         <h2 className='font-bold text-3xl text-white my-5'>Exotic Vegetables</h2>
//         <h3 className='text-[#FFDDD5] text-lg'>Discover our latest collection of premium vegetables</h3>
//         <div className='flex gap-4 items-center'>
//           <h2 className='text-4xl font-bold text-white my-5'>25% OFF</h2>
//           <h3 className='text-[#FFDDD5] text-sm'>Use code: <span className='text-white text-lg font-bold'>FRESH25</span></h3>
//         </div>
//         <Button className="bg-white text-[#FF7431] rounded-full py-6 px-6 text-lg hover:bg-orange-50 transition-colors">
//           Explore Now <FaLongArrowAltRight className='text-[#FF7431] ml-2' />
//         </Button>
//       </div>

//     </div>
//   )
// }

















"use client"
import { Button } from '@/components/ui/button'
import React, { useEffect, useRef, useState } from 'react'
import { FaLongArrowAltRight } from "react-icons/fa";

export default function CartComp() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex flex-col md:flex-row justify-center gap-7 xl:w-[90%] my-[80px] mx-4 md:ml-10 overflow-hidden">

      <div
        className={`bg-[#009565] rounded-[16px] w-full md:w-[48%] px-[30px] pb-[50px] pt-[30px] relative overflow-hidden
          transition-all duration-700 ease-out
          ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'}`}
      >
        <div className="absolute top-[-40px] right-[-40px] w-40 h-40 rounded-full bg-white/10" />
        <div className="absolute bottom-[-30px] right-[60px] w-24 h-24 rounded-full bg-white/10" />

        <span className='rounded-full bg-[#33C192] text-white text-sm py-2 px-3'>🔥 Deal of the Day</span>
        <h2 className='font-bold text-3xl text-white my-5'>Premium Organic Fruits</h2>
        <h3 className='text-[#CCEEE3] text-lg'>Get up to 40% off on selected organic fruits</h3>
        <div className='flex gap-4 items-center'>
          <h2 className='text-4xl font-bold text-white my-5'>40% OFF</h2>
          <h3 className='text-[#CCEEE3] text-sm'>Use code: <span className='text-white text-lg font-bold'>ORGANIC40</span></h3>
        </div>
        <Button className="bg-white text-[#00895E] rounded-full py-6 px-6 text-lg hover:bg-green-50 transition-colors">
          Shop Now <FaLongArrowAltRight className='text-[#00895E] ml-2' />
        </Button>
      </div>

      <div
        className={`bg-gradient-to-br from-[#FF653E] to-[#FF3E6C] rounded-[16px] w-full md:w-[48%] px-[30px] pb-[50px] pt-[30px] relative overflow-hidden
          transition-all duration-700 ease-out
          ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}
      >
        <div className="absolute top-[-40px] left-[-40px] w-40 h-40 rounded-full bg-white/10" />
        <div className="absolute bottom-[-30px] left-[60px] w-24 h-24 rounded-full bg-white/10" />

        <span className='rounded-full bg-[#FF984F] text-white text-sm py-2 px-3'>✨ New Arrivals</span>
        <h2 className='font-bold text-3xl text-white my-5'>Exotic Vegetables</h2>
        <h3 className='text-[#FFDDD5] text-lg'>Discover our latest collection of premium vegetables</h3>
        <div className='flex gap-4 items-center'>
          <h2 className='text-4xl font-bold text-white my-5'>25% OFF</h2>
          <h3 className='text-[#FFDDD5] text-sm'>Use code: <span className='text-white text-lg font-bold'>FRESH25</span></h3>
        </div>
        <Button className="bg-white text-[#FF7431] rounded-full py-6 px-6 text-lg hover:bg-orange-50 transition-colors">
          Explore Now <FaLongArrowAltRight className='text-[#FF7431] ml-2' />
        </Button>
      </div>

    </div>
  )
}
