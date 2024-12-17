"use client"
import * as React from "react"

import { useState, useEffect, useRef } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getReliefCategories, createReceipt } from "@/app/actions";
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

interface Category {
    id: number
    name: string
    description: string
}
interface ReceiptUploadProps {
    reliefCategories: Category[];
}

export default function ReceiptUploadCard({ reliefCategories }: ReceiptUploadProps) {
    const router = useRouter()

    const [file, setFile] = useState<File | null>(null)
    const [open, setOpen] = React.useState(false)
    const [selectedCategory, setSelectedCategory] = React.useState<Category | null>(null)
    const fileInput = useRef<HTMLInputElement>(null);
    const { toast } = useToast()
    const [loading, setLoading] = useState(false)


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0])
        }
    }

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
            receipt = await createReceipt(formData);
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
                                <Input id="title" name="title" placeholder="Enter receipt name" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="">Amount</Label>
                                <Input id="amount" name="amount" placeholder="Enter receipt amount" type="number" step="0.01" required />
                            </div>

                            <div className="flex flex-col space-y-2">
                                <Label htmlFor="category">Category</Label>
                                {/* <Popover open={open} onOpenChange={setOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={open}
                                        // className="w-[200px] justify-between"
                                        >
                                            {value
                                                ? reliefCategories.find((category) => category.name === value)?.name
                                                : "Select category..."}
                                            <ChevronsUpDown className="opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[200px] p-0">
                                        <Command>
                                            <CommandInput placeholder="Search category..." />
                                            <CommandList>
                                                <CommandEmpty>No category found.</CommandEmpty>
                                                <CommandGroup>
                                                    {reliefCategories.map((category) => (
                                                        <CommandItem
                                                            key={category.id}
                                                            value={category.name}
                                                            onSelect={(currentValue) => {
                                                                setValue(currentValue === value ? "" : currentValue)
                                                                setOpen(false)
                                                            }}
                                                        >
                                                            {category.name}
                                                            <Check
                                                                className={cn(
                                                                    "ml-auto",
                                                                    value === category.name ? "opacity-100" : "opacity-0"
                                                                )}
                                                            />
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover> */}

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
                                <Input id="receiptDate" name="receiptDate" type="date" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="file">Receipt File (Optional)</Label>
                                <Input
                                    id="receipt_file"
                                    type="file"
                                    onChange={handleFileChange}
                                    accept="image/*,.pdf"
                                    ref={fileInput}
                                // required
                                // className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                                />
                                <p className="text-sm text-muted-foreground">
                                    Your message will be copied to the support team.
                                </p>
                            </div>
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                    : 'Upload Receipt'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </main>

        </div >
    )
}