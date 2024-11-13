"use client"
import { useState } from "react"

import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect } from "react"
import { fetchReliefUtilization, fetchTotalRelief } from "@/app/actions";

interface Category {
    name: string
    used: number
    limit: number
    percentage: number
}
export default function Component() {
    const [categories, setCategories] = useState<Category[]>([])
    const [totalRelief, setTotalRelief] = useState(0)

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
    }, [])


    return (
        <div className="flex flex-col bg-gray-50">

            <main className="flex-1 p-4 overflow-y-auto">
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="text-sm text-muted-foreground">Total Relief</CardTitle>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold">RM{totalRelief.toLocaleString()}</span>
                            {/* <span className="text-sm text-red-500">-5%</span> */}
                        </div>
                    </CardHeader>

                </Card>

                <div className="space-y-6">
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
            </main>

        </div>
    )
}