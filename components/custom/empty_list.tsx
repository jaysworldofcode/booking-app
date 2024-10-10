import { Button } from "@/components/ui/button"

export default function EmptyList({
    title,
    description,
    children
}: Readonly<{
    title: string,
    description: string,
    children: React.ReactNode;
}>) {
    return <div
            className="flex flex-1 items-center min-h-96 justify-center rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1"
        >
            <div className="flex flex-col items-center gap-3 text-center">
            <h3 className="text-2xl font-bold gap-3 tracking-tight">
                { title }
            </h3>
            <p className="text-sm gap-3 text-muted-foreground">
                { description }
            </p>
            { children }
        </div>
    </div>
}