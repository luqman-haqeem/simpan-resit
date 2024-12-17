
export default function Loading() {
    return (
        <main className="flex-1 p-4 overflow-y-auto animate-pulse">
            <div className="border rounded-md bg-white dark:bg-black shadow-sm">
                <div className="flex flex-col  space-y-1.5 p-6">
                    <div className="tracking-tight mb-4">
                        <div className="h-4  rounded w-[152px] max-w-full"></div>
                    </div>
                    <div className="flex flex-row items-center justify-between gap-4 flex-wrap">
                        <div className="flex items-center gap-2 flex-grow">
                            <div className="flex h-10 items-center justify-between border border-input px-3 py-2 [&amp;>span]:line-clamp-1 w-[100px]">
                                <div className="mr-2 bg-gray-300 dark:bg-gray-700 rounded w-[24px] h-[24px]"></div>
                                <span>
                                    <div className="bg-gray-300 dark:bg-gray-700 rounded w-[32px] max-w-full"></div>
                                </span>
                                <div className="bg-gray-300 dark:bg-gray-700 rounded w-[24px] h-[24px]"></div>
                            </div>
                        </div>
                        <a href="#">
                            <button className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-auto whitespace-nowrap animate-pulse">
                                <div className="rounded-full h-4 w-4 bg-gray-200 dark:bg-gray-700 "></div>
                                <div className="hidden sm:inline bg-gray-200 dark:bg-gray-700  rounded w-24 h-4"></div>
                            </button>
                        </a>
                    </div>
                </div>
                <div className="p-6 pt-0">
                    <div className="h-[calc(100vh-300px)]">
                        <div className="w-full">
                            <div className="border-b">
                                <h3 className="flex">
                                    <div className="flex flex-1 items-center justify-between py-4">
                                        <div className="bg-gray-300 dark:bg-gray-700 rounded w-[360px] max-w-full"></div>
                                        <div className="shrink-0 bg-gray-300 dark:bg-gray-700 rounded w-[24px] h-[24px]"></div>
                                    </div>
                                </h3>
                            </div>
                            <div className="border-b">
                                <h3 className="flex">
                                    <div className="flex flex-1 items-center justify-between py-4">
                                        <div className="bg-gray-300 dark:bg-gray-700 rounded w-[208px] max-w-full"></div>
                                        <div className="shrink-0 bg-gray-300 dark:bg-gray-700 rounded w-[24px] h-[24px]"></div>
                                    </div>
                                </h3>
                            </div>
                            <div className="border-b">
                                <h3 className="flex">
                                    <div className="flex flex-1 items-center justify-between py-4">
                                        <div className="bg-gray-300 dark:bg-gray-700 rounded w-[72px] max-w-full"></div>
                                        <div className="shrink-0 bg-gray-300 dark:bg-gray-700 rounded w-[24px] h-[24px]"></div>
                                    </div>
                                </h3>
                            </div>
                            <div className="border-b">
                                <h3 className="flex">
                                    <div className="flex flex-1 items-center justify-between py-4">
                                        <div className="bg-gray-300 dark:bg-gray-700 rounded w-[232px] max-w-full"></div>
                                        <div className="shrink-0 bg-gray-300 dark:bg-gray-700 rounded w-[24px] h-[24px]"></div>
                                    </div>
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
