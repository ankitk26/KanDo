import { appwriteConstants } from "@/data/appwriteIds";
import { getDatabases } from "@/lib/appwrite";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const databases = await getDatabases();
  const updatedDocument = await databases.updateDocument(
    appwriteConstants.databaseId,
    appwriteConstants.boardTableId,
    body.boardId,
    {
      members: body.memberIds,
    }
  );

  return NextResponse.json(updatedDocument);
}
