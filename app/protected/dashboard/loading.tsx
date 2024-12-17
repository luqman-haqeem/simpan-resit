export default function Loading() {
    return (
        <main className="flex-1 p-4 overflow-y-auto animate-pulse">
            <div className="rounded-lg border bg-white dark:bg-black border-gray-200 dark:border-gray-600 text-gray-400 shadow-sm mb-6">
                <div className="flex flex-col space-y-1.5 p-6">
                    <div className="h-4 bg-gray-300 dark:bg-gray-900 rounded w-1/4"></div>
                    <div className="flex items-baseline gap-2">
                        <div className="h-6 bg-gray-300 dark:bg-gray-900 rounded w-1/3"></div>
                    </div>
                </div>
                <div className="p-6 pt-0">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <div className="h-4 bg-gray-300 dark:bg-gray-900 rounded w-1/2"></div>
                                <div className="h-3 bg-gray-300 dark:bg-gray-900 rounded w-1/6"></div>
                            </div>
                            <div className="space-y-1">
                                <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
                                <div className="h-3 bg-gray-300 dark:bg-gray-900 rounded w-1/2"></div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <div className="h-4 bg-gray-300 dark:bg-gray-900 rounded w-1/2"></div>
                                <div className="h-3 bg-gray-300 dark:bg-gray-900 rounded w-1/4"></div>
                            </div>
                            <div className="space-y-1">
                                <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
                                <div className="h-3 bg-gray-300 dark:bg-gray-900 rounded w-2/3"></div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <div className="h-4 bg-gray-300 dark:bg-gray-900 rounded w-1/2"></div>
                                <div className="h-3 bg-gray-300 dark:bg-gray-900 rounded w-1/3"></div>
                            </div>
                            <div className="space-y-1">
                                <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
                                <div className="h-3 bg-gray-300 dark:bg-gray-900 rounded w-2/5"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}