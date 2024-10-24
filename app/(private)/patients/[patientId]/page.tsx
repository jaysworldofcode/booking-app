import * as React from "react"
import ProfileContainer from "@/components/custom/profile_container"
import Link from "next/link"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import PatientForm from "../components/patient_form"
import { detect_user_not_login } from "@/app/hooks/detect_user_not_login"
import { db } from "@/app/drizzle/db"
import { notFound } from "next/navigation"
import { PatientTable } from "@/app/drizzle/schema"
import { eq } from 'drizzle-orm';

export default async function UpdatePatient({
    params: { patientId },
  }: {
    params: {
        patientId: string
    }
  }) {
    // verify is user is logged in
    detect_user_not_login()

    // get patient details
    const patient = await db.query.PatientTable.findFirst({
      where: eq(PatientTable.id, patientId)
    })
  
    if (patient == null) return notFound()

    return (
        <div>
            <ProfileContainer page_name={'products'}>
                <Breadcrumb className="hidden md:flex">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                            <Link href="/patients">Patients</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbPage>Update Patient</BreadcrumbPage>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="flex items-center">
                    <h1 className="text-lg font-semibold md:text-2xl">Update Patient</h1>
                </div>
                <PatientForm patient={patient} />
            </ProfileContainer>
        </div>
    )
}
