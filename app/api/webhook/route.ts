import { stripe } from "@/lib/stripe"
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import Stripe from "stripe"



export async function POST(req:Request) {
    const body = await req.text()
    const signature = headers().get("Stripe-Signature") as string

    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )

    } catch (error) {
        return new NextResponse(`Webhook Error: ${error.message}`, {status:400})
    }


    const session = event.data.object as Stripe.Checkout.Session


    if (event.type === "checkout.session.completed") {
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
        )

        if (!session?.metadata?.userId){
            return new NextResponse("USer id is requires", {status: 400})
        }

    

    }
    
}