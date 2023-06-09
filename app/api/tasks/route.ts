import { appwriteConstants } from "@/data/appwriteIds";
import { getDatabases } from "@/lib/appwrite";
import { NextResponse } from "next/server";
import { ID, Query } from "node-appwrite";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const columnId = searchParams.get("columnId") as string;
    const databases = await getDatabases();
    const tasks = await databases.listDocuments(
      appwriteConstants.databaseId,
      appwriteConstants.taskTableId,
      [Query.equal("columnId", columnId)]
    );

    return NextResponse.json(tasks.documents);
  } catch (e) {
    console.log(e);
  }
}

export async function POST(req: Request) {
  try {
    const taskBody = await req.json();
    console.log(taskBody);
    const databases = await getDatabases();
    const newTask = await databases.createDocument(
      appwriteConstants.databaseId,
      appwriteConstants.taskTableId,
      ID.unique(),
      taskBody
    );

    return NextResponse.json(newTask);
  } catch (e) {
    console.log(e);
  }
}
