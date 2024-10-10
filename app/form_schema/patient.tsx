import { z } from "zod"

export const patientFormSchema = z.object({
  firstname: z.string().min(1, "Required"),
  lastname: z.string().min(1, "Required"),
  email: z
    .string()
    .min(1, "Required")
    .email("This is not a valid email."),
  contact_number: z.string().optional(),
  gender: z.string().optional(),
  birthdate: z.string().optional()
})
