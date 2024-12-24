"use client"
import * as React from "react"

import { useState, useEffect, useRef } from "react"

import { RECEIPT_UPLOAD_SCHEMA } from "@/utils/schema"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getReliefCategories, editReceipt, getPresignedUrl } from "@/app/actions";
import { useRouter } from 'next/navigation'
import { useToast } from "@/hooks/use-toast"
import { Icons } from "@/components/icons"

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { AlertCircle, ExternalLink, Info } from "lucide-react"

interface Category {
    id: number
    name: string
    description: string
}
type Receipt = {
    id: number
    title: string
    amount: number
    year: number
    receipt_date: string
    category_id: number
    file_url: string

}
interface ReceiptUploadProps {
    receiptDetails: Receipt
    reliefCategories: Category[];
}

export default function ReceiptUploadCard({ reliefCategories, receiptDetails }: ReceiptUploadProps) {
    const router = useRouter()

    const [file, setFile] = useState<File | null>(null)
    const [open, setOpen] = React.useState(false)
    const [selectedCategory, setSelectedCategory] = React.useState<Category | null>(null)
    const fileInput = useRef<HTMLInputElement>(null);
    const { toast } = useToast()
    const [loading, setLoading] = useState(false)
    const [receiptLoading, setReceiptLoading] = useState(false)

    useEffect(() => {
        setSelectedCategory(
            reliefCategories.find((priority) => priority.id === receiptDetails.category_id) || null
        )
    }, [])
    async function handleViewReceipt() {
        setReceiptLoading(true);
        let data = await getPresignedUrl(receiptDetails?.file_url ?? '')

        window.open(data, '_blank');
        setReceiptLoading(false);
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const isValid = validateFile(file, RECEIPT_UPLOAD_SCHEMA, "receipt_file");
            if (isValid) { setFile(file) }
            else {
                event.target.value = "";
            };
        }

    }

    const validateFile = (file: File, schema: any, field: string) => {
        const result = schema.safeParse(file);
        if (!result.success) {

            toast({
                variant: "destructive",
                description: result.error.errors[0].message,
            })
            return false;
        } else {

            return true;
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        setLoading(true)
        event.preventDefault()
        // console.log("Form submitted")

        if (!selectedCategory) {
            toast({
                variant: "destructive",
                description: "Please select a category",
            })
            return setLoading(false)

        }

        const formData = new FormData(event.currentTarget)
        formData.append("categoryId", selectedCategory?.id.toString() ?? '');
        formData.append("receiptFile", fileInput?.current?.files?.[0]!);
        // console.log(formData.get("categoryId"));

        let receipt;
        try {
            receipt = await editReceipt(formData);
        } catch (error) {
            console.error("Error creating receipt:", error);
            return toast({
                variant: "destructive",
                description: "Failed to create receipt",
            });


        } finally {
            setLoading(false)
        }

        if (receipt.status == 'success') {
            router.push('/protected/receipts')

        }
        toast({
            variant: receipt?.status == 'success' ? "default" : "destructive",
            description: receipt?.message,
        })

        setLoading(false)

    }

    return (
        <div className="flex flex-col ">

            <main className="flex-1 p-4 overflow-y-auto">
                <Card>
                    <CardHeader>
                        <CardTitle>Receipt Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Receipt Name</Label>
                                <Input id="title" name="title" placeholder="New Phone ..." defaultValue={receiptDetails.title} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="">Amount</Label>
                                <Input id="amount" name="amount" defaultValue={receiptDetails.amount} placeholder="1000" type="number" step="0.01" required />
                            </div>

                            <div className="flex flex-col space-y-2">
                                <Label htmlFor="category">Category</Label>
                                <Drawer open={open} onOpenChange={setOpen}>
                                    <DrawerHeader className="hidden">
                                        <DrawerTitle>Category</DrawerTitle>
                                    </DrawerHeader>

                                    <DrawerTrigger asChild>
                                        <Button variant="outline" className="justify-start">
                                            {selectedCategory ? <>{selectedCategory.name}</> : <>Select category</>}
                                        </Button>
                                    </DrawerTrigger>

                                    <DrawerContent>
                                        <div className="mt-4 border-t">

                                            <Command>
                                                <CommandInput placeholder="Filter categories..." />
                                                <CommandList>
                                                    <CommandEmpty>No results found.</CommandEmpty>
                                                    <CommandGroup>
                                                        {reliefCategories.map((category) => (
                                                            <CommandItem
                                                                key={category.id}
                                                                value={category.name}
                                                                onSelect={(value) => {
                                                                    setSelectedCategory(
                                                                        reliefCategories.find((priority) => priority.name === value) || null
                                                                    )
                                                                    setOpen(false)
                                                                }}
                                                            >
                                                                {category.name}

                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </div>
                                    </DrawerContent>
                                </Drawer>

                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="receiptDate">Date of Purchase (Optional)</Label>
                                <Input id="receiptDate" name="receiptDate" type="date" defaultValue={receiptDetails.receipt_date} />
                            </div>


                            <div className="space-y-2">
                                <div className="grid grid-cols-6  gap-4">
                                    <div className="col-span-4">
                                        <Label htmlFor="file">Upload File <span className="text-sm text-muted-foreground"> Max 5MB</span></Label>
                                        <Input
                                            id="receiptFile"
                                            type="file"
                                            onChange={handleFileChange}
                                            accept="image/*,.pdf"
                                            ref={fileInput}

                                        />
                                    </div>
                                    <div className="col-span-2 content-end">
                                        <Button variant="link" className="col-start-1 col-span-2" onClick={handleViewReceipt} disabled={receiptLoading}>
                                            {receiptLoading ?
                                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                                : <>View Existing Receipt <ExternalLink />
                                                </>}
                                        </Button>
                                        <input type="hidden" name="existingPath" defaultValue={receiptDetails?.file_url} />
                                        <input type="hidden" name="receiptId" defaultValue={receiptDetails?.id} />
                                    </div>

                                </div>
                                <p className="flex flex-row text-sm text-muted-foreground"><Info size={16} />  <span className="px-1">Leave the file field empty if you want to keep the existing file.</span></p>
                            </div>

                            <Button type="submit" className="w-full" disabled={
                                loading
                            }>
                                {loading ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                    : 'Submit Edit'}
                            </Button>
                            <Button variant={"secondary"} className="w-full" onClick={() => router.push('/protected.receipts')}>
                                Go Back
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </main>

        </div >
    )
}