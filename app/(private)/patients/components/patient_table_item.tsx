'use client'

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
    File,
    ListFilter,
    MoreHorizontal,
    PlusCircle,
} from "lucide-react"
import capitalizeString from "@/app/utils/capitalize_string"
import { deletePatient } from "@/app/server/actions/patients"
import Link from "next/link"

type Prop = {
    id: string,
    name: string,
    email: string | null,
    contact_number: string | null,
    gender: string | null,
    birthdate: string | null,
    date_created: Date,
    className?: string
}

export default function PatientTableItem(
    {
        id,
        name,
        email,
        contact_number,
        gender,
        birthdate,
        date_created,
        className
    }: Prop) {

    async function onDelete() {
        await deletePatient(id)
    }


return (
    <TableRow>
        <TableCell className="font-medium">
            { capitalizeString(name) }
        </TableCell>
        <TableCell>
            { email }
        </TableCell>
        <TableCell>
            { contact_number }
        </TableCell>
        <TableCell className="hidden md:table-cell">
            { gender?.toUpperCase() }
        </TableCell>
        <TableCell className="hidden md:table-cell">
            { birthdate }
        </TableCell>
        <TableCell className="hidden md:table-cell">
            { date_created.toISOString().slice(0,10).replace(/-/g,"/") }
        </TableCell>
        <TableCell>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <Button
                aria-haspopup="true"
                size="icon"
                variant="ghost"
            >
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
            </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem asChild>
                    <Link href={'/patients/'+id}>
                        Edit
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onDelete}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        </TableCell>
    </TableRow>
  )
}