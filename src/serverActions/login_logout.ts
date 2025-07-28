"use server"

import { signIn, signOut } from "@/auth";

export const AuthenticateUser = async (formData: FormData) => {
    const { useremail, userpass, viaadmin } = Object.fromEntries(formData);
    try {
        const redirectUrl = await signIn('credentials', { useremail, userpass, viaadmin, redirect: false });
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