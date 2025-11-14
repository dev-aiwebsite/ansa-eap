'use client'

import { useState, useEffect } from 'react'
import { subscribeUser, unsubscribeUser } from '@/serverActions/webPushNotificationactions'
import { useAppServiceContext } from '@/context/appServiceContext'
import { Button } from '../ui/button'

export function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const rawData = window.atob(base64)
  return new Uint8Array([...rawData].map((char) => char.charCodeAt(0)))
}

export function PushNotificationToggle() {
  const [isSupported, setIsSupported] = useState(false)
  const [subscription, setSubscription] = useState<PushSubscription | null>(null)
  const { currentUser } = useAppServiceContext()
  const currentUserId = currentUser.id

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window) {
      setIsSupported(true)
      registerServiceWorker()
    }
  }, [])

  async function registerServiceWorker() {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js')
      const existingSub = await registration.pushManager.getSubscription()
      setSubscription(existingSub)
    } catch (err) {
      console.error('Service worker registration failed:', err)
    }
  }

  async function toggleSubscription() {
    // Request permission if default
    if (Notification.permission === 'default') {
      const permission = await Notification.requestPermission()
      if (permission !== 'granted') {
        alert('Notifications permission denied.')
        return
      }
    }

    // Check if denied
    if (Notification.permission === 'denied') {
      alert('You have blocked notifications. Please enable them in your browser settings.')
      return
    }

    try {
      const registration = await navigator.serviceWorker.ready

      if (subscription) {
        // Unsubscribe
        const sub = await registration.pushManager.getSubscription()
        if (sub) await sub.unsubscribe()
        setSubscription(null)
        await unsubscribeUser(currentUserId)
        alert('Notifications disabled')
      } else {
        // Subscribe
        let sub = await registration.pushManager.getSubscription()
        if (!sub) {
          sub = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!),
          })
        }
        setSubscription(sub)
        const serializedSub = JSON.parse(JSON.stringify(sub))
        await subscribeUser(serializedSub, currentUserId)
        alert('Notifications enabled')
      }
    } catch (err) {
      console.error('Push subscription failed:', err)
      alert('Failed to update notifications')
    }
  }

  if (!isSupported) return <p>Push notifications are not supported in this browser.</p>

  return (
    <Button
      className="text-xs bg-gray-200"
      onClick={toggleSubscription}
      variant="ghost"
      size="sm"
    >
      {subscription ? 'Disable Notifications' : 'Enable Notifications'}
    </Button>
  )
}
