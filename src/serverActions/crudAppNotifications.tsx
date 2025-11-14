"use server";
import pool from "@/lib/db";
import { nanoid } from "nanoid";

// --------------------
// Types
// --------------------
export type Result<T = unknown> = {
  success: boolean;
  message: string;
  data?: T;
};

export type AppNotification = {
  id: string;
  user_id: string;
  title: string;
  body: string;
  url?: string;
  read: boolean;
  created_at: string;
  updated_at: string;
};

// --------------------
// CRUD functions
// --------------------

// CREATE
export async function createAppNotification(
  userId: string,
  title: string,
  body: string,
  url?: string
): Promise<Result<AppNotification>> {
  const id = nanoid();
  try {
    const query = `
      INSERT INTO app_notifications (id, user_id, title, body, url)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [id, userId, title, body, url ?? null];
    const result = await pool.query(query, values);
    return { success: true, message: "Notification created", data: result.rows[0] };
  } catch (error: unknown) {
    return { success: false, message: error instanceof Error ? error.message : "Unknown error" };
  }
}

// READ ALL
export async function getAppNotifications(userId: string): Promise<Result<AppNotification[]>> {
  try {
    const result = await pool.query(
      `SELECT * FROM app_notifications WHERE user_id = $1 ORDER BY created_at DESC`,
      [userId]
    );
    return { success: true, message: "Notifications fetched", data: result.rows };
  } catch (error: unknown) {
    return { success: false, message: error instanceof Error ? error.message : "Unknown error" };
  }
}

// UPDATE - mark as read
export async function markNotificationAsRead(notificationId: string): Promise<Result<AppNotification>> {
  try {
    const result = await pool.query(
      `UPDATE app_notifications SET read = true, updated_at = NOW() WHERE id = $1 RETURNING *`,
      [notificationId]
    );
    if (!result.rows[0]) return { success: false, message: "Notification not found" };
    return { success: true, message: "Notification marked as read", data: result.rows[0] };
  } catch (error: unknown) {
    return { success: false, message: error instanceof Error ? error.message : "Unknown error" };
  }
}

// DELETE
export async function deleteAppNotification(notificationId: string): Promise<Result<AppNotification>> {
  try {
    const result = await pool.query(
      `DELETE FROM app_notifications WHERE id = $1 RETURNING *`,
      [notificationId]
    );
    if (!result.rows[0]) return { success: false, message: "Notification not found" };
    return { success: true, message: "Notification deleted", data: result.rows[0] };
  } catch (error: unknown) {
    return { success: false, message: error instanceof Error ? error.message : "Unknown error" };
  }
}
