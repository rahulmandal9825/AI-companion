import prismadb from "@/lib/prismadb";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(req: Request,{params}:{params:{comanionId: string}} ) {
    
    try {
        const body = await req.json();
        const user = await currentUser();
        const {src, name, description, instructions, seed, categoryId} = body;

        if(!params.comanionId){
            return new NextResponse("CompanionId is required", {status: 400})
        }
        if (!user || !user.id || !user.firstName){
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if ([src, name, description, instructions, seed, categoryId].some((field)=>field?.trim() === "")) {
            return new NextResponse("all field is  required", {status: 400});
        }

        const companion = await prismadb.companion.update({
            where:{
                id: params.comanionId,
                userId: user.id
            },
            data:{
                categoryId,
                userId: user.id,
                userName: user.firstName,
                src,
                name,
                description,
                instructions,
                seed
            }

        }) 
        return NextResponse.json(companion)

    } catch (error) {
        console.error("[COMPANION_PATCH]", error)
        return new NextResponse("Internal Error", {status: 500})
    }
}

export async function DELETE(req: Request,
    {params}: {params:{companionId:string}}
) {
    try {
        const { userId } = auth()
        if(!userId) return new NextResponse("Unauthorized", {status: 401})

            const companion = await prismadb.companion.delete({
                where:{
                    userId,
                    id: params.companionId
                }
            })
            return NextResponse.json(companion);

    } catch (error) {

        console.error("[COMPANION_DELETE]", error)
        return new NextResponse("Internal server error", {status: 500})
        
    }
}