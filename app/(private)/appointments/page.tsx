import ProfileContainer from "@/components/custom/profile_container"
import Link from "next/link"
import {
    File,
    ListFilter,
    PlusCircle,
  } from "lucide-react"
  import { Button } from "@/components/ui/button"
  import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import {  
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { detect_user_not_login } from "@/app/hooks/detect_user_not_login"
import { db } from "@/app/drizzle/db"
import EmptyList from "@/components/custom/empty_list"
import CalendarView from "./components/calendar_view"

export default async function Patients() {
    detect_user_not_login()

    return (
    <div>
        <ProfileContainer page_name={'products'}>
            <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                {
                    await PatientsList()
                }
            </div>
        </ProfileContainer>
    </div>
  )
}

export async function PatientsList(){
    const patients = await db.query.PatientTable.findMany({
        orderBy: ({ createdAt }, { desc }) => desc(createdAt),
    })

    if(patients.length === 0){
        return <EmptyList title="You have no patient" description="Add new patient now to start">
            <Button size="sm" className="h-7 gap-1" asChild>
                <Link href="/patients/new">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Add Product
                    </span>
                </Link>
            </Button>
        </EmptyList>
    }

    return <Tabs defaultValue="calendar">
        <div className="flex items-center">
        <TabsList>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="table">Table</TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
            <Button size="sm" variant="outline" className="h-7 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Export
            </span>
            </Button>
            <Button size="sm" className="h-7 gap-1" asChild>
                <Link href="/patients/new">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Add Appointment
                    </span>
                </Link>
            </Button>
        </div>
        </div>
        <TabsContent value="calendar">
            <div>
                <CalendarView />
            </div>
        </TabsContent>
    </Tabs>
}