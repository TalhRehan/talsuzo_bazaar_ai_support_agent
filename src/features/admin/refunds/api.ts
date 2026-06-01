import { apiUrl } from "@/lib/api-client"
import type { RefundDecision } from "@/features/support/api"

type ApiResponse<T> = {
  success: boolean
  message: string
  data: T
}

export type RefundDecisionLog = RefundDecision & {
  product_id: string | null
  product_name: string | null
  customer_message: string | null
}

async function readApiResponse<T>(response: Response) {
  let body: ApiResponse<T> | null = null

  try {
    body = await response.json()
  } catch {
    body = null
  }

  if (!response.ok || !body) {
    throw new Error("The admin refund data could not be loaded.")
  }

  if (!body.success) {
    throw new Error(body.message || "The admin refund data could not be loaded.")
  }

  return body.data
}

export async function getRefundLogs() {
  const response = await fetch(apiUrl("/admin/refunds"), {
    cache: "no-store",
  })

  return readApiResponse<RefundDecisionLog[]>(response)
}

export async function getRefundLogDetail(requestId: string) {
  const response = await fetch(apiUrl(`/admin/refunds/${requestId}/logs`), {
    cache: "no-store",
  })

  return readApiResponse<RefundDecisionLog | null>(response)
}
