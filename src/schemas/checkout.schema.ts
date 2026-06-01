import * as z from "zod"
export const checkoutSchema= z
.object({
  
  details: z.string().nonempty("details is required"),
  
  phone:z.string()
    .nonempty("phone  is required")
  .regex(/^01[0125][0-9]{8}$/,"invalid phone number"),
  city: z.string().nonempty("city is required"),

})

export type checkoutSchemaType=z.infer<typeof checkoutSchema>
