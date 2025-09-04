"use server"

import { signIn, signOut } from "@/auth";

export const AuthenticateUser = async (credentials: {useremail:string,userpass:string}) => {
    const { useremail, userpass } = credentials;
    try {
        const redirectUrl = await signIn('credentials', { useremail, userpass, redirect: false });
        return {
            redirectUrl
        }

    } catch (error) {
        console.log(`${error}`, 'Error from AuthenticateUser')
    }
};


export const LogoutUser = async () => {
   const res = await signOut()
   return res
   
}