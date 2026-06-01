// import Image from "next/image";
// import FeaturedProducts from './_components/featuredproducts/FeaturedProducts';
// import Slider from './_components/Slider/Slider';
// import img3 from '../assets/images/img3.png'
// import img2 from '../assets/images/img2.jpg'
// import img1 from '../assets/images/img1.jpg'
// // import HomeCategories from "./_components/HomeCategories/HomeCategories";
// import { lazy, Suspense } from "react";
// import { Divide } from "lucide-react";
// import CartComp from "./_components/CartComp/CartComp";
// import AppCart from "./_components/AppCart/AppCart";
// import TitleFeaturedProducts from "./_components/TitleFeaturedProducts/TitleFeaturedProducts";

// const LazyHomeCategoryComponent =lazy(()=> import("./_components/HomeCategories/HomeCategories"))
// export default function Home() {
//   return (
// <>


// <Slider listOfImg={[img3.src,img2.src,img1.src]} heightclass="h-75"/>
// <Suspense fallback ={<div className=" h-75 bg-green-500 text-white font-bold flex justify-center items-center"></div>}>
//   <LazyHomeCategoryComponent/>
// </Suspense>

// <CartComp/>
// <TitleFeaturedProducts/>

// <FeaturedProducts/>
// <AppCart/>

// </>
//   );
// }









import FeaturedProducts from './_components/featuredproducts/FeaturedProducts';
import Slider from './_components/Slider/Slider';
import img3 from '../assets/images/img3.png'
import img1 from '../assets/images/img1.jpg'
import img5 from '../assets/images/img5.jpg'
import { lazy, Suspense } from "react";
import CartComp from "./_components/CartComp/CartComp";
import AppCart from "./_components/AppCart/AppCart";
import TitleFeaturedProducts from "./_components/TitleFeaturedProducts/TitleFeaturedProducts";
import SmFoter from "./_components/SmFooter/SmFoter";

const LazyHomeCategoryComponent = lazy(() => import("./_components/HomeCategories/HomeCategories"))

export default function Home() {
  return (
    <>
      <div className="relative z-0">
<Slider 



listOfImg={[img3.src, img1.src, img5.src]}



heightclass="h-[300px]" />      
        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-transparent z-10 pointer-events-none" />



        <div className="absolute top-1/2 left-10 -translate-y-1/2 z-20 text-white animate-fadeSlideIn">
          <h1 className="text-4xl font-bold leading-tight mb-3">
            Quality Products Delivered <br /> to your Door
          </h1>
          <p className="text-sm mb-5 opacity-90">Get 20% off your first order</p>
          <div className="flex gap-3 pointer-events-auto">
            <a href="/shop" className="bg-white text-green-700 font-semibold px-5 py-2 rounded-full hover:bg-green-50 transition-colors">
              Shop Now
            </a>
            <a href="/shop" className="border border-white text-white font-semibold px-5 py-2 rounded-full hover:bg-white/10 transition-colors">
              View Deals
            </a>
          </div>
        </div>
      </div>
<SmFoter/>
      <Suspense fallback={<div className="h-75 bg-green-500 text-white font-bold flex justify-center items-center"></div>}>
        <LazyHomeCategoryComponent />
      </Suspense>

      <CartComp />
      <TitleFeaturedProducts />
      <FeaturedProducts />
      <AppCart />
    </>
  );
}
