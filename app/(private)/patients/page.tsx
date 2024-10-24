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
import PatientTableItem from "./components/patient_table_item"
import EmptyList from "@/components/custom/empty_list"

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

    return <Tabs defaultValue="all">
        <div className="flex items-center">
        <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
            <TabsTrigger value="archived" className="hidden sm:flex">
                Archived
            </TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-7 gap-1">
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Filter
                </span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                Active
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>
                Archived
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
            </DropdownMenu>
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
                        Add Product
                    </span>
                </Link>
            </Button>
        </div>
        </div>
        <TabsContent value="all">
        <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
            <CardTitle>Patients</CardTitle>
            {/* <CardDescription>
                Manage your patients.
            </CardDescription> */}
            </CardHeader>
            <CardContent>
            <Table>
                <TableHeader>
                <TableRow>
                    {/* <TableHead className="hidden w-[100px] sm:table-cell">
                    <span className="sr-only">Image</span>
                    </TableHead> */}
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Contact Number</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Birthdate</TableHead>
                    <TableHead className="hidden md:table-cell">
                        Date Added
                    </TableHead>
                    <TableHead>
                    <span className="sr-only">Actions</span>
                    </TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                    {patients.map(patient => (
                        <PatientTableItem
                            id={patient.id}
                            name={patient.firstname+' '+patient.lastname}
                            email={patient.email}
                            contact_number={patient.contact_number}
                            gender={patient.gender}
                            birthdate={patient.birthdate}
                            date_created={patient.createdAt}
                        />
                    ))}
                </TableBody>
            </Table>
            </CardContent>
            <CardFooter>
            <div className="text-xs text-muted-foreground">
                Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                products
            </div>
            </CardFooter>
        </Card>
        </TabsContent>
    </Tabs>
}