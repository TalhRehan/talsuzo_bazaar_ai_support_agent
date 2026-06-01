"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { MapPin, Plus, Trash2, X } from "lucide-react"
import { FaSpinner } from "react-icons/fa"
import { CiUser } from "react-icons/ci"
import { toast } from "sonner"
import { addAddress, getUserAddresses, removeAddress } from "@/actions/address.actions"

type UserAddress = {
  _id: string
  details: string
  phone: string
  city: string
}

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<UserAddress[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({ details: "", phone: "", city: "" })

  useEffect(() => {
    getUserAddresses().then((res) => {
      if (res?.status === "success") setAddresses(res.data)
      setLoading(false)
    })
  }, [])

  async function handleAdd() {
    if (!form.details || !form.phone || !form.city) {
      toast.error("Please fill all fields", { position: "top-center" })
      return
    }

    setSubmitting(true)
    const res = await addAddress(form)

    if (res?.status === "success") {
      setAddresses(res.data)
      setForm({ details: "", phone: "", city: "" })
      setShowModal(false)
      toast.success("Address added", { position: "top-center" })
    } else {
      toast.error("Failed to add address", { position: "top-center" })
    }

    setSubmitting(false)
  }

  async function handleDelete(id: string) {
    setDeletingId(id)
    const res = await removeAddress(id)

    if (res?.status === "success") {
      setAddresses(res.data)
      toast.success("Address removed", { position: "top-center" })
    }

    setDeletingId(null)
  }

  return (
    <div>
      <div className="w-full bg-gradient-to-r from-green-600 to-green-400 py-8 md:py-10 px-4 md:px-8 mb-6">
        <div className="flex items-center gap-2 text-green-100 text-xs sm:text-sm mb-4">
          <Link href="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <span className="text-white font-medium">My Account</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-white/20 border-2 border-white/30 flex items-center justify-center">
            <CiUser className="text-white text-2xl md:text-3xl" />
          </div>

          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">My Account</h1>
            <p className="text-green-100 text-xs sm:text-sm mt-1">
              Manage your addresses and account settings
            </p>
          </div>
        </div>
      </div>

      <div className="w-[95%] md:w-[90%] mx-auto pb-10 flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-64 shrink-0">
          <div className="border rounded-xl overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 border-b font-semibold text-gray-700">
              My Account
            </div>

            <Link
              href="/profile/addresses"
              className="flex items-center justify-between px-4 py-3 bg-green-50 text-green-700 font-medium text-sm border-b hover:bg-green-100 transition-colors"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-green-600 rounded-md flex items-center justify-center">
                  <MapPin className="w-3 h-3 text-white" />
                </div>
                My Addresses
              </div>
              <span>&gt;</span>
            </Link>

            <Link
              href="/profile/settings"
              className="flex items-center justify-between px-4 py-3 text-gray-600 text-sm hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-200 rounded-md flex items-center justify-center text-xs">
                  S
                </div>
                Settings
              </div>
              <span>&gt;</span>
            </Link>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-start justify-between mb-6 gap-3">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-gray-800">My Addresses</h2>
              <p className="text-sm text-gray-500">Manage your saved delivery addresses</p>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors w-full md:w-auto"
            >
              <Plus className="w-4 h-4" /> Add Address
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <FaSpinner className="animate-spin text-3xl text-green-600" />
            </div>
          ) : addresses.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-100 flex items-center justify-center">
                <MapPin className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
              </div>
              <p className="text-gray-700 font-semibold text-base md:text-lg">No Addresses Yet</p>
              <p className="text-gray-400 text-sm">Add your first delivery address to make checkout easier.</p>
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 md:px-6 py-2 rounded-lg text-sm font-medium"
              >
                <Plus className="w-4 h-4" /> Add Address
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {addresses.map((address) => (
                <div
                  key={address._id}
                  className="border rounded-xl p-4 flex flex-col sm:flex-row sm:justify-between gap-3 hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{address.city}</p>
                      <p className="text-sm text-gray-500">{address.details}</p>
                      <p className="text-sm text-gray-500">{address.phone}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(address._id)}
                    disabled={deletingId === address._id}
                    className="text-red-400 hover:text-red-600 transition-colors disabled:opacity-50 self-end sm:self-auto"
                  >
                    {deletingId === address._id ? (
                      <FaSpinner className="animate-spin w-4 h-4" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-3">
          <div className="bg-white rounded-2xl p-4 md:p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-gray-800">Add New Address</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <input
                placeholder="City"
                value={form.city}
                onChange={(event) => setForm({ ...form, city: event.target.value })}
                className="w-full border rounded-lg px-4 py-2 text-sm"
              />
              <textarea
                placeholder="Address details"
                value={form.details}
                onChange={(event) => setForm({ ...form, details: event.target.value })}
                className="w-full border rounded-lg px-4 py-2 text-sm h-24 resize-none"
              />
              <input
                placeholder="Phone"
                value={form.phone}
                onChange={(event) => setForm({ ...form, phone: event.target.value })}
                className="w-full border rounded-lg px-4 py-2 text-sm"
              />
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 border py-2 rounded-lg text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                disabled={submitting}
                className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <>
                    <Plus className="w-4 h-4" /> Add
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
