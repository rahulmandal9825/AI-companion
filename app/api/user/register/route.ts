import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { RegisterSchema } from "@/schemas";
import prismadb from "@/lib/prismadb";
import { getUserByEmail } from "@/data/user";

export async function POST(req:Request) {

    const body = await req.json();

    const validatedFields = RegisterSchema.safeParse(body);
    if (!validatedFields) {
        return NextResponse.json({error: "Invalid field!"})
    }
    const {email , password, name} = body;
    const hashpassword = await bcrypt.hash(password, 10)

    const existinguser = await getUserByEmail(email);

    if (existinguser) {
        return NextResponse.json({error:"Email already in use!"})
    }

    await prismadb.user.create({
        data:{
            name,
            email,
            password: hashpassword
        }
    })

    //todo : send verifcation email 




    return NextResponse.json({ success : "Register succusfully "})
}