"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import GoogleLoginButton from "@/components/GoogleLoginButton"
import { Receipt } from 'lucide-react'

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleGmailLogin = async () => {
        setIsLoading(true)
        try {
            // Here you would integrate with your Gmail authentication service
            // For demonstration, we'll simulate a login after a short delay
            await new Promise(resolve => setTimeout(resolve, 2000))
            router.push("/dashboard")
        } catch (error) {
            console.error("Login failed:", error)
            // Here you would handle the error, e.g., show an error message to the user
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center px-4 py-8 ">
            <Card className="w-full max-w-md shadow-lg shadow-[0px_0px_500px_-30px_#F77316]">
                <CardHeader className="space-y-4 text-center">
                    <Receipt width={80}
                        height={80}
                        className="mx-auto" />

                    <CardTitle className="text-3xl font-bold">Welcome to SimpanResit</CardTitle>
                    <p className="text-sm text-muted-foreground">
                        Sign in with your Gmail account to manage your tax relief receipts
                    </p>
                </CardHeader>
                <CardContent className="flex flex-col items-center space-y-4">
                    <GoogleLoginButton />
                    {/* <Button
                        variant="outline"
                        onClick={handleGmailLogin}
                        disabled={isLoading}
                        className="w-full max-w-sm h-12 text-base"
                    >
                        {isLoading ? (
                            <Icons.spinner className="mr-2 h-5 w-5 animate-spin" />
                        ) : (
                            <Image src="/gmail-icon.png" alt="Gmail" width={20} height={20} className="mr-2" />
                        )}
                        {isLoading ? "Signing In..." : "Sign In with Gmail"}
                    </Button> */}
                </CardContent>
                {/* <CardFooter className="flex flex-col space-y-4 text-center text-sm text-muted-foreground">
                    <p>
                        By signing in, you agree to our{" "}
                        <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
                            Privacy Policy
                        </Link>
                    </p>
                    <p>
                        Need help?{" "}
                        <Link href="/contact" className="underline underline-offset-4 hover:text-primary">
                            Contact Support
                        </Link>
                    </p>
                </CardFooter> */}
            </Card>

        </div>

    )
}