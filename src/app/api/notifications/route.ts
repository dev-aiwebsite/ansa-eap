import { NextRequest, NextResponse } from 'next/server'
import { sendNotification } from '@/serverActions/webPushNotificationactions'

export async function POST(req: NextRequest) {
    try {
        const { userId, message, url } = await req.json()

        if (!userId || !message) {
            return NextResponse.json({ success: false, error: 'Missing userId or message' }, { status: 400 })
        }
        const result = await sendNotification(message, userId, url)
        return NextResponse.json(result)
    } catch (err) {
        console.error('Push failed:', err);
        return new Response(
            JSON.stringify({ success: false, error: (err as Error)?.message || 'Failed' }),
            { status: 500 }
        );
    }
}
