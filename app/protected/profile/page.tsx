"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { updatePersonalInfo, signOutAction, getUserDetails } from "@/app/actions";

export default function ProfilePage() {
    const [formData, setFormData] = useState<{
        gender: string;
        isGovernmentServant: string;
        isDisabled: string;
        maritalStatus: string;
        isSpouseWorking: string;
        isSpouseDisabled: string;
        numberOfChildren: string;
        children: {
            age: string;
            isDisabled: boolean;
            isStudying: boolean;
            fullClaim: boolean;
        }[];
    }>({
        gender: "M",
        isGovernmentServant: "no",
        isDisabled: "no",
        maritalStatus: "S",
        isSpouseWorking: "no",
        isSpouseDisabled: "no",
        numberOfChildren: "0",
        children: [],
    })
    const [user, setUser] = useState({
        name: "",
        email: "",
        profileImg: "",
    })


    useEffect(() => {
        const fetchUserDetails = async () => {
            const userDetails = await getUserDetails()

            setUser({
                name: userDetails?.user_metadata?.name,
                email: userDetails?.email ?? "",
                profileImg: userDetails?.user_metadata?.avatar_url
            })
            // setUser(userDetails)
        }
        fetchUserDetails()
    }, [])

    const handleChildrenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value) || 0
        setFormData(prev => ({
            ...prev,
            numberOfChildren: e.target.value,
            children: Array(value).fill({}).map((_, i) => prev.children[i] || {
                age: "0",
                isDisabled: false,
                isStudying: false,
                fullClaim: false
            })
        }))
    }

    const updateChild = (index: number, field: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            children: prev.children.map((child, i) =>
                i === index ? { ...child, [field]: value } : child
            )
        }))
    }


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        // console.log("Form submitted", formData)
        // Disabld  Form submission
        // const updateInfo = await updatePersonalInfo(formData)
        // console.log("updateInfo", updateInfo);

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

                {/* Hide this card for now */}
                <Card className="hidden">
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <form onSubmit={handleSubmit} className="space-y-4">

                            <div className="space-y-2">

                                <Label>Gender</Label>
                                <RadioGroup
                                    value={formData.gender}
                                    onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}
                                    className="flex flex-col space-y-1"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="M" id="male" />
                                        <Label htmlFor="male">Male</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="F" id="female" />
                                        <Label htmlFor="female">Female</Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            <div className="space-y-2">
                                <Label>Are you a government servant?</Label>
                                <RadioGroup
                                    value={formData.isGovernmentServant}
                                    onValueChange={(value) => setFormData(prev => ({ ...prev, isGovernmentServant: value }))}
                                    className="flex flex-col space-y-1"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="yes" id="gov-yes" />
                                        <Label htmlFor="gov-yes">Yes</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="no" id="gov-no" />
                                        <Label htmlFor="gov-no">No</Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            <div className="space-y-2">
                                <Label>Are you a disabled person?</Label>
                                <RadioGroup
                                    value={formData.isDisabled}
                                    onValueChange={(value) => setFormData(prev => ({ ...prev, isDisabled: value }))}
                                    className="flex flex-col space-y-1"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="yes" id="disabled-yes" />
                                        <Label htmlFor="disabled-yes">Yes</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="no" id="disabled-no" />
                                        <Label htmlFor="disabled-no">No</Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            <div className="space-y-2">
                                <Label>Marital Status</Label>
                                <RadioGroup
                                    value={formData.maritalStatus}
                                    onValueChange={(value) => setFormData(prev => ({ ...prev, maritalStatus: value }))}
                                    className="flex flex-col space-y-1"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="S" id="single" />
                                        <Label htmlFor="single">Single</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="M" id="married" />
                                        <Label htmlFor="married">Married</Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            {formData.maritalStatus === "M" && (
                                <>
                                    <div className="space-y-2">
                                        <Label>Is spouse working?</Label>
                                        <RadioGroup
                                            value={formData.isSpouseWorking}
                                            onValueChange={(value) => setFormData(prev => ({ ...prev, isSpouseWorking: value }))}
                                            className="flex flex-col space-y-1"
                                        >
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="yes" id="spouse-working-yes" />
                                                <Label htmlFor="spouse-working-yes">Yes</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="no" id="spouse-working-no" />
                                                <Label htmlFor="spouse-working-no">No</Label>
                                            </div>
                                        </RadioGroup>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Is spouse disabled?</Label>
                                        <RadioGroup
                                            value={formData.isSpouseDisabled}
                                            onValueChange={(value) => setFormData(prev => ({ ...prev, isSpouseDisabled: value }))}
                                            className="flex flex-col space-y-1"
                                        >
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="yes" id="spouse-disabled-yes" />
                                                <Label htmlFor="spouse-disabled-yes">Yes</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="no" id="spouse-disabled-no" />
                                                <Label htmlFor="spouse-disabled-no">No</Label>
                                            </div>
                                        </RadioGroup>
                                    </div>
                                </>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="numberOfChildren">Number of Children</Label>
                                <Input
                                    id="numberOfChildren"
                                    type="number"
                                    min="0"
                                    value={formData.numberOfChildren}
                                    onChange={handleChildrenChange}
                                    className="max-w-[100px]"
                                />

                            </div>

                            {formData.children.map((child, index) => (
                                <Card key={index} className="p-4">
                                    <CardTitle className="text-lg mb-4">Child {index + 1}</CardTitle>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor={`child-${index}-age`}>Age</Label>
                                            <Input
                                                id={`child-${index}-age`}
                                                type="number"
                                                min="0"
                                                value={child.age}
                                                onChange={(e) => updateChild(index, 'age', e.target.value)}
                                                className="max-w-[100px]"
                                            />
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`child-${index}-studying`}
                                                checked={child.isStudying}
                                                onCheckedChange={(checked) => updateChild(index, 'isStudying', checked)}
                                            />
                                            <Label htmlFor={`child-${index}-studying`}>Still Studying</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`child-${index}-disabled`}
                                                checked={child.isDisabled}
                                                onCheckedChange={(checked) => updateChild(index, 'isDisabled', checked)}
                                            />
                                            <Label htmlFor={`child-${index}-disabled`}>Disabled</Label>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`child-${index}-claim`}
                                                checked={child.fullClaim}
                                                onCheckedChange={(checked) => updateChild(index, 'fullClaim', checked)}
                                            />
                                            <Label htmlFor={`child-${index}-claim`}>Full Claim</Label>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                            <Button type="submit" className="w-full">Save Changes</Button>

                        </form>

                    </CardContent>
                </Card>
                <form action={signOutAction}>
                    <Button type="submit" className="mt-5 w-full" variant={"destructive"}>
                        Logout
                    </Button>
                </form>
            </main>


        </div >
    )
}