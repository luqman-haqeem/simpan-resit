"use client"

import { use, useState, useEffect } from "react"
import { getUserReceipts, getPresignedUrl } from "@/app/actions";

import { Bell, Home, Search, User, ChevronRight, CalendarIcon, Upload } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for receipts
// const receipts = [
//     { id: 1, name: "Pharmacy Bill", category: "Healthcare", date: "2023-05-15", amount: 75.50, fileUrl: "/mock-receipt-1.pdf" },
//     { id: 2, name: "Daycare Payment", category: "Dependent Care", date: "2023-05-10", amount: 200.00, fileUrl: "/mock-receipt-2.pdf" },
//     { id: 3, name: "Bus Pass", category: "Transit & Parking", date: "2023-05-01", amount: 60.00, fileUrl: "/mock-receipt-3.pdf" },
//     { id: 4, name: "Doctor Visit", category: "Healthcare", date: "2023-04-28", amount: 150.00, fileUrl: "/mock-receipt-4.pdf" },
//     { id: 5, name: "Parking Fee", category: "Transit & Parking", date: "2023-04-25", amount: 15.00, fileUrl: "/mock-receipt-5.pdf" },
// ]





export default function ViewReceipts() {
    const [selectedReceipt, setSelectedReceipt] = useState(null)
    const [receipts, setReceipts] = useState([])
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString())
    const [loading, setLoading] = useState(false) // New state for loading

    const years = ['2024', '2025'];

    async function handleReceipts() {

        const receipts = await getUserReceipts(selectedYear);
        console.log('receipts', receipts);

        const groupedReceipts = receipts.reduce((acc, receipt) => {
            if (!acc[receipt.relief_categories.name]) {
                acc[receipt.relief_categories.name] = []
            }
            acc[receipt.relief_categories.name].push(receipt)
            return acc
        }, {})
        setReceipts(groupedReceipts);

    }

    useEffect(() => {
        handleReceipts();
    }, [selectedYear]);

    async function handleViewReceipt() {
        setLoading(true); // Set loading state to true when button is clicked

        console.log('create presigned url');

        console.log(selectedReceipt);

        let data = await getPresignedUrl(selectedReceipt?.file_url)

        window.open(data, '_blank');
        setLoading(false); // Set loading state back to false after opening the URL

    }

    return (
        <div className="flex flex-col bg-gray-50">


            <main className="flex-1 p-4 overflow-y-auto">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold mb-4">Tax Relief Receipts</CardTitle>
                        <div className="flex flex-row items-center justify-between gap-4 flex-wrap">
                            <div className="flex items-center gap-2 flex-grow">
                                <Select value={selectedYear} onValueChange={setSelectedYear}>
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
                    </CardHeader>

                    <CardContent>
                        <ScrollArea className="h-[calc(100vh-300px)]">

                            <Accordion type="single" collapsible className="w-full">

                                {Object.entries(receipts).map(([category, categoryReceipts]) => (
                                    <AccordionItem value={category} key={category}>
                                        <AccordionTrigger>{category}</AccordionTrigger>
                                        <AccordionContent>
                                            {categoryReceipts.map((receipt) => (
                                                <Dialog key={receipt.id}>
                                                    <DialogTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            className="w-full justify-start text-left mb-2 hover:bg-gray-100"
                                                            onClick={() => setSelectedReceipt(receipt)}
                                                        >
                                                            <div className="flex items-center justify-between w-full">
                                                                <div>
                                                                    <p className="font-medium">{receipt.title}</p>
                                                                    <p className="text-sm text-muted-foreground">{receipt.receipt_date}</p>
                                                                </div>
                                                                <div className="text-right">
                                                                    <p className="font-medium">RM {receipt.amount.toFixed(2)}</p>
                                                                </div>
                                                            </div>
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>Receipt Details</DialogTitle>
                                                        </DialogHeader>
                                                        <div className="space-y-4">
                                                            <div>
                                                                <h3 className="font-medium">Name</h3>
                                                                <p>{receipt.title}</p>
                                                            </div>
                                                            <div>
                                                                <h3 className="font-medium">Category</h3>
                                                                <p>{receipt.relief_categories.name}</p>
                                                            </div>
                                                            <div>
                                                                <h3 className="font-medium">Date</h3>
                                                                <p>{receipt.receipt_date}</p>
                                                            </div>
                                                            <div>
                                                                <h3 className="font-medium">Amount</h3>
                                                                <p>RM {receipt.amount.toFixed(2)}</p>
                                                            </div>
                                                            <div>
                                                                {receipt.file_url ?
                                                                    <Button onClick={handleViewReceipt} disabled={loading}>
                                                                        {loading ? 'Loading...' : 'View Receipt File'}
                                                                    </Button> :
                                                                    null
                                                                }

                                                            </div>
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>
                                            ))}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </main>



        </div>
    )
}