"use client"
import { useState } from "react"

import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect } from "react"
import { fetchReliefUtilization, fetchTotalRelief } from "@/app/actions";
import { Skeleton } from "@/components/ui/skeleton"

interface Category {
    name: string
    used: number
    limit: number
    percentage: number
}
export default function Component() {
    const [categories, setCategories] = useState<Category[]>([])
    const [totalRelief, setTotalRelief] = useState(0)
    const [loading, setLoading] = useState(true)
    useEffect(() => {

        async function getReliefUtilization() {
            const category = await fetchReliefUtilization()
            // console.log('category', category);

            setCategories(category ?? [])
        }
        async function getTotalRelief() {
            const totalRelief = await fetchTotalRelief()
            // console.log('totalRelief', setTotalRelief);

            setTotalRelief(totalRelief ?? 0)
        }

        getTotalRelief()
        getReliefUtilization()
        setLoading(false);

    }, [])


    return (
        <div className="flex flex-col">

            <main className="flex-1 p-4 overflow-y-auto">
                <Card className="mb-6">
                    <CardHeader>

                        {loading ?
                            <>
                                <div className="">
                                    <Skeleton className="w-[96px] h-6 max-w-full" />
                                </div>
                                <div className="flex items-baseline gap-2 pt-3">
                                    <span>
                                        <Skeleton className="w-[120px] h-6 max-w-full" />
                                    </span>
                                </div>
                            </> :
                            <>
                                <CardTitle className="text-sm text-muted-foreground">Total Relief</CardTitle>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-bold">RM{totalRelief.toLocaleString()}
                                    </span>
                                </div>

                            </>


                        }

                    </CardHeader>
                    <CardContent>
                        {loading ?
                            <>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span>
                                                <Skeleton className="w-[40px] h-6 max-w-full" />
                                            </span>
                                            <span>
                                                <Skeleton className="w-[48px] h-6 max-w-full" />
                                            </span>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="relative h-4 w-full">
                                                <div className="h-full w-full flex-1"></div>
                                            </div>
                                            <div>
                                                <Skeleton className="w-[144px] h-6 max-w-full" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span>
                                                <Skeleton className="w-[208px] h-6 max-w-full" />
                                            </span>
                                            <span>
                                                <Skeleton className="w-[56px] h-6 max-w-full" />
                                            </span>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="relative h-4 w-full">
                                                <div className="h-full w-full flex-1"></div>
                                            </div>
                                            <div>
                                                <Skeleton className="w-[152px] h-6 max-w-full" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span>
                                                <Skeleton className="w-[360px] h-6 max-w-full" />
                                            </span>
                                            <span>
                                                <Skeleton className="w-[48px] h-6 max-w-full" />
                                            </span>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="relative h-4 w-full">
                                                <div className="h-full w-full flex-1"></div>
                                            </div>
                                            <div>
                                                <Skeleton className="w-[176px] h-6 max-w-full" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </> : <div className="space-y-6">
                                {categories.map((category) => (
                                    <div key={category.name} className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="font-medium">{category.name}</span>
                                            <span style={{ color: category.percentage > 100 ? 'red' : 'inherit' }}>{category.percentage.toFixed(2)} %</span>
                                        </div>
                                        <div className="space-y-1">
                                            <Progress value={category.percentage} aria-label={`${category.name} usage`} />
                                            <div className="text-sm text-muted-foreground">
                                                Used RM{category.used.toLocaleString()} of RM{category.limit.toLocaleString()}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        }

                    </CardContent>
                </Card>




            </main>

        </div>
    )
}