

import { auth } from "@clerk/nextjs/server";
import prismadb from "./prismadb";


const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () =>{
    const {userId } = auth()

    if (!userId) {
        return false
    }

    const userSubscription = await prismadb.userSubscription.findUnique({
        where:{
            userId
        },
        select:{
            stripeCurrentPerioEnd: true,
            stripeCustomerId: true,
            stripePriceId: true,
            stripeSubscriptionId: true
        }
    })

    if (!userSubscription) {
        return false
    }

    const isvalid = userSubscription.stripePriceId && userSubscription.stripeCurrentPerioEnd?.getTime()! + DAY_IN_MS > Date.now() 

    return !!isvalid;
}