import { brandType, categoryType, productType } from "./types/product.type";
import { RegisterType } from '@/schemas/auth.schema';


export async function getAllProducts() : Promise <productType[] | undefined>{
    try { 
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products`,{cache:"force-cache"})
    const data= await res.json();
     return data.data

}
    catch { return undefined
     }
}
// 

 export async function getSingleProduct(id : string) : Promise<productType | undefined>{
 
try{  const res =await fetch(
  `https://ecommerce.routemisr.com/api/v1/products/${id}`);
 const data = await res.json()
return data.data 
}

catch { return undefined;

}

 }


 
  export async function getAllCategory(): Promise<categoryType[] | undefined>{
        try{
           const res =await fetch(`https://ecommerce.routemisr.com/api/v1/categories`);
           const data =await res.json();
return data.data           
        }   
        catch{return undefined}
    }


//    export async function UserRegister(data:RegisterType){

//  try{ const res =await fetch(`https://ecommerce.routemisr.com/api/v1/auth/signup`,
//     {method:"post",
//         body:JSON.stringify(data),
//         headers:{"content-type":"application/json"},

//     }
//  );
//  const result =await res.json();
//  console.log("result",result);
//  if(res.ok){}
//      else{}
//   }
//   catch(err){

//   }
//    }




export async function UserRegister(data: RegisterType) {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/auth/signup`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      }
    );

    const result = await res.json();
    return result;

  } catch {
    return undefined;
  }
}



   export async function getProductsByCategory(categoryId: string): Promise<productType[] | undefined> {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`
  );
  const data = await res.json();
  return data.data;
}





export async function getAllBrands(): Promise<brandType[] | undefined> {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/brands?limit=12`,
    );
    const data = await res.json();
    return data.data;
  } catch { return undefined }
}










export async function getProductsByBrand(brandId: string): Promise<productType[] | undefined> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`
    );
    const data = await res.json();
    return data.data;
  } catch { return undefined }
}
