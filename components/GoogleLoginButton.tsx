"use client";

import { useState } from "react"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { createClient } from '@/utils/supabase/client'

export default function GoogleLoginButton() {
    const supabase = createClient();
    const [isLoading, setIsLoading] = useState(false)


    const handleLogin = async () => {
        setIsLoading(true)

        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${location.origin}/auth/callback`,
            },
        });
        setIsLoading(false)

    };
    return (


        <>
            {/* <Button variant="outline" onClick={handleLogin}>
                <Image src="/google-icon.svg" alt="Google" width={20} height={20} className="mr-2" />
                Login with Google
            </Button> */}


            <Button
                variant="outline"
                onClick={handleLogin}
                disabled={isLoading}
                className="w-full max-w-sm h-12 text-base"
            >
                {isLoading ? (
                    // <Icons.spinner className="mr-2 h-5 w-5 animate-spin" />
                    <p>Loading...</p>
                ) : (
                    <Image src="/google-icon.svg" alt="Gmail" width={20} height={20} className="mr-2" />
                )}
                {isLoading ? "Signing In..." : "Sign In with Gmail"}
            </Button></>
    );
}