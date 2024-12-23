import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Receipt, PieChart, TabletSmartphone, Shield } from 'lucide-react'
import { ThemeSwitcher } from "@/components/theme-switcher";
import { BentoDemo } from "@/components/bento-grid";
import Image from "next/image"
import Iphone15Pro from "@/components/ui/iphone-15-pro";

export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-14 max-w-screen-xl items-center">
                    <Link href="/" className="flex items-center space-x-2">
                        <Receipt className="h-6 w-6" />
                        <span className="font-bold">SimpanResit</span>
                    </Link>
                    <nav className="ml-auto flex gap-4 place-items-center sm:gap-6">
                        <ThemeSwitcher />

                        <Link href="#features" className="text-sm  font-medium hidden md:block hover:underline">
                            Features
                        </Link>
                        <Link href="#how-it-works" className="text-sm font-medium hidden md:block hover:underline">
                            How It Works
                        </Link>
                        <Link href="/login" className="text-sm font-medium hover:underline">
                            Login
                        </Link>
                    </nav>
                </div>
            </header>

            <main className="flex-1">
                {/* <section className="px-4 py-12 md:py-24 lg:py-32 xl:py-48">
                    <div className="container flex flex-col items-center space-y-4 text-center">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                            Easily Manage Your Tax Receipts in One Place
                        </h1>
                        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                            SimpanResit simplifies receipt management for tax relief claims. Secure, easy-to-use, and designed for individual taxpayers.
                        </p>
                        <Button asChild className="mt-4">
                            <Link href="/login">
                                Get Started <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </section> */}
                <section className="w-full py-12 md:py-32 ">
                    <div className="container px-4 md:px-6">
                        <div className="grid gap-6 md:grid-cols-[1fr_200px]  lg:grid-cols-[1fr_200px] lg:gap-12 xl:grid-cols-[1fr_400px]">
                            <div className="flex flex-col justify-center space-y-4">
                                <div className="space-y-2">
                                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                        Easily Manage Your Receipts in One Place
                                    </h1>
                                    <p className="max-w-[600px] text-muted-foreground md:text-xl">
                                        SimpanResit simplifies receipt management for tax relief claims. Secure, easy-to-use, and designed for individual taxpayers.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                    <Button asChild size="lg">
                                        <Link href="/login">
                                            Get Started <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>

                                    </Button>
                                    {/* <Button variant="outline" size="lg">
                                        Learn More
                                    </Button> */}
                                </div>
                            </div>
                            <div className="relative ">
                                <Iphone15Pro
                                    className="size-full shadow-lg rounded-[50px] md:rounded-[35px] lg:rounded-[70px] shadow-[0px_0px_100px_0px_rgba(249,_115,_22,_0.5)]"
                                    src="/dashboard2.png"
                                />
                                {/* <div className="absolute bottom-0 left-0 w-full h-20 md:h-28 bg-gradient-to-b from-background/0 via-background/50 to-background rounded-lg"></div> */}

                            </div>
                            {/* <Image
                                src="/placeholder.svg?height=400&width=400"
                                width={400}
                                height={400}
                                alt="SimpanResit App Interface"
                                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                            /> */}
                        </div>
                    </div>
                </section>


                <section id="features" className="bg-gray-100 dark:bg-gray-800 py-12 md:py-24">
                    <div className="container">
                        <h2 className="text-2xl font-bold text-center mb-12">Key Features</h2>
                        <BentoDemo />

                        {/* <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            {[
                                {
                                    title: "Easy Receipt Upload",
                                    description: "Quickly upload and categorize your receipts",
                                    icon: Receipt,
                                },
                                {
                                    title: "Tax Relief Tracking",
                                    description: "Monitor your tax relief claims in real-time",
                                    icon: PieChart,
                                },
                                {
                                    title: "Mobile-First Design",
                                    description: "Mobile-first approach, manage receipts seamlessly on any device, wherever you are.",
                                    icon: TabletSmartphone,
                                },
                                {
                                    title: "Secure Storage",
                                    description: "Your data is encrypted and securely stored",
                                    icon: Shield,
                                },
                            ].map((feature, index) => (
                                <Card key={index}>
                                    <CardHeader>
                                        <feature.icon className="h-8 w-8 mb-2" />
                                        <CardTitle>{feature.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p>{feature.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div> */}
                    </div>
                </section>

                <section id="how-it-works" className="py-12 md:py-24">
                    <div className="container">
                        <h2 className="text-2xl font-bold text-center mb-12">How It Works</h2>

                        <div className="grid gap-6 md:grid-cols-3">
                            {[
                                {
                                    step: "1",
                                    title: "Upload Receipts",
                                    description: "Snap a photo or upload digital receipts to the app",
                                },

                                {
                                    step: "2",
                                    title: "Track & Claim",
                                    description: "Monitor your tax relief and easily submit claims",
                                },
                                {
                                    step: "3",
                                    title: "Categorize Expense",
                                    description: "Organize each receipt by category for easy sorting and retrieval.",
                                },
                            ].map((step, index) => (
                                <Card key={index}>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                                {step.step}
                                            </span>
                                            {step.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p>{step.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-primary dark:bg-primary text-primary-foreground py-12 md:py-24">
                    <div className="container text-center">
                        <h2 className="text-2xl font-bold mb-4">Ready to simplify your tax relief management?</h2>
                        {/* <p className="mb-8">Join thousands of users who are saving time and maximizing their tax relief with SimpanResit.</p> */}
                        <Button asChild variant="secondary">
                            <Link href="/login">
                                Sign Up Now <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </section>
            </main>

            <footer className="border-t py-6 md:py-0">
                <div className="container flex flex-col gap-4 md:h-24 md:flex-row md:items-center md:justify-between">
                    <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                        © 2024 SimpanResit. All rights reserved.
                    </p>
                    {/* <nav className="flex items-center justify-center gap-4 md:justify-end">
                        <Link href="/privacy" className="text-sm font-medium hover:underline">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="text-sm font-medium hover:underline">
                            Terms of Service
                        </Link>
                        <Link href="/contact" className="text-sm font-medium hover:underline">
                            Contact Us
                        </Link>
                    </nav> */}
                </div>
            </footer>
        </div>
    )
}