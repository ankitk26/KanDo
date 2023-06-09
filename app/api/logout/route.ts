import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    cookies().set("userId", "", { maxAge: 0 });
    return NextResponse.json({ message: "logged out" });
  } catch (e) {
    return NextResponse.json({ error: (e as any).message });
  }
}
