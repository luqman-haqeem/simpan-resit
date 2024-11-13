"use client"
import { useState } from "react"

import { Bell, Home, Search, User } from "lucide-react"
import Link from "next/link"
// import { LineChart } from "@/components/ui/line-chart"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
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
    // const categories = [
    //     {
    //         name: "Healthcare",
    //         used: 3200,
    //         limit: 4000,
    //         percentage: 80,
    //     },
    //     {
    //         name: "Dependent Care",
    //         used: 2500,
    //         limit: 5000,
    //         percentage: 50,
    //     },
    //     {
    //         name: "Transit & Parking",
    //         used: 1300,
    //         limit: 2700,
    //         percentage: 48,
    //     },
    // ]
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


    const months = ["Jan", "Feb", "Mar", "Apr", "May"]
    const data = [4200, 3100, 3800, 5500, 4100]

    return (
        <div className="flex flex-col bg-gray-50 sticky bottom-0">

            <main className="flex-1 p-4 overflow-y-auto">
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="text-sm text-muted-foreground">Total Relief</CardTitle>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold">RM{totalRelief.toLocaleString()}</span>
                            {/* <span className="text-sm text-red-500">-5%</span> */}
                        </div>
                    </CardHeader>
                    {/* <CardContent>
                        <div className="h-[200px]"> 
                            <LineChart
                                data={{
                                    labels: months,
                                    datasets: [
                                        {
                                            data: data,
                                            fill: false,
                                            borderColor: "rgb(59, 130, 246)",
                                            tension: 0.4,
                                        },
                                    ],
                                }}
                            />
                        </div>
                    </CardContent> */}
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