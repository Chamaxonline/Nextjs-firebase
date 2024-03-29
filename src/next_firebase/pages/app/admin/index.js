'use client'
import React from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
function Page() {
    const user  = useAuthContext()
    const router = useRouter()

    React.useEffect(() => {
        console.log('user =',user)
        if (user == null) router.push("/")
    }, [user])

    return (<div className="container"><div className="my-custom-div
    "><h1>Only logged in users can view this page</h1></div></div>);
}

export default Page;