import { z } from "zod"

export const appointmentFormSchema = z.object({
  title: z.string().min(1, "Required"),
  description: z.string().min(1, "Required"),
  patientId: z.string().min(1, "Required"),
  startTime: z.string().min(1, "Required"),
  endTime: z.string().min(1, "Required"),
  scheduleDate: z.string().min(1, "Required"),
})
