"use server";
import { nanoid } from "nanoid";
import pool from "@/lib/db";
import { User } from "@/types";

// Create User
export async function createUser({
  id = nanoid(10),
  name,
  email,
  password,
}: {
  id?: string;
  name: string;
  email: string;
  password: string;
}) {
  const query = `INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4) RETURNING *`;
  const values = [id, name, email, password];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

// Get All Users
export async function getUsers() {
  const query = `SELECT * FROM users`;
  const { rows } = await pool.query(query);
  return rows as User[];
}

// Get User by ID
export async function getUserById(userId: string) {
  const query = `SELECT * FROM users WHERE id = $1`;
  const { rows } = await pool.query(query, [userId]);
  return rows[0] as User;
}
export async function getUserByEmail({ email }: { email: string }) {
  const query = `SELECT * FROM users WHERE email = $1`;
  const { rows } = await pool.query(query, [email]);
  return rows[0] as User;
}

// Update User
export async function updateUser(userId: string, userData: Partial<User>): Promise<User> {
  // Filter out fields that are undefined or null from userData
  const fieldsToUpdate: string[] = [];
  const values: (string | string[] | null)[] = [];

  if (userData.first_name) {
    fieldsToUpdate.push(`first_name = $${values.length + 1}`);
    values.push(userData.first_name);
  }
  if (userData.last_name) {
    fieldsToUpdate.push(`last_name = $${values.length + 1}`);
    values.push(userData.last_name);
  }

  if (userData.email) {
    fieldsToUpdate.push(`email = $${values.length + 1}`);
    values.push(userData.email);
  }

  if (userData.password) {
    fieldsToUpdate.push(`password = $${values.length + 1}`);
    values.push(userData.password);
  }

  // Add updated_at field if there are any updates
  fieldsToUpdate.push("updated_at = NOW()");

  if (fieldsToUpdate.length === 0) {
    throw new Error("No fields to update");
  }

  values.push(userId);
  console.log(values,'update user values')
  // Construct the query dynamically based on the fields that need updating
  const query = `
    UPDATE users
    SET ${fieldsToUpdate.join(", ")}
     WHERE id = $${values.length}
    RETURNING *;
  `;

  const { rows } = await pool.query(query, values);

  if (rows.length === 0) {
    throw new Error(`User with ID ${userId} not found.`);
  }

  return rows[0] as User;
}

// Delete User
export async function deleteUser(userId: string) {
  const query = `DELETE FROM users WHERE id = $1 RETURNING *`;
  const { rows } = await pool.query(query, [userId]);
  return rows[0];
}

// Create Team
export async function createTeam({
  name,
  members = [],
}: {
  name: string;
  members?: string[];
}) {
  const id = nanoid(10);
  const query = `INSERT INTO teams (id, name, members) VALUES ($1, $2, $3) RETURNING *`;
  const values = [id, name, members];
  const { rows } = await pool.query(query, values);
  return rows[0];
}
