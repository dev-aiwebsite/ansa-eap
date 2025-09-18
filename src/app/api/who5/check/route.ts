import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import pool from "@/lib/db"; // your PostgreSQL pool

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token?.sub) return NextResponse.json({ completed: false }, { status: 401 });

    const userId = token.sub;

    // Check if the user has a WHO-5 response
    const result = await pool.query(
      `SELECT id FROM who5_responses WHERE user_id = $1 LIMIT 1`,
      [userId]
    );

    const completed = result.rows.length > 0;

    return NextResponse.json({ completed });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ completed: false }, { status: 500 });
  }
}
