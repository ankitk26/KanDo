import { appwriteConstants } from "@/data/appwriteIds";
import { DEV_BASE_URL } from "@/data/static";
import { getDatabases } from "@/lib/appwrite";
import { Ctx } from "@/types";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: Ctx) {
  try {
    const tag = req.nextUrl.searchParams;
    console.log(tag);
    const body = await req.json();
    console.log(params, body);
    const databases = await getDatabases();
    const updatedColumn = await databases.updateDocument(
      appwriteConstants.databaseId,
      appwriteConstants.columnTableId,
      params.id,
      {
        columnName: body.columnName,
      }
    );
    console.log(updatedColumn);
    return NextResponse.json(updatedColumn);
  } catch (e) {
    return NextResponse.json({ error: (e as any).message });
  }
}

export async function DELETE(req: NextRequest, { params }: Ctx) {
  try {
    console.log(req.nextUrl.searchParams.get("path") || "/");
    const databases = await getDatabases();
    const deleteDocument = await databases.deleteDocument(
      appwriteConstants.databaseId,
      appwriteConstants.columnTableId,
      params.id
    );
    return NextResponse.json(deleteDocument);
  } catch (e) {
    return NextResponse.json({ error: (e as any).message });
  }
}
