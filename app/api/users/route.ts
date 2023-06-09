import { getUsers } from "@/lib/appwrite";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const users = await getUsers();
    const list = await users.list();
    return NextResponse.json(list);
  } catch (e) {
    return NextResponse.json({ users: [] });
  }
}
