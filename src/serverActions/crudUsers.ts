"use server";
import pool from "@/lib/db";
import { nanoid } from "nanoid";

export type User = {
  id: string;
  first_name?: string;
  last_name?: string;
  profile_img?:string;
  email: string;
  password: string;
  created_at: string;
  updated_at: string;
};

type Result<T> = {
  success: boolean;
  message: string;
  data?: T;
};

// CREATE
export async function createUser(
  data: Omit<User, "id" | "created_at" | "updated_at">
): Promise<Result<User>> {
  try {
    const id = nanoid(10);

    const query = `
      INSERT INTO users (id, email, password, first_name, last_name, profile_img)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;

    const values = [
      id,
      data.email,
      data.password,
      data.first_name ?? null,
      data.last_name ?? null,
      !data.profile_img || data.profile_img.trim() === ""
        ? "/assets/images/default-avatar.png" // ✅ default handled in app
        : data.profile_img,
    ];

    const result = await pool.query(query, values);

    return {
      success: true,
      message: "User created successfully",
      data: result.rows[0] as User,
    };
  } catch (error: unknown) {
    let message = "An unknown error occurred";
    if (error instanceof Error) message = error.message;
    return { success: false, message };
  }
}

// READ ALL
export async function getUsers(): Promise<Result<User[]>> {
  try {
    const result = await pool.query(`SELECT * FROM users ORDER BY created_at DESC`);
    return {
      success: true,
      message: "Users fetched successfully",
      data: result.rows as User[],
    };
  } catch (error: unknown) {
    let message = "An unknown error occurred";
    if (error instanceof Error) message = error.message;
    return { success: false, message };
  }
}

// READ ONE (by ID)
export async function getUserById(id: string): Promise<Result<User>> {
  try {
    const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
    if (!result.rows[0]) return { success: false, message: `User: ${id} not found` };

    return {
      success: true,
      message: "User fetched successfully",
      data: result.rows[0] as User,
    };
  } catch (error: unknown) {
    let message = "An unknown error occurred";
    if (error instanceof Error) message = error.message;
    return { success: false, message };
  }
}

// READ ONE (by Email)
export async function getUserByEmail(email: string): Promise<Result<User>> {
  try {
    const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
    if (!result.rows[0]) return { success: false, message: `User: ${email} not found` };

    return {
      success: true,
      message: "User fetched successfully",
      data: result.rows[0] as User,
    };
  } catch (error: unknown) {
    let message = "An unknown error occurred";
    if (error instanceof Error) message = error.message;
    return { success: false, message };
  }
}

// UPDATE
export async function updateUser(
  id: string,
  data: Partial<Omit<User, "id" | "created_at">>
): Promise<Result<User>> {
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
      UPDATE users
      SET ${fields.join(", ")}, updated_at = NOW()
      WHERE id = $${i}
      RETURNING *;
    `;

    const result = await pool.query(query, values);
    if (!result.rows[0]) return { success: false, message: `User: ${id} not found` };

    return {
      success: true,
      message: `User: ${id} updated successfully`,
      data: result.rows[0] as User,
    };
  } catch (error: unknown) {
    let message = "An unknown error occurred";
    if (error instanceof Error) message = error.message;
    return { success: false, message };
  }
}

// DELETE
export async function deleteUser(id: string): Promise<Result<User>> {
  try {
    const result = await pool.query(`DELETE FROM users WHERE id = $1 RETURNING *`, [id]);
    if (!result.rows[0]) return { success: false, message: `User: ${id} not found` };

    return {
      success: true,
      message: `User: ${id} deleted successfully`,
      data: result.rows[0] as User,
    };
  } catch (error: unknown) {
    let message = "An unknown error occurred";
    if (error instanceof Error) message = error.message;
    return { success: false, message };
  }
}
