import * as React from "react"
import ProfileContainer from "@/components/custom/profile_container"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { patientFormSchema } from "@/app/form_schema/patient"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import PatientForm from "../components/patient_form"

export default function Patients() {
    return (
        <div>
            <ProfileContainer page_name={'products'}>
                <Breadcrumb className="hidden md:flex">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                            <Link href="#">Patients</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbPage>New Patient</BreadcrumbPage>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="flex items-center">
                    <h1 className="text-lg font-semibold md:text-2xl">New Patient</h1>
                </div>
                <PatientForm />
            </ProfileContainer>
        </div>
    )
}
