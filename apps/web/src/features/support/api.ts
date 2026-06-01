import { apiUrl } from "@/lib/api-client"

export type RefundDecisionStatus = "approved" | "denied" | "escalated"

export type RefundRequestPayload = {
  customer_email: string
  order_id: string
  product_id?: string
  product_name?: string
  reason: string
  message?: string
}

export type RefundDecision = {
  request_id: string
  status: RefundDecisionStatus
  customer_email: string
  customer_id: string | null
  order_id: string
  reason: string
  matched_rules: string[]
  actions: string[]
  agent_summary: string | null
  created_at: string | null
}

type ApiResponse<T> = {
  success: boolean
  message: string
  data: T
}

export async function submitRefundRequest(payload: RefundRequestPayload) {
  const response = await fetch(apiUrl("/refunds/request"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  let body: ApiResponse<RefundDecision> | null = null

  try {
    body = await response.json()
  } catch {
    body = null
  }

  if (!response.ok || !body) {
    throw new Error("We could not submit your refund request. Please try again.")
  }

  if (!body.success) {
    throw new Error(body.message || "The refund request could not be processed.")
  }

  return body.data
}
