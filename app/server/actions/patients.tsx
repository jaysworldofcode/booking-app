"use server"

import { db } from "@/app/drizzle/db"
import { patientFormSchema } from "@/app/form_schema/patient";
import { PatientTable } from "@/app/drizzle/schema";
import { z } from "zod"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { eq } from 'drizzle-orm';

export async function createPatient(
    unsafeData: z.infer<typeof patientFormSchema>
  ): Promise<{ error: boolean } | undefined> {
    const { userId } = auth()
    const { success, data } = patientFormSchema.safeParse(unsafeData)
  
    if (!success || userId == null) {
      return { error: true }
    }
  
    await db.insert(PatientTable).values({ ...data, clerkUserId: userId })
  
    redirect("/patients")
}

export async function deletePatient(
    id: string
  ): Promise<{ error: boolean } | undefined> {
    const { userId } = auth()
  
    if (userId == null) {
      return { error: true }
    }
  
    const { rowCount } = await db
      .delete(PatientTable)
      .where(eq(PatientTable.id, id))
  
    if (rowCount === 0) {
      return { error: true }
    }
  
    redirect("/patients")
  }
  