
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { getUserDetails, signOutAction } from "@/app/actions";
import { Button } from "@/components/ui/button"

export default async function ProfilePage() {

    const userDetails = await getUserDetails()

    const user = {
        name: userDetails?.user_metadata?.name,
        email: userDetails?.email ?? "",
        profileImg: userDetails?.user_metadata?.avatar_url
    }

    return (
        <div className="flex flex-col">

            <main className="flex-1 p-4 overflow-y-auto">
                <Card className="mb-6">
                    <CardHeader className="text-wrap">
                        <div className="flex items-center space-x-4  flex-wrap">
                            <Avatar className="hidden sm:block">
                                <AvatarImage src={user.profileImg} alt="Profile picture" />
                                <AvatarFallback>{user.name.substring(0, 1)}</AvatarFallback>
                            </Avatar>
                            <div >
                                <CardTitle>{user.name}</CardTitle>
                                <p className="text-sm text-muted-foreground">{user.email}</p>
                            </div>
                        </div>
                    </CardHeader>

                </Card>

                <form action={signOutAction}>
                    <Button type="submit" className=" w-full" variant={"destructive"}>
                        Logout
                    </Button>
                </form>

            </main>


        </div >

    )
}