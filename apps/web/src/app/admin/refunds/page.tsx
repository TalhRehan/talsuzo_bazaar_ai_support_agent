"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import {
  AlertCircle,
  CheckCircle2,
  ClipboardList,
  Clock3,
  Eye,
  FileSearch,
  Loader2,
  RefreshCw,
  ShieldCheck,
  XCircle,
} from "lucide-react"
import {
  getRefundLogDetail,
  getRefundLogs,
  type RefundDecisionLog,
} from "@/features/admin/refunds/api"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const statusStyles = {
  approved: {
    label: "Approved",
    icon: CheckCircle2,
    badge: "bg-green-100 text-green-700 border-green-200",
    tone: "text-green-600",
  },
  denied: {
    label: "Denied",
    icon: XCircle,
    badge: "bg-red-100 text-red-700 border-red-200",
    tone: "text-red-600",
  },
  escalated: {
    label: "Escalated",
    icon: Clock3,
    badge: "bg-amber-100 text-amber-800 border-amber-200",
    tone: "text-amber-600",
  },
} as const

export default function AdminRefundsPage() {
  const [logs, setLogs] = useState<RefundDecisionLog[]>([])
  const [selectedLog, setSelectedLog] = useState<RefundDecisionLog | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDetailLoading, setIsDetailLoading] = useState(false)
  const [error, setError] = useState("")

  const sortedLogs = useMemo(
    () =>
      [...logs].sort((a, b) => {
        const aTime = a.created_at ? new Date(a.created_at).getTime() : 0
        const bTime = b.created_at ? new Date(b.created_at).getTime() : 0
        return bTime - aTime
      }),
    [logs]
  )

  const loadLogs = useCallback(async () => {
    setIsLoading(true)
    setError("")

    try {
      const data = await getRefundLogs()
      setLogs(data)
      setSelectedLog((current) => {
        if (!current) return data[0] ?? null
        return data.find((log) => log.request_id === current.request_id) ?? data[0] ?? null
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Refund logs could not be loaded.")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadLogs()
  }, [loadLogs])

  async function openDetail(requestId: string) {
    setIsDetailLoading(true)
    setError("")

    try {
      const detail = await getRefundLogDetail(requestId)
      setSelectedLog(detail)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Refund detail could not be loaded.")
    } finally {
      setIsDetailLoading(false)
    }
  }

  const stats = useMemo(
    () => ({
      total: logs.length,
      approved: logs.filter((log) => log.status === "approved").length,
      denied: logs.filter((log) => log.status === "denied").length,
      escalated: logs.filter((log) => log.status === "escalated").length,
    }),
    [logs]
  )

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-green-600 to-green-400 px-6 md:px-10 py-12">
        <nav className="text-sm text-green-100 mb-4 flex items-center gap-2">
          <span className="hover:text-white transition-colors">Admin</span>
          <span className="text-green-200">/</span>
          <span className="text-white font-medium">Refunds</span>
        </nav>

        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
              <FileSearch className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-white text-3xl font-bold">Refund Review Dashboard</h1>
              <p className="text-green-50 text-base mt-1">
                Inspect policy rules, agent actions, and final decisions.
              </p>
            </div>
          </div>

          <button
            onClick={loadLogs}
            disabled={isLoading}
            className="hidden sm:flex items-center gap-2 rounded-lg bg-white/15 border border-white/30 px-4 py-2 text-sm font-semibold text-white hover:bg-white/25 transition-colors disabled:opacity-60"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
            Refresh
          </button>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard label="Total Requests" value={stats.total} icon={ClipboardList} />
          <StatCard label="Approved" value={stats.approved} icon={CheckCircle2} tone="text-green-600" />
          <StatCard label="Denied" value={stats.denied} icon={XCircle} tone="text-red-600" />
          <StatCard label="Escalated" value={stats.escalated} icon={Clock3} tone="text-amber-600" />
        </div>

        {error && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 flex gap-2">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="grid xl:grid-cols-[minmax(0,1fr)_420px] gap-6">
          <section className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-gray-800">Refund Decisions</h2>
                <p className="text-sm text-gray-500">All requests recorded by the AI support workflow.</p>
              </div>
              <button
                onClick={loadLogs}
                disabled={isLoading}
                className="sm:hidden flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-60"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
            </div>

            {isLoading ? (
              <div className="h-72 flex flex-col items-center justify-center text-gray-500">
                <Loader2 className="w-8 h-8 animate-spin text-green-600 mb-3" />
                <p className="text-sm font-medium">Loading refund logs</p>
              </div>
            ) : sortedLogs.length === 0 ? (
              <EmptyState />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="px-4">Status</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Order</TableHead>
                    <TableHead>Rules</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right pr-4">View</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedLogs.map((log) => (
                    <TableRow
                      key={log.request_id}
                      data-state={selectedLog?.request_id === log.request_id ? "selected" : undefined}
                      className="cursor-pointer"
                      onClick={() => openDetail(log.request_id)}
                    >
                      <TableCell className="px-4">
                        <StatusBadge status={log.status} />
                      </TableCell>
                      <TableCell>
                        <div className="font-semibold text-gray-800">{log.customer_email}</div>
                        <div className="text-xs text-gray-400">{log.customer_id ?? "No customer match"}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-semibold text-gray-800">{log.order_id}</div>
                        <div className="text-xs text-gray-400">{log.product_id ?? log.product_name ?? "No product selected"}</div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-[220px] truncate text-gray-600">
                          {log.matched_rules.join(", ")}
                        </div>
                      </TableCell>
                      <TableCell>{formatDate(log.created_at)}</TableCell>
                      <TableCell className="text-right pr-4">
                        <button
                          type="button"
                          className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-gray-200 text-gray-500 hover:border-green-300 hover:text-green-600 hover:bg-green-50 transition-colors"
                          onClick={(event) => {
                            event.stopPropagation()
                            openDetail(log.request_id)
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </section>

          <RefundDetailPanel log={selectedLog} isLoading={isDetailLoading} />
        </div>
      </section>
    </main>
  )
}

function StatCard({
  label,
  value,
  icon: Icon,
  tone = "text-gray-700",
}: {
  label: string
  value: number
  icon: React.ElementType
  tone?: string
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex items-center gap-3">
      <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
        <Icon className={`w-5 h-5 ${tone}`} />
      </div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: RefundDecisionLog["status"] }) {
  const config = statusStyles[status]
  const Icon = config.icon

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold ${config.badge}`}>
      <Icon className="w-3.5 h-3.5" />
      {config.label}
    </span>
  )
}

function RefundDetailPanel({
  log,
  isLoading,
}: {
  log: RefundDecisionLog | null
  isLoading: boolean
}) {
  return (
    <aside className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden min-h-[520px]">
      <div className="bg-[#1a2332] px-5 py-4 flex items-center justify-between">
        <h2 className="text-white font-bold text-lg">Decision Detail</h2>
        {isLoading && <Loader2 className="w-4 h-4 animate-spin text-white" />}
      </div>

      {!log ? (
        <div className="h-[440px] flex flex-col items-center justify-center text-center px-6">
          <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <ShieldCheck className="w-7 h-7 text-gray-400" />
          </div>
          <h3 className="font-bold text-gray-800">No refund selected</h3>
          <p className="text-sm text-gray-500 mt-2 leading-6">
            Select a refund request from the table to inspect the full agent log.
          </p>
        </div>
      ) : (
        <div className="p-5 space-y-5">
          <div>
            <StatusBadge status={log.status} />
            <h3 className="font-bold text-gray-800 text-base mt-4 break-all">{log.request_id}</h3>
            <p className="text-xs text-gray-400 mt-1">{formatDate(log.created_at)}</p>
          </div>

          <DetailBlock title="Customer and Order">
            <DetailLine label="Customer Email" value={log.customer_email} />
            <DetailLine label="Customer ID" value={log.customer_id ?? "Not matched"} />
            <DetailLine label="Order ID" value={log.order_id} />
            <DetailLine label="Product" value={log.product_id ?? log.product_name ?? "Not provided"} />
          </DetailBlock>

          <DetailBlock title="Decision Reason">
            <p className="text-sm text-gray-700 leading-6">{log.reason}</p>
            {log.agent_summary && (
              <p className="text-sm text-gray-500 leading-6 mt-3 border-t border-gray-100 pt-3">
                {log.agent_summary}
              </p>
            )}
          </DetailBlock>

          <DetailBlock title="Matched Policy Rules">
            <div className="flex flex-wrap gap-2">
              {log.matched_rules.map((rule) => (
                <span key={rule} className="rounded-full bg-green-50 border border-green-200 px-3 py-1 text-xs font-semibold text-green-700">
                  {rule}
                </span>
              ))}
            </div>
          </DetailBlock>

          <DetailBlock title="Agent Actions">
            <ol className="space-y-2">
              {log.actions.map((action, index) => (
                <li key={`${action}-${index}`} className="flex items-start gap-3 text-sm text-gray-700">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                    {index + 1}
                  </span>
                  <span>{action}</span>
                </li>
              ))}
            </ol>
          </DetailBlock>

          {log.customer_message && (
            <DetailBlock title="Customer Message">
              <p className="text-sm text-gray-600 leading-6">{log.customer_message}</p>
            </DetailBlock>
          )}
        </div>
      )}
    </aside>
  )
}

function DetailBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border border-gray-200 rounded-xl p-4">
      <h4 className="text-sm font-bold text-gray-800 mb-3">{title}</h4>
      {children}
    </section>
  )
}

function DetailLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2 border-b border-gray-100 last:border-0">
      <span className="text-xs text-gray-500">{label}</span>
      <span className="text-xs font-semibold text-gray-800 text-right break-all">{value}</span>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="h-72 flex flex-col items-center justify-center text-center px-6">
      <div className="w-14 h-14 rounded-full bg-green-50 border border-green-100 flex items-center justify-center mb-4">
        <ClipboardList className="w-7 h-7 text-green-600" />
      </div>
      <h3 className="font-bold text-gray-800">No refund requests yet</h3>
      <p className="text-sm text-gray-500 mt-2 leading-6 max-w-md">
        Refund decisions will appear here after customers submit requests through the support page.
      </p>
    </div>
  )
}

function formatDate(value: string | null) {
  if (!value) return "No timestamp"

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value))
}
