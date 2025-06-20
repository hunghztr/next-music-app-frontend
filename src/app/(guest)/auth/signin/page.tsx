import React from "react";
import AuthSignIn from "@/components/auth/SignIn";
import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";
import authOptions from "@/utils/authOptions";

const Signin = async () => {
    const session = await getServerSession(authOptions)
    if (session) redirect('/')
    return <AuthSignIn/>;
};
export default Signin;
