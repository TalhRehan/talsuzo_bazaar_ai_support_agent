"use client"

import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { toast } from "sonner"
import { LoginSchema, LoginType } from '@/schemas/auth.schema'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebook } from 'react-icons/fa'
import img4 from "@/assets/images/img4.png"

export default function Login() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<LoginType>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(LoginSchema)
  });

  const { control, handleSubmit } = form;

  async function mySubmit(data: LoginType) {
    const response = await signIn("credentials", {
      ...data, redirect: false, callbackUrl: "/"
    })
    if (response?.ok) {
      toast.success("Welcome back ❤️", { duration: 2000 , position: "top-center"})
      setTimeout(() => { router.push("/") }, 3000);
    } else {
      toast.error(response?.error, { duration: 3000 })
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">

      <div className="hidden md:flex w-1/2 bg-gray-50 flex-col items-center justify-center border-r border-gray-100 overflow-hidden">
        <img
          src={img4.src}
          alt="TalSuzo Bazaar"
          className="w-full h-72 object-cover"
        />
        <div className="px-10 py-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            TalSuzo Bazaar - Your One-Stop Shop for Quality Products
          </h2>
          <p className="text-gray-500 text-sm">
            Join thousands of happy customers who trust TalSuzo Bazaar for their everyday shopping needs
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-6 py-10 sm:px-10">

        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-1 text-center">
            <span className="text-[#009966]">TalSuzo</span> Bazaar
          </h1>
          <h2 className="text-2xl font-bold text-gray-800 mb-1 text-center">Welcome Back!</h2>
          <p className="text-gray-500 text-sm mb-6 text-center">Sign in to continue your fresh shopping experience</p>

          <button className="w-full border border-gray-200 rounded-lg py-3 flex items-center justify-center gap-3 mb-3 hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
            <FcGoogle className="text-xl" />
            Continue with Google
          </button>
          <button className="w-full border border-gray-200 rounded-lg py-3 flex items-center justify-center gap-3 mb-4 hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
            <FaFacebook className="text-xl text-blue-600" />
            Continue with Facebook
          </button>

          <div className="flex items-center gap-3 w-full mb-4">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 font-medium">OR CONTINUE WITH EMAIL</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <form onSubmit={handleSubmit(mySubmit)} className="flex flex-col gap-4 w-full">

            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">Email Address</FieldLabel>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                    <Input
                      type="email"
                      {...field}
                      id="email"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your email"
                      className="pl-9"
                      autoComplete="off"
                    />
                  </div>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className="flex justify-between items-center">
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <span className="text-xs text-[#009966] cursor-pointer hover:underline">Forgot Password?</span>
                  </div>
                  <div className="relative">
                    <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      {...field}
                      id="password"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your password"
                      className="pl-9 pr-9"
                      autoComplete="off"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input type="checkbox" className="rounded" />
              Keep me signed in
            </label>

            <Button
              type="submit"
              className="w-full py-6 bg-[#009966] hover:bg-green-700 text-white font-bold rounded-lg text-base transition-colors"
            >
              Sign In
            </Button>
          </form>
        </div>

      </div>
    </div>
  )
}
