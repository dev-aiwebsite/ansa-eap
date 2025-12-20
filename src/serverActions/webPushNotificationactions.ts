'use server'

import { createPushSubscription, deletePushSubscription, getPushSubscriptionByClientId } from '@/serverActions/crudPushNotification'
import webpush, { PushSubscription as WebPushSubscription } from 'web-push'
import { createInboxItem } from './crudInboxItem'

webpush.setVapidDetails(
  'mailto:dev@aiwebsiteservices.com',
  process.env.VAPID_PUBLIC_KEY!,
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
export async function sendNotification({
  title,
  message,
  userId,
  url
}: {
  title: string,
  message: string,
  userId: string,
  url?: string
}) {



  const inboxRes = await createInboxItem({
    userId,
    title,
    body: message,
    url,
    itemType: 'push'
  })


  const { data: subscriptionRecords } = await getPushSubscriptionByClientId(userId);

  if (!subscriptionRecords || subscriptionRecords.length === 0) {
    console.warn('No subscriptions found, only inbox item created')
    return { inboxCreated: inboxRes.success, results: [] }
  }

  const notificationData = {
    title,
    body: message,
    url: url || process.env.NEXT_PUBLIC_APP_DOMAIN, // pass dynamic URL here
  };

  try {
    const results = [];

    // Use for...of to await each send
    for (const sub of subscriptionRecords) {
      try {
        const pushRes = await webpush.sendNotification(
          sub.subscription, // JSONB from DB
          JSON.stringify(notificationData)
        );

        results.push({
          success: true,
          status_code: pushRes.statusCode,
        });
      } catch (err) {
        console.error('Push failed for one subscription:', err);
        results.push({
          success: false,
          error: (err as Error).message,
        });
      }
    }

    return results; // array of results per device
  } catch (err) {
    console.error('Push failed:', err);
    return { success: false, error: 'Failed to send notifications' };
  }
}



