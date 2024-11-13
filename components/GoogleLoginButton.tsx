"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { createClient } from '@/utils/supabase/client'

export default function GoogleLoginButton() {
    const supabase = createClient();

    const handleLogin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${location.origin}/auth/callback`,
            },
        });
    };
    return (
        <Button variant="outline" onClick={handleLogin}>
            <Image src="/google-icon.svg" alt="Google" width={20} height={20} className="mr-2" />
            Login with Google
        </Button>
    );
}