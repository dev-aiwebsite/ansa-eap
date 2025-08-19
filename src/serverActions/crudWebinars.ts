"use server";
import pool from "@/lib/db";
import { nanoid } from "nanoid";

export type Webinar = {
  id: string;
  title: string;
  author: string;
  tags: string;
  video?: string;
  thumbnail?: string;
  description?: string;
  created_at: string;
  updated_at: string;
};

type Result<T> = {
  success: boolean;
  message: string;
  data?: T;
};

// CREATE
export async function createWebinar(data: Omit<Webinar, "id" | "created_at" | "updated_at">): Promise<Result<Webinar>> {
  try {
    const id = nanoid();
    const query = `
      INSERT INTO webinars (id, title, author, tags, video, thumbnail, description)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;
    const values = [id, data.title, data.author, data.tags, data.video ?? null, data.thumbnail ?? null, data.description ?? null];
    const result = await pool.query(query, values);
    return { success: true, message: "Webinar created successfully", data: result.rows[0] as Webinar };
  } catch (error: unknown) {
    let message = "An unknown error occurred";
    if (error instanceof Error) message = error.message;
    return { success: false, message };
  }
}

// READ ALL
export async function getWebinars(): Promise<Result<Webinar[]>> {
  try {
    const result = await pool.query(`SELECT * FROM webinars ORDER BY created_at DESC`);
    return { success: true, message: "Webinars fetched successfully", data: result.rows as Webinar[] };
  } catch (error: unknown) {
    let message = "An unknown error occurred";
    if (error instanceof Error) message = error.message;
    return { success: false, message };
  }
}

// READ ONE
export async function getWebinarById(id: string): Promise<Result<Webinar>> {
  try {
    const result = await pool.query(`SELECT * FROM webinars WHERE id = $1`, [id]);
    if (!result.rows[0]) return { success: false, message: "Webinar not found" };
    return { success: true, message: "Webinar fetched successfully", data: result.rows[0] as Webinar };
  } catch (error: unknown) {
    let message = "An unknown error occurred";
    if (error instanceof Error) message = error.message;
    return { success: false, message };
  }
}
export async function getWebinarByTitle(title: string): Promise<Result<Webinar>> {
    try {
      const result = await pool.query(`SELECT * FROM webinars WHERE title = $1`, [title]);
  
      if (!result.rows[0]) return { success: false, message: "Webinar not found" };
  
      return {
        success: true,
        message: "Webinar fetched successfully",
        data: result.rows[0] as Webinar
      };
    } catch (error: unknown) {
      let message = "An unknown error occurred";
      if (error instanceof Error) message = error.message;
  
      return { success: false, message };
    }
  }

// UPDATE
export async function updateWebinar(id: string, data: Partial<Omit<Webinar, "id" | "created_at">>): Promise<Result<Webinar>> {
  try {
    const fields = [];
    const values = [];
    let i = 1;

    for (const [key, value] of Object.entries(data)) {
      fields.push(`${key} = $${i++}`);
      values.push(value);
    }

    values.push(id);

    const query = `
      UPDATE webinars
      SET ${fields.join(", ")}, updated_at = NOW()
      WHERE id = $${i}
      RETURNING *;
    `;

    const result = await pool.query(query, values);
    if (!result.rows[0]) return { success: false, message: "Webinar not found" };
    return { success: true, message: "Webinar updated successfully", data: result.rows[0] as Webinar };
  } catch (error: unknown) {
    let message = "An unknown error occurred";
    if (error instanceof Error) message = error.message;
    return { success: false, message };
  }
}

// DELETE
export async function deleteWebinar(id: string): Promise<Result<Webinar>> {
  try {
    const result = await pool.query(`DELETE FROM webinars WHERE id = $1 RETURNING *`, [id]);
    if (!result.rows[0]) return { success: false, message: "Webinar not found" };
    return { success: true, message: "Webinar deleted successfully", data: result.rows[0] as Webinar };
  } catch (error: unknown) {
    let message = "An unknown error occurred";
    if (error instanceof Error) message = error.message;
    return { success: false, message };
  }
}
