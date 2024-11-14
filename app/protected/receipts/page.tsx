"use client"

import { useState, useEffect } from "react"
import { getUserReceipts, getPresignedUrl, deleteReceipt } from "@/app/actions";

import { CalendarIcon, Upload, Trash2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Icons } from "@/components/icons"
import { useToast } from "@/hooks/use-toast"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface Receipt {
    id: number;
    title: string;
    receipt_date: string;
    amount: number;
    file_url: string;
    relief_categories: {
        name: string;
    };
}
export default function ViewReceipts() {
    const [selectedReceipt, setSelectedReceipt] = useState<Receipt | null>(null)
    const [receipts, setReceipts] = useState<{ [key: string]: Receipt[] }>({})
    const [hasReceipts, setHasReceipts] = useState(false);

    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString())
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)


    const years = ['2024', '2025'];

    async function handleReceipts() {

        const receipts = await getUserReceipts(selectedYear);
        // console.log('receipts', receipts);

        const groupedReceipts = receipts?.reduce((acc, receipt) => {
            if (!acc[receipt.relief_categories.name]) {
                acc[receipt.relief_categories.name] = []
            }
            acc[receipt.relief_categories.name].push(receipt)
            return acc
        }, {})
        setReceipts(groupedReceipts);
        setHasReceipts(Object.keys(groupedReceipts).length > 0)

    }

    useEffect(() => {
        handleReceipts();
    }, [selectedYear]);

    async function handleViewReceipt() {
        setLoading(true);

        // console.log('create presigned url');
        // console.log(selectedReceipt);

        let data = await getPresignedUrl(selectedReceipt?.file_url ?? '')

        window.open(data, '_blank');
        setLoading(false);
    }

    async function handleDeleteReceipt(id: number) {


        setLoading(true);
        // console.log('id', id);
        const isDeleted = await deleteReceipt(id);
        // console.log('isDeleted', isDeleted);
        setLoading(false);

        if (isDeleted.status == 'success') {
            handleReceipts()
        }

        toast({
            description: isDeleted.message,
        })

    }

    return (
        <div className="flex flex-col ">

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
                            {hasReceipts ? (
                                <Accordion type="single" collapsible className="w-full">

                                    {Object.entries(receipts).map(([category, categoryReceipts]) => (
                                        <AccordionItem value={category} key={category}>
                                            <AccordionTrigger>{category}</AccordionTrigger>
                                            <AccordionContent>
                                                {categoryReceipts.map((receipt: Receipt) => (
                                                    <Dialog key={receipt.id} >
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
                                                                {/* <div className="grid grid-cols-4 gap-4">

                                                                    <Button variant="outline" onClick={() => handleDeleteReceipt(receipt.id)} className=" border border-transparent col-end-5 text-red-500 hover:bg-red-600" disabled={loading}>
                                                                        {loading ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                                                            : <Trash2 />}
                                                                    </Button>

                                                                </div> */}
                                                            </div>
                                                            <DialogFooter className="grid grid-cols-4 gap-4">

                                                                {receipt.file_url ?
                                                                    <Button className="col-start-1 col-span-2" onClick={handleViewReceipt} disabled={loading}>
                                                                        {loading ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                                                            : 'View Receipt File'}
                                                                    </Button> :
                                                                    null
                                                                }
                                                                <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                                                                    <AlertDialogTrigger asChild>
                                                                        <Button variant="destructive" className="col-end-5">
                                                                            <Trash2 className="mr-2 h-4 w-4" />

                                                                        </Button>
                                                                    </AlertDialogTrigger>
                                                                    <AlertDialogContent>
                                                                        <AlertDialogHeader>
                                                                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                                            <AlertDialogDescription>
                                                                                This action cannot be undone. This will permanently delete the receipt.
                                                                            </AlertDialogDescription>
                                                                        </AlertDialogHeader>
                                                                        <AlertDialogFooter>
                                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                            <AlertDialogAction onClick={() => handleDeleteReceipt(receipt.id)} >Delete</AlertDialogAction>
                                                                        </AlertDialogFooter>
                                                                    </AlertDialogContent>
                                                                </AlertDialog>

                                                            </DialogFooter>
                                                        </DialogContent>
                                                    </Dialog>
                                                ))}
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            ) : (<div className="text-center py-8">
                                <p className="text-lg text-muted-foreground mb-4">No receipts yet. Add your first receipt now!</p>
                                <Link href="/protected/receipts/upload">
                                    <Button className="w-auto whitespace-nowrap">
                                        <Upload className="mr-2 h-4 w-4" />
                                        Upload Receipt
                                    </Button>
                                </Link>
                            </div>)}

                        </ScrollArea>
                    </CardContent>
                </Card>
            </main>



        </div>
    )
}