"use server"

import { getMyToken } from "@/api/services/types/utilities"


export async function addToCard(productId: string) {
    try {
        const token = await getMyToken()
        console.log("token in cart:", token)
        if (!token) {
            throw new Error(" please login first")
        }
        const res = await fetch("https://ecommerce.routemisr.com/api/v2/cart", {
            method: "POST",
            headers: {
                token: token as string,
                "content-type": "application/json"
            }
            ,
            body: JSON.stringify({ productId: productId })
        })


        const data = await res.json()
        return data
    }
    catch (err) {
        console.log(err);
        return err

    }
}



export async function getLoggedUserCart() {


    const token = await getMyToken()



    if (!token) {
        throw new Error(" please login first")
    }
    const res = await fetch("https://ecommerce.routemisr.com/api/v2/cart", {
        method: "GET",
        headers: {
            token: token as string,
            "content-type": "application/json"
        }
        ,
    })


    const data = await res.json();
    return data
}

export async function updateProductQuantity(productId: string, count: number) {


    const token = await getMyToken()



    if (!token) {
        throw new Error(" please login first")
    }
    const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${productId}`, {
        method: "PUT",
        headers: {
            token: token as string,
            "content-type": "application/json"
        },
        body: JSON.stringify({ count: count })
        ,
    })


    const data = await res.json();
    return data
}

export async function removeProductFromCart(productId: string) {


    const token = await getMyToken()



    if (!token) {
        throw new Error(" please login first")
    }
    const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${productId}`, {
        method: "DELETE",
        headers: {
            token: token as string,
            "content-type": "application/json"
        },

    })


    const data = await res.json();
    return data
}
export async function clearAllCartProducts() {


    const token = await getMyToken()



    if (!token) {
        throw new Error(" please login first")
    }
    const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
        method: "DELETE",
        headers: {
            token: token as string,
            "content-type": "application/json"
        },

    })


    const data = await res.json();
    return data
}

// "use server";


// import { authOptions } from "@/next-auth/authOptions";
// import { getServerSession } from "next-auth";

// export async function addToCard(productId: string) {
//   const session = await getServerSession(authOptions);

//   const token = session?.user?.accessToken;

//   if (!token) {
//     throw new Error("please login first");
//   }

//   const res = await fetch(
//     "https://ecommerce.routemisr.com/api/v2/cart",
//     {
//       method: "POST",
//       headers: {
//         token,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ productId }),
//     }
//   );

//   return await res.json();
// }