"use server";

import { appwriteConstants } from "@/data/appwriteIds";
import { DEV_BASE_URL } from "@/data/static";
import { Column } from "@/types";
import { revalidatePath } from "next/cache";
import { ID, Query } from "node-appwrite";
import { getDatabases } from "./appwrite";

export async function getColumnsByBoard(boardId: string) {
  const databases = await getDatabases();

  return await databases.listDocuments(
    appwriteConstants.databaseId,
    appwriteConstants.columnTableId,
    [Query.equal("boardId", boardId)]
  );
}

export async function getColumnById(columnId: string): Promise<Column> {
  const databases = await getDatabases();
  return await databases.getDocument(
    appwriteConstants.databaseId,
    appwriteConstants.columnTableId,
    columnId
  );
}

export async function addColumn(data: FormData, boardId: string) {
  const databases = await getDatabases();

  const columnName = data.get("column-name");
  const body = {
    columnName,
    boardId: boardId,
  };
  await databases.createDocument(
    appwriteConstants.databaseId,
    appwriteConstants.columnTableId,
    ID.unique(),
    body
  );
  revalidatePath(`${DEV_BASE_URL}/boards/${boardId}`);
}

export async function updateColumn(
  columnId: string,
  body: {
    columnName: FormDataEntryValue | null;
  }
) {
  try {
    const databases = await getDatabases();

    const column = await getColumnById(columnId);

    await databases.updateDocument(
      appwriteConstants.databaseId,
      appwriteConstants.columnTableId,
      columnId,
      body
    );

    revalidatePath(`${DEV_BASE_URL}/boards/${column.boardId}`);
  } catch (e) {
    console.error(e);
  }
}

export async function deleteColumn(columnId: string) {
  try {
    const databases = await getDatabases();

    const column = await getColumnById(columnId);

    await databases.deleteDocument(
      appwriteConstants.databaseId,
      appwriteConstants.columnTableId,
      columnId
    );

    revalidatePath(`${DEV_BASE_URL}/boards/${column.boardId}`);
  } catch (e) {
    console.log(e);
  }
}
