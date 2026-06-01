import * as zod from "zod"
export const registerSchema= zod
.object({
  name: zod.string("name must be text").nonempty("name is required")
  .min(3,"min length is 3 chars")
  .max(20,"max length is 20 chars"),
email: zod.string("invalid email").nonempty("email is required") ,
 phone: zod.string()
  .nonempty("phone is required")
  .regex(/^01[0125][0-9]{8}$/,"invalid phone number"),
  password:zod.string()
    .nonempty("password  is required")
.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
  `Password must be at least 8 characters long 
   include at least one uppercase letter
  one lowercase letter, and one number`),
  rePassword:zod.string().nonempty("repassowrd is required")

})
.refine(
  (objectValues)=> { 
    return objectValues.password === objectValues.rePassword

  },{
    error :"password and rePassword not matched !",
  path:["rePassword"]
})
export type RegisterType=zod.infer<typeof registerSchema>



















export const LoginSchema= zod
.object({
  
  email: zod.string().email("Invalid email").nonempty("email is required"),
  
  password:zod.string()
    .nonempty("password  is required")
.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
  `Password must be at least 8 characters long 
   include at least one uppercase letter
  one lowercase letter, and one number`),

})

export type LoginType=zod.infer<typeof LoginSchema>