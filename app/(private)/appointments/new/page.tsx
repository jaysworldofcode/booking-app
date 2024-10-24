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
import AppointmentForm from "../components/appointment_form"

export default function NewAppointment() {
    return (
        <div>
            <ProfileContainer page_name={'products'}>
                <Breadcrumb className="hidden md:flex">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                            <Link href="/appointments">Appointments</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbPage>New Appointment</BreadcrumbPage>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="flex items-center">
                    <h1 className="text-lg font-semibold md:text-2xl">New Appointment</h1>
                </div>
                <AppointmentForm />
            </ProfileContainer>
        </div>
    )
}
