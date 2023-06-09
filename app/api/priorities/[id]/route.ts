import { appwriteConstants } from "@/data/appwriteIds";
import { getDatabases } from "@/lib/appwrite";
import { Ctx } from "@/types";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: Ctx) {
  try {
    console.log(params);
    const databases = await getDatabases();
    const priority = await databases.getDocument(
      appwriteConstants.databaseId,
      appwriteConstants.priorityTableId,
      params.id
    );

    return NextResponse.json(priority);
  } catch (e) {
    console.log(e);
    return NextResponse.json([]);
  }
}
