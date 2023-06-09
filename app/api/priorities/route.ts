import { appwriteConstants } from "@/data/appwriteIds";
import { getDatabases } from "@/lib/appwrite";
import { Priority } from "@/types";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const databases = await getDatabases();
    const priorityCollections = await databases.listDocuments(
      appwriteConstants.databaseId,
      appwriteConstants.priorityTableId
    );

    const priorities = priorityCollections.documents as Priority[];
    return NextResponse.json(priorities);
  } catch (e) {
    console.log(e);
    return NextResponse.json([]);
  }
}
