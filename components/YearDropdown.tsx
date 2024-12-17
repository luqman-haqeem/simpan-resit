
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Link, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function YearDropdown({ currentYear, onYearChange }: { currentYear: string, onYearChange: (year: string) => void }) {

    const years = ['2024', '2025'];

    return (
        <div className="flex flex-row items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2 flex-grow">
                <Select value={currentYear} onValueChange={onYearChange}>
                    <SelectTrigger className="w-[100px]">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                        {years.map((year) => (
                            <SelectItem key={year} value={year}>
                                {year}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <Link href="/protected/receipts/upload">
                <Button className="w-auto whitespace-nowrap">
                    <Upload className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">Upload Receipt</span>
                </Button>
            </Link>
        </div>
    )
}