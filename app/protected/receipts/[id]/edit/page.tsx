
import { getReliefCategories, getReceiptDetails } from "@/app/actions";
import EditReceiptCard from "@/components/EditReceiptCard"
import { redirect } from "next/navigation";
import { Suspense } from 'react'

export default async function EditPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const id = (await params).id

    const reliefCategories = await getReliefCategories() ?? [];

    const receiptDetails = await getReceiptDetails(id);

    if (!receiptDetails) {
        redirect('/protected/receipts/')
    }

    return (
        <div className="flex flex-col ">

            <main className="flex-1 p-4 overflow-y-auto">
                <Suspense>
                    <EditReceiptCard reliefCategories={reliefCategories} receiptDetails={receiptDetails} />
                </Suspense>
            </main>

        </div >
    )
}