
import { getReliefCategories } from "@/app/actions";
import ReceiptUploadCard from "@/components/ReceiptUploadCard"
import { Suspense } from 'react'

export default async function ReceiptUploadPage() {
    const reliefCategories = await getReliefCategories() ?? [];

    // console.log(reliefCategories);

    return (
        <div className="flex flex-col ">

            <main className="flex-1 p-4 overflow-y-auto">
                <Suspense>
                    <ReceiptUploadCard reliefCategories={reliefCategories} />
                </Suspense>
            </main>

        </div >
    )
}