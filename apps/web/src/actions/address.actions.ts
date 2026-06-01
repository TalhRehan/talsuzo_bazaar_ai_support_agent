"use server"

import { getMyToken } from "@/api/services/types/utilities"

export async function getUserAddresses() {
  try {
    const token = await getMyToken()
    if (!token) throw new Error("please login first🚫")

    const res = await fetch("https://ecommerce.routemisr.com/api/v1/addresses", {
      method: "GET",
      headers: { token: token as string }
    })
    const data = await res.json()
    return data
  } catch { return null }
}

export async function addAddress(addressData: {
  details: string
  phone: string
  city: string
}) {
  try {
    const token = await getMyToken()
    if (!token) throw new Error("please login first🚫")

    const res = await fetch("https://ecommerce.routemisr.com/api/v1/addresses", {
      method: "POST",
      headers: {
        token: token as string,
        "content-type": "application/json"
      },
      body: JSON.stringify(addressData)
    })
    const data = await res.json()
    return data
  } catch { return null }
}

export async function removeAddress(addressId: string) {
  try {
    const token = await getMyToken()
    if (!token) throw new Error("please login first🚫")

    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/addresses/${addressId}`, {
      method: "DELETE",
      headers: { token: token as string }
    })
    const data = await res.json()
    return data
  } catch { return null }
}
