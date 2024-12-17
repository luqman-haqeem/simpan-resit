import ReceiptList from "@/components/ReceiptList";
import { getUserReceipts } from "@/app/actions"

export default async function ViewReceipts() {

    const currentYear = new Date().getFullYear().toString();

    const receipts = await getUserReceipts(currentYear);

    const groupedReceipts = receipts?.reduce((acc, receipt) => {
        if (!acc[receipt.relief_categories.name]) {
            acc[receipt.relief_categories.name] = []
        }
        acc[receipt.relief_categories.name].push(receipt)
        return acc
    }, {})

    return (
        <div className="flex flex-col ">

            <main className="flex-1 p-4 overflow-y-auto">
                <ReceiptList receipts={groupedReceipts} />


            </main>



        </div>
    )
}