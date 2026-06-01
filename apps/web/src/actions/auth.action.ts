"use server"

import { RegisterType, LoginType } from '@/schemas/auth.schema';







    export async function UserRegister(data:RegisterType){

  const res =await fetch(`https://ecommerce.routemisr.com/api/v1/auth/signup`,
    {method:"post",
        body:JSON.stringify(data),
        headers:{"content-type":"application/json"},

    }
 );
 const result =await res.json();
 console.log(result);
 
 return res.ok 
  

  
 



}



//////////////////////////





  export async function UserLogin(data:LoginType){

  const res =await fetch(`https://ecommerce.routemisr.com/api/v1/auth/signin`,
    {method:"post",
        body:JSON.stringify(data),
        headers:{"Content-Type":"application/json"},

    }
 );
 const result =await res.json();
 console.log(result);
 
 return res.ok 
  

  
 



}




















//    export async function UserLogin(data:LoginType){


 








// }
