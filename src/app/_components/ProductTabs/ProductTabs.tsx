"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { FaRegStar, FaStar } from "react-icons/fa6"
import { FaSpinner } from "react-icons/fa"
import { RotateCcw, ShieldCheck, Star, Trash2, Truck } from "lucide-react"
import { toast } from "sonner"
import { productType } from "@/api/services/types/product.type"
import { createProductReview, deleteProductReview, getProductReviews } from "@/actions/review.actions"

type ProductReview = {
  _id: string
  review: string
  rating: number
  user?: {
    name?: string
    email?: string
  }
}

export default function ProductTabs({ product }: { product: productType }) {
  const { data: session, status } = useSession()
  const [activeTab, setActiveTab] = useState("details")
  const [reviews, setReviews] = useState<ProductReview[]>([])
  const [loadingReviews, setLoadingReviews] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [newReview, setNewReview] = useState({ review: "", rating: 5 })
  const [hoverRating, setHoverRating] = useState(0)

  useEffect(() => {
    if (activeTab !== "reviews") return

    let cancelled = false

    async function loadReviews() {
      setLoadingReviews(true)
      const data = await getProductReviews(product._id)

      if (!cancelled) {
        setReviews(data)
        setLoadingReviews(false)
      }
    }

    loadReviews()

    return () => {
      cancelled = true
    }
  }, [activeTab, product._id])

  async function handleSubmitReview() {
    if (!newReview.review.trim()) {
      toast.error("Please write a review", { position: "top-center" })
      return
    }

    setSubmitting(true)
    const res = await createProductReview(product._id, newReview)

    if (res.data) {
      setReviews([res.data, ...reviews])
      setNewReview({ review: "", rating: 5 })
      toast.success("Review added", { position: "top-center" })
    } else {
      const errMsg = res.errors?.msg ?? res.message ?? "Failed to add review"
      toast.error(errMsg, { position: "top-center" })
    }

    setSubmitting(false)
  }

  async function handleDeleteReview(reviewId: string) {
    const ok = await deleteProductReview(reviewId)

    if (ok) {
      setReviews(reviews.filter((review) => review._id !== reviewId))
      toast.success("Review deleted", { position: "top-center" })
    }
  }

  const ratingCounts = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((review) => Math.round(review.rating) === star).length

    return {
      star,
      count,
      percent: reviews.length > 0 ? Math.round((count / reviews.length) * 100) : 0,
    }
  })

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : product.ratingsAverage

  const tabs = [
    { id: "details", label: "Product Details", icon: "Details" },
    { id: "reviews", label: `Reviews (${product.ratingsQuantity})`, icon: "Reviews" },
    { id: "shipping", label: "Shipping & Returns", icon: "Shipping" },
  ]

  return (
    <div className="w-[90%] mx-auto mt-6 mb-10">
      <div className="flex border-b border-gray-200 gap-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 pb-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeTab === tab.id
                ? "border-green-500 text-green-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {activeTab === "details" && (
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">About this Product</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{product.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-xl p-5">
                <h4 className="font-bold text-gray-700 mb-4">Product Information</h4>
                <div className="flex flex-col gap-3">
                  {[
                    { label: "Category", value: product.category?.name },
                    { label: "Brand", value: product.brand?.name },
                    { label: "Rating", value: `${product.ratingsAverage} / 5` },
                    { label: "Items Sold", value: `${product.sold ?? 0}+ sold` },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between text-sm border-b border-gray-50 pb-2">
                      <span className="text-gray-400">{item.label}</span>
                      <span className="font-semibold text-gray-700">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border rounded-xl p-5">
                <h4 className="font-bold text-gray-700 mb-4">Key Features</h4>
                <div className="flex flex-col gap-3">
                  {["Premium Quality Product", "100% Authentic Guarantee", "Fast & Secure Packaging", "Quality Tested"].map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-green-500 font-bold">OK</span>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="flex flex-col gap-6">
            {loadingReviews ? (
              <div className="flex justify-center py-10">
                <FaSpinner className="animate-spin text-3xl text-green-600" />
              </div>
            ) : (
              <>
                {reviews.length > 0 && (
                  <div className="flex gap-8 p-6 border rounded-xl">
                    <div className="flex flex-col items-center justify-center min-w-[100px]">
                      <span className="text-5xl font-bold text-gray-800">{avgRating}</span>
                      <div className="flex items-center gap-0.5 my-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          star <= Math.round(Number(avgRating))
                            ? <FaStar key={star} className="text-yellow-400 text-sm" />
                            : <FaRegStar key={star} className="text-yellow-400 text-sm" />
                        ))}
                      </div>
                      <span className="text-xs text-gray-400">Based on {reviews.length} reviews</span>
                    </div>

                    <div className="flex-1 flex flex-col gap-2">
                      {ratingCounts.map(({ star, percent }) => (
                        <div key={star} className="flex items-center gap-3 text-sm">
                          <span className="text-gray-500 w-10">{star} star</span>
                          <div className="flex-1 bg-gray-100 rounded-full h-2">
                            <div
                              className="bg-yellow-400 h-2 rounded-full transition-all"
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                          <span className="text-gray-400 w-8">{percent}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {status === "authenticated" && (
                  <div className="border rounded-xl p-5">
                    <h4 className="font-bold text-gray-700 mb-4">Write a Review</h4>
                    <div className="flex items-center gap-1 mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                        >
                          {star <= (hoverRating || newReview.rating)
                            ? <FaStar className="text-yellow-400 text-xl cursor-pointer" />
                            : <FaRegStar className="text-yellow-400 text-xl cursor-pointer" />
                          }
                        </button>
                      ))}
                    </div>
                    <textarea
                      value={newReview.review}
                      onChange={(event) => setNewReview({ ...newReview, review: event.target.value })}
                      placeholder="Share your experience with this product..."
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-green-500 resize-none h-24 mb-3"
                    />
                    <button
                      onClick={handleSubmitReview}
                      disabled={submitting}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-60 flex items-center gap-2"
                    >
                      {submitting ? <FaSpinner className="animate-spin" /> : <><Star className="w-4 h-4" /> Submit Review</>}
                    </button>
                  </div>
                )}

                {reviews.length === 0 ? (
                  <div className="flex flex-col items-center py-10 gap-3">
                    <FaRegStar className="text-gray-200 text-5xl" />
                    <p className="text-gray-400">No reviews yet. Be the first to review!</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {reviews.map((review) => (
                      <div key={review._id} className="border rounded-xl p-4 flex justify-between items-start">
                        <div className="flex gap-3">
                          <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center shrink-0 font-bold text-green-700 text-sm">
                            {review.user?.name?.[0]?.toUpperCase() ?? "U"}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800 text-sm">{review.user?.name ?? "User"}</p>
                            <div className="flex items-center gap-0.5 my-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                star <= Math.round(review.rating)
                                  ? <FaStar key={star} className="text-yellow-400 text-xs" />
                                  : <FaRegStar key={star} className="text-yellow-400 text-xs" />
                              ))}
                            </div>
                            <p className="text-gray-500 text-sm">{review.review}</p>
                          </div>
                        </div>

                        {session?.user?.email === review.user?.email && (
                          <button
                            onClick={() => handleDeleteReview(review._id)}
                            className="text-red-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {activeTab === "shipping" && (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 border border-green-100 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
                    <Truck className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-800">Shipping Information</h4>
                </div>
                {[
                  "Free shipping on orders over $50",
                  "Standard delivery: 3-5 business days",
                  "Express delivery available (1-2 business days)",
                  "Track your order in real-time",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <span className="text-green-500 font-bold">OK</span> {item}
                  </div>
                ))}
              </div>

              <div className="bg-green-50 border border-green-100 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
                    <RotateCcw className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-800">Returns & Refunds</h4>
                </div>
                {[
                  "30-day hassle-free returns",
                  "Full refund or exchange available",
                  "Free return shipping on defective items",
                  "Easy online return process",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <span className="text-green-500 font-bold">OK</span> {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="border rounded-xl p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-gray-500" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Buyer Protection Guarantee</h4>
                <p className="text-sm text-gray-500">
                  Get a full refund if your order does not arrive or is not as described. We ensure your shopping experience is safe and secure.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
