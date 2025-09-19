"use server";
import pool from "@/lib/db";
import { nanoid } from "nanoid";


export type Post = {
  id: string;
  title: string;
  slug: string;
  category:string;
  author: string;
  tags: string;
  video?: string;
  audio?: string;
  thumbnail?: string;
  duration_hours: number;
  duration_minutes: number;
  description: string;
  created_at: string;
  updated_at: string;
};

type Result<T> = {
  success: boolean;
  message: string;
  data?: T;
};

// CREATE
export async function createPost(data: Omit<Post, "id" | "created_at" | "updated_at">): Promise<Result<Post>> {
  try {
    const id = nanoid(10);
    const query = `
      INSERT INTO posts
     (id, title, slug, category, author, tags, video, audio, thumbnail, description, duration_hours, duration_minutes)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
      RETURNING *;
    `;
    const values = [
      id,
      data.title,
      data.slug,
      data.category,
      data.author,
      data.tags,
      data.video ?? null,
      data.audio ?? null,
      data.thumbnail ?? null,
      data.description ?? null,
      data.duration_hours,
      data.duration_minutes
    ];
    const result = await pool.query(query, values);
    return { success: true, message: "Post created successfully", data: result.rows[0] as Post };
  } catch (error: unknown) {
    let message = "An unknown error occurred";
    if (error instanceof Error) message = error.message;
    return { success: false, message };
  }
}

// READ ALL
export async function getPosts(): Promise<Result<Post[]>> {
  try {
    const result = await pool.query(`SELECT * FROM posts ORDER BY created_at DESC`);
    return { success: true, message: "Posts fetched successfully", data: result.rows as Post[] };
  } catch (error: unknown) {
    let message = "An unknown error occurred";
    if (error instanceof Error) message = error.message;
    return { success: false, message };
  }
}

// READ ONE
export async function getPostById(id: string): Promise<Result<Post>> {
  try {
    const result = await pool.query(`SELECT * FROM posts WHERE id = $1`, [id]);
    if (!result.rows[0]) return { success: false, message: "Post not found" };
    return { success: true, message: "Post fetched successfully", data: result.rows[0] as Post };
  } catch (error: unknown) {
    let message = "An unknown error occurred";
    if (error instanceof Error) message = error.message;
    return { success: false, message };
  }
}
export async function getPostByTitle(title: string): Promise<Result<Post>> {
  try {
    const result = await pool.query(`SELECT * FROM posts WHERE title = $1`, [title]);

    if (!result.rows[0]) return { success: false, message: `Post: ${title} not found` };

    return {
      success: true,
      message: `Post: ${title} fetched successfully`,
      data: result.rows[0] as Post
    };
  } catch (error: unknown) {
    let message = "An unknown error occurred";
    if (error instanceof Error) message = error.message;

    return { success: false, message };
  }
}
export async function getPostBySlug(slug: string): Promise<Result<Post>> {
  try {
    const result = await pool.query(`SELECT * FROM posts WHERE slug = $1`, [slug]);

    if (!result.rows[0]) return { success: false, message: "Post not found" };

    return {
      success: true,
      message: "Post fetched successfully",
      data: result.rows[0] as Post
    };
  } catch (error: unknown) {
    let message = "An unknown error occurred";
    if (error instanceof Error) message = error.message;

    return { success: false, message };
  }
}

// UPDATE
export async function updatePost(id: string, data: Partial<Omit<Post, "id" | "created_at" | "updated_at">>): Promise<Result<Post>> {
  try {
    const fields = [];
    const values = [];
    let i = 1;

    for (const [key, value] of Object.entries(data)) {
      if (["id", "created_at", "updated_at"].includes(key)) continue; // ✅ skip these
      fields.push(`${key} = $${i++}`);
      values.push(value);
    }

    values.push(id);

    const query = `
      UPDATE posts
      SET ${fields.join(", ")}, updated_at = NOW()
      WHERE id = $${i}
      RETURNING *;
    `;

    const result = await pool.query(query, values);
    if (!result.rows[0]) return { success: false, message: `Post: ${id} not found` };
    return { success: true, message: `Post: ${id} updated successfully`, data: result.rows[0] as Post };
  } catch (error: unknown) {
    let message = "An unknown error occurred";
    if (error instanceof Error) message = error.message;
    return { success: false, message };
  }
}

// DELETE
export async function deletePost(id: string): Promise<Result<Post>> {
  try {
    const result = await pool.query(`DELETE FROM posts WHERE id = $1 RETURNING *`, [id]);
    if (!result.rows[0]) return { success: false, message: "Post not found" };
    return { success: true, message: `Post: ${id} deleted successfully`, data: result.rows[0] as Post };
  } catch (error: unknown) {
    let message = "An unknown error occurred";
    if (error instanceof Error) message = error.message;
    return { success: false, message };
  }
}
