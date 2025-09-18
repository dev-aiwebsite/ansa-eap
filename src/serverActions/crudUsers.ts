"use server";
import pool from "@/lib/db";
import { nanoid } from "nanoid";

export type User = {
  id: string;
  first_name: string;
  last_name: string;
  profile_img: string;
  email: string;
  password: string;
  company: string;
  created_at: string;
  updated_at: string;
  roles: string[];
};

type Result<T> = {
  success: boolean;
  message: string;
  data?: T;
};

// CREATE
export async function createUser(
  data: Omit<User, "id" | "created_at" | "updated_at" | "roles" | "profile_img">
): Promise<Result<User>> {
  try {
    const id = nanoid(10);

    const query = `
      INSERT INTO users (id, email, password, company, first_name, last_name, profile_img)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;

    const values = [
      id,
      data.email,
      data.password,
      data.company ?? null,
      data.first_name ?? null,
      data.last_name ?? null,
      "/assets/images/default-avatar.png",
    ];

    const result = await pool.query(query, values);
    const user = result.rows[0] as User;

    // ✅ Insert default "user" role
    await pool.query(
      `INSERT INTO user_roles (user_id, role_id)
       VALUES ($1, (SELECT id FROM roles WHERE name = 'user'))
       ON CONFLICT DO NOTHING;`,
      [user.id]
    );

    // fetch roles
    const rolesRes = await pool.query(
      `SELECT r.name FROM roles r
       JOIN user_roles ur ON r.id = ur.role_id
       WHERE ur.user_id = $1;`,
      [user.id]
    );

    user.roles = rolesRes.rows.map((r) => r.name);

    return {
      success: true,
      message: "User created successfully",
      data: user,
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
    const result = await pool.query(`
      SELECT u.*, COALESCE(json_agg(r.name) FILTER (WHERE r.name IS NOT NULL), '[]') AS roles
      FROM users u
      LEFT JOIN user_roles ur ON u.id = ur.user_id
      LEFT JOIN roles r ON ur.role_id = r.id
      GROUP BY u.id
      ORDER BY u.created_at DESC;
    `);

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
    const result = await pool.query(`
      SELECT u.*, COALESCE(json_agg(r.name) FILTER (WHERE r.name IS NOT NULL), '[]') AS roles
      FROM users u
      LEFT JOIN user_roles ur ON u.id = ur.user_id
      LEFT JOIN roles r ON ur.role_id = r.id
      WHERE u.id = $1
      GROUP BY u.id;
    `, [id]);

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

// READ ALL USERS BY COMPANY
export async function getUsersByCompany(companyId: string): Promise<Result<User[]>> {
  try {
    const result = await pool.query(
      `
      SELECT u.*, COALESCE(json_agg(r.name) FILTER (WHERE r.name IS NOT NULL), '[]') AS roles
      FROM users u
      LEFT JOIN user_roles ur ON u.id = ur.user_id
      LEFT JOIN roles r ON ur.role_id = r.id
      WHERE u.company = $1
      GROUP BY u.id
      ORDER BY u.created_at DESC;
      `,
      [companyId]
    );

    return {
      success: true,
      message: "Users fetched successfully for company",
      data: result.rows as User[],
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
    const result = await pool.query(`
      SELECT u.*, COALESCE(json_agg(r.name) FILTER (WHERE r.name IS NOT NULL), '[]') AS roles
      FROM users u
      LEFT JOIN user_roles ur ON u.id = ur.user_id
      LEFT JOIN roles r ON ur.role_id = r.id
      WHERE u.email = $1
      GROUP BY u.id;
    `, [email]);

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
      if (key === "roles") continue; // handled separately
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

    const user = result.rows[0] as User;

    // ✅ If roles provided, update them
    if (data.roles) {
      await pool.query(`DELETE FROM user_roles WHERE user_id = $1`, [id]);

      for (const role of data.roles) {
        await pool.query(
          `INSERT INTO user_roles (user_id, role_id)
           VALUES ($1, (SELECT id FROM roles WHERE name = $2))
           ON CONFLICT DO NOTHING;`,
          [id, role]
        );
      }

      const rolesRes = await pool.query(
        `SELECT r.name FROM roles r
         JOIN user_roles ur ON r.id = ur.role_id
         WHERE ur.user_id = $1;`,
        [id]
      );

      user.roles = rolesRes.rows.map((r) => r.name);
    }

    return {
      success: true,
      message: `User: ${id} updated successfully`,
      data: user,
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
