"use server";

import { appwriteConstants } from "@/data/appwriteIds";
import { DEV_BASE_URL } from "@/data/static";
import { Priority } from "@/types";
import { getDatabases } from "./appwrite";

export async function getPriorities(): Promise<Priority[]> {
  const databases = await getDatabases();
  return await fetch(`${DEV_BASE_URL}/api/priorities`).then((res) =>
    res.json()
  );
}

export async function getPriorityById(priorityId: string): Promise<Priority> {
  const databases = await getDatabases();

  return await databases.getDocument(
    appwriteConstants.databaseId,
    appwriteConstants.priorityTableId,
    priorityId
  );
}
