import { appwriteConstants } from "@/data/appwriteIds";
import { getDatabases } from "@/lib/appwrite";
import { NextResponse } from "next/server";
import { Query } from "node-appwrite";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const boardId = searchParams.get("boardId") as string;
    console.log(boardId);
    const databases = await getDatabases();
    const columnDocuments = await databases.listDocuments(
      appwriteConstants.databaseId,
      appwriteConstants.columnTableId,
      [Query.equal("boardId", boardId)]
    );
    return NextResponse.json(columnDocuments);
  } catch (e) {
    return NextResponse.json({ error: (e as any).message });
  }
}
