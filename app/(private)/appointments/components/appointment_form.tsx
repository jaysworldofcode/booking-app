'use client'

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { appointmentFormSchema } from "@/app/form_schema/appointments"
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
import { DatetimePicker } from '@/components/ui/datetime-picker';
import { Label } from '@/components/ui/label';

export default function AppointmentForm({
    appointment
}:{
    appointment?: {
        title: string;
        description: string;
        patientId: string;
        startTime: string;
        endTime: string;
        scheduleDate: string;
    }
}) {
    const [scheduleDate, setSchedulateDate] = React.useState<Date>(appointment?.scheduleDate ? new Date(appointment.scheduleDate) : new Date())
    const [scheduleStartTime, setScheduleStartTime] = React.useState<Date>(appointment?.startTime ? new Date(appointment.startTime) : new Date())

    const form = useForm<z.infer<typeof appointmentFormSchema>>({
        resolver: zodResolver(appointmentFormSchema),
        defaultValues: {
            title: appointment?.title ?? '',
            description: appointment?.description ?? '',
            patientId: appointment?.patientId ?? '',
            startTime: appointment?.startTime ?? '',
            endTime: appointment?.endTime ?? '',
            scheduleDate: appointment?.scheduleDate ?? ''
        },
    })

    async function onSubmit(values: z.infer<typeof appointmentFormSchema>) {
        // const action = patient == null ? createPatient : updatePatient.bind(null, patient.id)
        // const data = await action(values)
      
        // if (data?.error) {
        //   form.setError("root", {
        //     message: "There was an error saving your event",
        //   })
        // }
    }

return (
    <Form {...form}>
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-4"
        >
            {form.formState.errors.root && (
            <div className="text-destructive text-sm">
                {form.formState.errors.root.message}
            </div>
            )}
            <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Title</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            />
            <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="scheduleDate"
                render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                        <FormLabel>Schedule Date</FormLabel>
                        <FormControl>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                        "w-100 justify-start text-left font-normal",
                                        !scheduleDate && "text-muted-foreground",
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {scheduleDate ? format(scheduleDate, "PPP HH:mm") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-4">
                                    <DatetimePicker selected={scheduleDate} setDate={(value) => {
                                        console.log(value)
                                        setSchedulateDate(value)
                                    }} initialFocus />
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
