
import React from "react";
import AuthSignIn from "@/components/auth/SignIn";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {redirect} from "next/navigation";

const Signin = async () => {
    const session = await getServerSession(authOptions)
    if(session){
        redirect('/')
    }
    return (
        <AuthSignIn/>
    );
};

export default Signin;
