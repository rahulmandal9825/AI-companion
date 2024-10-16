import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
    const body = await req.json();

    const validatedFields = LoginSchema.safeParse(body);

    if (!validatedFields) {
        return NextResponse.json({error: "Invalid field!"})
    }
    
    const { email, password} = body;

    try {
         await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        })
    

        
        return NextResponse.json({ success : "login succusfully "})
    } catch (error) {
        if (error instanceof AuthError) {
            switch(error.type){
                case "CredentialsSignin":
                    return {error: "Invalid credentails"}
                default:
                    return {error: "somethind went wrong "}
            }
        }
        throw error;
    }
    


    
}