"use client"

import { FormEvent, useMemo, useState } from "react"
import {
  AlertCircle,
  Bot,
  CheckCircle2,
  ClipboardList,
  Clock3,
  Loader2,
  MessageSquareText,
  RotateCcw,
  ShieldCheck,
  UserRound,
  XCircle,
} from "lucide-react"
import { submitRefundRequest, type RefundDecision } from "@/features/support/api"

const statusStyles = {
  approved: {
    label: "Approved",
    icon: CheckCircle2,
    panel: "border-green-200 bg-green-50 text-green-900",
    badge: "bg-green-600 text-white",
    iconClass: "text-green-600",
  },
  denied: {
    label: "Denied",
    icon: XCircle,
    panel: "border-red-200 bg-red-50 text-red-900",
    badge: "bg-red-600 text-white",
    iconClass: "text-red-600",
  },
  escalated: {
    label: "Escalated",
    icon: Clock3,
    panel: "border-amber-200 bg-amber-50 text-amber-950",
    badge: "bg-amber-500 text-white",
    iconClass: "text-amber-600",
  },
} as const

type FormState = {
  customer_email: string
  order_id: string
  product_id: string
  product_name: string
  reason: string
  message: string
}

const initialForm: FormState = {
  customer_email: "",
  order_id: "",
  product_id: "",
  product_name: "",
  reason: "",
  message: "",
}

export default function SupportPage() {
  const [form, setForm] = useState(initialForm)
  const [decision, setDecision] = useState<RefundDecision | null>(null)
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const canSubmit = useMemo(
    () => form.customer_email.trim() && form.order_id.trim() && form.reason.trim(),
    [form.customer_email, form.order_id, form.reason]
  )

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")
    setDecision(null)
    setIsSubmitting(true)

    try {
      const result = await submitRefundRequest({
        customer_email: form.customer_email.trim(),
        order_id: form.order_id.trim(),
        product_id: form.product_id.trim() || undefined,
        product_name: form.product_name.trim() || undefined,
        reason: form.reason.trim(),
        message: form.message.trim() || undefined,
      })

      setDecision(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const StatusIcon = decision ? statusStyles[decision.status].icon : ClipboardList
  const customerPreview = [form.order_id.trim(), form.product_id.trim() || form.product_name.trim(), form.reason.trim()]
    .filter(Boolean)
    .join(" - ")

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-green-600 to-green-400 px-6 md:px-10 py-12">
        <nav className="text-sm text-green-100 mb-4 flex items-center gap-2">
          <span className="hover:text-white transition-colors">Home</span>
          <span className="text-green-200">/</span>
          <span className="text-white font-medium">Support</span>
        </nav>

        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
            <RotateCcw className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-white text-3xl font-bold">Refund Support</h1>
            <p className="text-green-50 text-base mt-1">
              Submit an order issue and get a policy-based decision.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[1fr_360px] gap-6">
          <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <MessageSquareText className="w-5 h-5 text-green-700" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Support Chat</h2>
                <p className="text-sm text-gray-500">Tell the agent what happened, then submit the refund details.</p>
              </div>
            </div>

            <div className="px-6 pt-6">
              <div className="rounded-xl border border-gray-200 bg-gray-50 overflow-hidden">
                <div className="bg-[#1a2332] px-5 py-3 flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                  <span className="text-sm font-semibold text-white">TalSuzo Refund Agent</span>
                </div>

                <div className="p-5 space-y-4">
                  <ChatMessage
                    role="agent"
                    message="Hi, I can help check your refund request against TalSuzo Bazaar policy. Please enter your email, order ID, product, and reason below."
                  />

                  {customerPreview && (
                    <ChatMessage
                      role="customer"
                      message={`I need help with ${customerPreview}.`}
                    />
                  )}

                  {isSubmitting && (
                    <ChatMessage
                      role="agent"
                      message="I am checking the customer record, order details, refund policy, and risk rules now."
                      loading
                    />
                  )}

                  {decision && (
                    <ChatMessage
                      role="agent"
                      message={decision.agent_summary ?? decision.reason}
                      status={statusStyles[decision.status].label}
                    />
                  )}

                  {error && (
                    <ChatMessage role="agent" message={error} status="Needs attention" />
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 grid md:grid-cols-2 gap-4">
              <Field label="Customer Email" required>
                <input
                  type="email"
                  value={form.customer_email}
                  onChange={(event) => updateField("customer_email", event.target.value)}
                  placeholder="ayesha.khan@example.com"
                  className="w-full h-11 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                />
              </Field>

              <Field label="Order ID" required>
                <input
                  value={form.order_id}
                  onChange={(event) => updateField("order_id", event.target.value)}
                  placeholder="ORD-5001"
                  className="w-full h-11 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                />
              </Field>

              <Field label="Product ID">
                <input
                  value={form.product_id}
                  onChange={(event) => updateField("product_id", event.target.value)}
                  placeholder="PROD-2001"
                  className="w-full h-11 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                />
              </Field>

              <Field label="Product Name">
                <input
                  value={form.product_name}
                  onChange={(event) => updateField("product_name", event.target.value)}
                  placeholder="Noise-Canceling Wireless Headphones"
                  className="w-full h-11 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                />
              </Field>

              <Field label="Refund Reason" required className="md:col-span-2">
                <select
                  value={form.reason}
                  onChange={(event) => updateField("reason", event.target.value)}
                  className="w-full h-11 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 bg-white"
                >
                  <option value="">Select a reason</option>
                  <option value="The product arrived damaged.">Product arrived damaged</option>
                  <option value="The wrong item was delivered.">Wrong item delivered</option>
                  <option value="The product is defective.">Product is defective</option>
                  <option value="The shipment was lost or not delivered.">Lost or not delivered</option>
                  <option value="I changed my mind and want a refund.">Changed my mind</option>
                </select>
              </Field>

              <Field label="Extra Message" className="md:col-span-2">
                <textarea
                  value={form.message}
                  onChange={(event) => updateField("message", event.target.value)}
                  placeholder="Add helpful details about the issue."
                  rows={5}
                  className="w-full resize-none rounded-lg border border-gray-200 px-3 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                />
              </Field>
            </div>

            {error && (
              <div className="mx-6 mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 flex gap-2">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="px-6 py-5 border-t border-gray-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  setForm(initialForm)
                  setDecision(null)
                  setError("")
                }}
                className="px-5 py-3 rounded-lg border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition-colors"
              >
                Clear
              </button>

              <button
                type="submit"
                disabled={!canSubmit || isSubmitting}
                className="px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Checking policy
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    Submit Request
                  </>
                )}
              </button>
            </div>
          </form>

          <aside className="space-y-4">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <div className="bg-[#1a2332] px-5 py-4">
                <h2 className="text-white font-bold text-lg">Decision Summary</h2>
              </div>

              <div className="p-5">
                {decision ? (
                  <div className={`rounded-xl border p-4 ${statusStyles[decision.status].panel}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <StatusIcon className={`w-6 h-6 ${statusStyles[decision.status].iconClass}`} />
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${statusStyles[decision.status].badge}`}>
                        {statusStyles[decision.status].label}
                      </span>
                    </div>
                    <p className="text-sm leading-6 font-medium">{decision.agent_summary ?? decision.reason}</p>
                    <div className="mt-4 pt-4 border-t border-current/10 space-y-2 text-xs">
                      <p>
                        <span className="font-semibold">Request:</span> {decision.request_id}
                      </p>
                      <p>
                        <span className="font-semibold">Order:</span> {decision.order_id}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-5 text-center">
                    <StatusIcon className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                    <h3 className="font-bold text-gray-800 text-sm">No decision yet</h3>
                    <p className="text-xs text-gray-500 mt-1 leading-5">
                      Submit your refund request to see the policy result here.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
              <h3 className="font-bold text-gray-800 text-base mb-3">What We Check</h3>
              <div className="space-y-3">
                {[
                  "Customer and order match",
                  "Refund window and delivery status",
                  "Final-sale and duplicate refund rules",
                  "High-value or risky account review",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-gray-600">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}

function Field({
  label,
  required,
  className = "",
  children,
}: {
  label: string
  required?: boolean
  className?: string
  children: React.ReactNode
}) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
        {required && <span className="text-green-600"> *</span>}
      </span>
      {children}
    </label>
  )
}

function ChatMessage({
  role,
  message,
  loading,
  status,
}: {
  role: "agent" | "customer"
  message: string
  loading?: boolean
  status?: string
}) {
  const isAgent = role === "agent"
  const Icon = isAgent ? Bot : UserRound

  return (
    <div className={`flex gap-3 ${isAgent ? "justify-start" : "justify-end"}`}>
      {isAgent && (
        <div className="w-9 h-9 rounded-full bg-green-100 text-green-700 flex items-center justify-center flex-shrink-0">
          <Icon className="w-4 h-4" />
        </div>
      )}

      <div
        className={`max-w-[82%] rounded-xl px-4 py-3 text-sm leading-6 ${
          isAgent
            ? "bg-white border border-gray-200 text-gray-700"
            : "bg-green-600 text-white"
        }`}
      >
        {status && (
          <div className={`mb-1 text-xs font-bold ${isAgent ? "text-green-700" : "text-green-50"}`}>
            {status}
          </div>
        )}
        <div className="flex items-start gap-2">
          {loading && <Loader2 className="w-4 h-4 animate-spin mt-1 flex-shrink-0" />}
          <span>{message}</span>
        </div>
      </div>

      {!isAgent && (
        <div className="w-9 h-9 rounded-full bg-green-600 text-white flex items-center justify-center flex-shrink-0">
          <Icon className="w-4 h-4" />
        </div>
      )}
    </div>
  )
}
