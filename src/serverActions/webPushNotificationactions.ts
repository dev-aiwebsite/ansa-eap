'use server'

import { createPushSubscription, deletePushSubscription, getPushSubscriptionByClientId } from '@/serverActions/crudPushNotification'
import webpush, { PushSubscription as  WebPushSubscription } from 'web-push'

webpush.setVapidDetails(
  'mailto:dev@aiwebsiteservices.com',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
)

// Subscribe and save to DB
export async function subscribeUser(sub: WebPushSubscription, userId: string) {
  // Save subscription to DB (upsert)
  const res = await createPushSubscription(userId, sub)
  return { success: res.success }
}

// Unsubscribe and remove from DB
export async function unsubscribeUser(userId: string) {
  await deletePushSubscription(userId)
  console.log('Unsubscribed:', userId)
  return { success: true }
}

// Send push using subscription from DB
export async function sendNotification(message: string, userId: string, url?:string) {
  const { data: subscriptionRecord } = await getPushSubscriptionByClientId(userId)

  if (!subscriptionRecord) throw new Error('No subscription available for this client')
  const notificationData = {
    title: 'Test Notification',
    body: message,
    url: url || process.env.NEXT_PUBLIC_APP_DOMAIN, // pass dynamic URL here
  }
  console.log('Sending push to:', subscriptionRecord.subscription.endpoint)
  console.log(notificationData, 'notificationData')

  try {
  
    const pushRes = await webpush.sendNotification(
      subscriptionRecord.subscription, // JSONB from DB, already full PushSubscription
      JSON.stringify(notificationData)
    )
    console.log(pushRes, 'pushRes')
    return { success: true }
  } catch (err) {
    console.error('Push failed:', err)
    return { success: false, error: 'Failed to send notification' }
  }
}


