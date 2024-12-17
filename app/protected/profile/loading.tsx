
export default function Loading() {
    return (
        <main className="flex-1 p-4 overflow-y-auto animate-pulse">
            <div className="h-20 bg-white dark:bg-black rounded-lg mb-6">
                <div className="flex flex-col space-y-1.5 p-6 text-wrap animate-pulse">
                    <div className="flex items-center space-x-4  flex-wrap">
                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full hidden sm:block">
                            <div className="flex h-full w-full items-center justify-center rounded-full bg-muted"></div>
                        </div>
                        <div>
                            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                        </div>
                    </div>
                </div>
            </div>
            <form>
                <div className="h-10 bg-red-600 rounded-md mt-2"></div>
            </form>
        </main>
    )
}
