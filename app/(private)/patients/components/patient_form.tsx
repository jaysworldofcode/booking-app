'use client'

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { patientFormSchema } from "@/app/form_schema/patient"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { createPatient, updatePatient } from "@/app/server/actions/patients"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
  
export default function PatientForm({
    patient
}:{
    patient?: {
        id: string;
        firstname: string;
        lastname: string;
        email: string | null;
        contact_number: string | null;
        birthdate: string | null;
        gender: string | null;
        clerkUserId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }
}) {
    const [date, setDate] = React.useState<Date>(patient?.birthdate ? new Date(patient.birthdate) : new Date())

    const form = useForm<z.infer<typeof patientFormSchema>>({
        resolver: zodResolver(patientFormSchema),
        defaultValues: {
            firstname: patient?.firstname ?? '',
            lastname: patient?.lastname ?? '',
            email: patient?.email ?? '',
            contact_number: patient?.contact_number ?? '',
            birthdate: patient?.birthdate ?? '',
            gender: patient?.gender ?? ''
        },
    })

    async function onSubmit(values: z.infer<typeof patientFormSchema>) {
        const action = patient == null ? createPatient : updatePatient.bind(null, patient.id)
        const data = await action(values)
      
        if (data?.error) {
          form.setError("root", {
            message: "There was an error saving your event",
          })
        }
    }

return (
    <Form {...form}>
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-3"
        >
            {form.formState.errors.root && (
            <div className="text-destructive text-sm">
                {form.formState.errors.root.message}
            </div>
            )}
            <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Firstname</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            />
            <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Lastname</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="contact_number"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Contact Number</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                    <FormItem className="flex flex-col gap-3">
                        <FormLabel>Gender</FormLabel>
                        <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger className="w-100">
                                <SelectValue placeholder="Gender" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                <SelectLabel>Gender</SelectLabel>
                                <SelectItem value="m">Male</SelectItem>
                                <SelectItem value="f">female</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="birthdate"
                render={({ field }) => (
                    <FormItem className="flex flex-col gap-3">
                        <FormLabel>Birthday</FormLabel>
                        <FormControl>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-100 justify-start text-left font-normal",
                                            !date && "text-muted-foreground"
                                        )}
                                    >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                    mode="single"
                                    selected={date}
                                    onDayClick={(value) => {
                                        field.onChange(value.toDateString())
                                        setDate(value)
                                    }}
                                    initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <div className="col-span-2 flex gap-4 justify-end mt-4">
                <Button
                    disabled={form.formState.isSubmitting}
                    type="button"
                    asChild
                    variant="outline"
                >
                    <Link href="/events">Cancel</Link>
                </Button>
                <Button
                    disabled={form.formState.isSubmitting}
                    type="submit"
                >
                    Save
                </Button>
            </div>
        </form>
    </Form>
  )
}
