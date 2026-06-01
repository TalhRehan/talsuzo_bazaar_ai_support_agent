// "use client"

// import { Button } from '@/components/ui/button'
// import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field'
// import { Input } from '@/components/ui/input'
// import { registerSchema, RegisterType } from '@/schemas/auth.schema'
// import { zodResolver } from '@hookform/resolvers/zod'
// import React from 'react'
// import { useForm ,Controller} from 'react-hook-form'
// import * as zod from "zod"
// import { toast } from "sonner"
// import { useRouter } from 'next/navigation'
// import { UserRegister } from '@/actions/auth.action';



// export default function Register() {
//  const router =useRouter()
//  const form =useForm<RegisterType>({
//   defaultValues : {
//     name: "",
//     email:"",
//     password:"",  
//       phone:"",
// rePassword:"",
//   },
//   resolver:zodResolver(registerSchema)

//  });
//   const {control,handleSubmit}= form;

//  async function mySubmit(data: RegisterType){
//   console.log("data",data);
 

// const result = await UserRegister(data)
// if(result){
//   toast.success("You Registerd Successfully ❤️",{duration:2000})
//   setTimeout(() => {  router.push("/login")

    
//   }, 3000);
// }
// else{
//     toast.error("Can't Register Now!🛑",{duration:3000})

// }
//  }

 
//  return (<>
  
//   <div className=" w-1/2  mx-auto my-8 p-4">
//   <h1 className=' text-center font-bold text-4xl mb-6 '>Welcome to TalSuzo Bazaar
// </h1>




// <form onSubmit={handleSubmit(mySubmit)} className='flex flex-col  gap-4'>

// <Controller
//   name="name"
//   control={control}
//   render={({ field, fieldState }) => (
//     <Field data-invalid={fieldState.invalid}>
//       <FieldLabel htmlFor={field.name}>Name:</FieldLabel>
//       <Input type='text'
//         {...field}
//         id={field.name}
//         aria-invalid={fieldState.invalid}
//         placeholder="ENTER YOUR NAME..."
//         autoComplete="off"
//       />
//       <FieldDescription>
//         Provide a concise title for your bug report.
//       </FieldDescription>
//       {fieldState.invalid && <FieldError  errors={[fieldState.error]} />}
//     </Field>
//   )}
// />



// <Controller
//   name="email"
//   control={control}
//   render={({ field, fieldState }) => (
//     <Field data-invalid={fieldState.invalid}>
//       <FieldLabel htmlFor={field.name}>Email:</FieldLabel>
//       <Input type='email'
//         {...field}
//         id={field.name}
//         aria-invalid={fieldState.invalid}
//         placeholder="ENTER YOUR EMAIL..."
//         autoComplete="off"
//       />
//       <FieldDescription>
//         Provide a concise title for your bug report.
//       </FieldDescription>
//       {fieldState.invalid && <FieldError  errors={[fieldState.error]} />}
//     </Field>
//   )}
// />





// <Controller
//   name="phone"
//   control={control}
//   render={({ field, fieldState }) => (
//     <Field data-invalid={fieldState.invalid}>
//       <FieldLabel htmlFor="phoneinput">PHONE:</FieldLabel>
//       <Input type='tel'
//         {...field}
//         id="phoneinput"
//         aria-invalid={fieldState.invalid}
//         placeholder="ENTER YOUR PHONE..."
//         autoComplete="off"
//       />
//       <FieldDescription>
//         Provide a concise title for your bug report.
//       </FieldDescription>
//       {fieldState.invalid && <FieldError  errors={[fieldState.error]} />}
//     </Field>
//   )}
// />




// <Controller
//   name="password"
//   control={control}
//   render={({ field, fieldState }) => (
//     <Field data-invalid={fieldState.invalid}>
//       <FieldLabel htmlFor="passwordinput">password:</FieldLabel>
//       <Input type='password'
//         {...field}
      
//         id="passwordinput"
//         aria-invalid={fieldState.invalid}
//         placeholder="ENTER YOUR password..."
//         autoComplete="off"
//       />
//       <FieldDescription>
//         Provide a concise title for your bug report.
//       </FieldDescription>
//       {fieldState.invalid && <FieldError  errors={[fieldState.error]} />}
//     </Field>
//   )}
// />





// <Controller
//   name="rePassword"
//   control={control}
//   render={({ field, fieldState }) => (
//     <Field data-invalid={fieldState.invalid}>
//       <FieldLabel htmlFor="repasswordinput">repassword:</FieldLabel>
//       <Input type='password'
//         {...field}
      
//         id="repasswordinput"
//         aria-invalid={fieldState.invalid}
//         placeholder="ENTER YOUR repassword..."
//         autoComplete="off"
//       />
//       <FieldDescription>
//         Provide a concise title for your bug report.
//       </FieldDescription>
//       {fieldState.invalid && <FieldError  errors={[fieldState.error]} />}
//     </Field>
//   )}
// />

// <Button type='submit' className=" w-full p-4 cursor-pointer  font-bold text-white"> Register Now</Button>
// </form>





// </div>
  
//   </>
//   )
// }











"use client"

import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { registerSchema, RegisterType } from '@/schemas/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { toast } from "sonner"
import { useRouter } from 'next/navigation'
import { UserRegister } from '@/actions/auth.action'
import { FaUser, FaEnvelope, FaLock, FaPhone, FaEye, FaEyeSlash } from 'react-icons/fa'
import Link from 'next/link'

export default function Register() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showRePassword, setShowRePassword] = useState(false)

  const form = useForm<RegisterType>({
    defaultValues: { name: "", email: "", password: "", phone: "", rePassword: "" },
    resolver: zodResolver(registerSchema)
  });

  const { control, handleSubmit } = form;

  async function mySubmit(data: RegisterType) {
    const result = await UserRegister(data)
    if (result) {
      toast.success("You Registered Successfully ❤️", { duration: 2000 , position: "top-center"})
      setTimeout(() => { router.push("/login") }, 3000);
    } else {
      toast.error("Can't Register Now!🚫", { duration: 3000 , position: "top-center"})
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">

        <div className="flex flex-col items-center mb-6">
          <div className="relative mb-4">
            <div className="w-20 h-20 bg-white rounded-2xl shadow-md flex items-center justify-center">
              <svg className="w-10 h-10 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-10-4h11.6c.8 0 1.5-.4 1.8-1.1l3.4-6.8A1 1 0 0022 5H5.2L4.3 3H1v2h2l3.6 7.6L5 15v1c0 1.1.9 2 2 2h14v-2H7.4l.6-2z"/>
              </svg>
            </div>
           <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
  ✓
</div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-1">
            <span className="text-green-500">TalSuzo</span> Bazaar
          </h1>
          <h2 className="text-xl font-bold text-gray-800">Create Account</h2>
          <p className="text-gray-500 text-sm mt-1">Join thousands of happy customers</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <form onSubmit={handleSubmit(mySubmit)} className="flex flex-col gap-4">

            <Controller name="name" control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                    <Input type="text" {...field} id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your full name"
                      className="pl-9" autoComplete="off" />
                  </div>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller name="email" control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Email Address</FieldLabel>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                    <Input type="email" {...field} id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your email"
                      className="pl-9" autoComplete="off" />
                  </div>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller name="phone" control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="phoneinput">Phone Number</FieldLabel>
                  <div className="relative">
                    <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                    <Input type="tel" {...field} id="phoneinput"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your phone number"
                      className="pl-9" autoComplete="off" />
                  </div>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller name="password" control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="passwordinput">Password</FieldLabel>
                  <div className="relative">
                    <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                    <Input type={showPassword ? "text" : "password"} {...field} id="passwordinput"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your password"
                      className="pl-9 pr-9" autoComplete="off" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller name="rePassword" control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="repasswordinput">Confirm Password</FieldLabel>
                  <div className="relative">
                    <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                    <Input type={showRePassword ? "text" : "password"} {...field} id="repasswordinput"
                      aria-invalid={fieldState.invalid}
                      placeholder="Confirm your password"
                      className="pl-9 pr-9" autoComplete="off" />
                    <button type="button" onClick={() => setShowRePassword(!showRePassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showRePassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Button type="submit"
              className="w-full py-6 bg-[#009966] hover:bg-green-700 text-white font-bold rounded-lg text-base transition-colors mt-2">
              Create Account
            </Button>

            <div className="flex gap-3 mt-1">
              <Link href="/" className="flex-1">
                <Button type="button" className="w-full py-5 bg-[#009966] hover:bg-green-700 text-white rounded-lg flex items-center justify-center gap-2">
                  🏠 Go to Homepage
                </Button>
              </Link>
              <Link href="/login" className="flex-1">
                <Button type="button" className="w-full py-5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg flex items-center justify-center gap-2">
                  ← Go Back
                </Button>
              </Link>
            </div>

          </form>
        </div>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-[#009966] font-medium hover:underline">
            Sign In
          </Link>
        </p>

      </div>
    </div>
  )
}
