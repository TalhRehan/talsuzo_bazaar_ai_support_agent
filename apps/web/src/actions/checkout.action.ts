"use server"

import { getMyToken } from "@/api/services/types/utilities"
import { checkoutSchemaType } from "@/schemas/checkout.schema";

export async function onlinePayment(productId :string,
    url:string = process.env.NEXTAUTH_URL ?? "http://localhost:3000"
    , formValues : checkoutSchemaType){
   const token= await getMyToken();
if(!token){
    throw new Error("Login first")
}
 const res =await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${productId}?url=${encodeURIComponent(url)}`,
    {method :"POST",
        headers:{
            token: token ,
            "content-type": "application/json"
        },
        body: JSON.stringify({shippingAddress:formValues})




    }
)

const data = await res.json();
return data

}
