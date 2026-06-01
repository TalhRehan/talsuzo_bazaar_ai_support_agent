"use server"

import { getMyToken } from "@/api/services/types/utilities"

export async function getProductReviews(productId: string) {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${productId}/reviews`)
  const data = await res.json()
  return data.data ?? []
}

export async function createProductReview(productId: string, review: { review: string; rating: number }) {
  const token = await getMyToken()
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${productId}/reviews`, {
    method: "POST",
    headers: { token: token as string, "content-type": "application/json" },
    body: JSON.stringify(review)
  })
  const data = await res.json()
  console.log("review response:", data) 
  return data
}

export async function deleteProductReview(reviewId: string) {
  const token = await getMyToken()
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/reviews/${reviewId}`, {
    method: "DELETE",
    headers: { token: token as string }
  })
  return res.ok
}