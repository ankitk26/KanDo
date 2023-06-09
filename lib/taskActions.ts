"use server";

import { appwriteConstants } from "@/data/appwriteIds";
import { DEV_BASE_URL } from "@/data/static";
import { Task } from "@/types";
import { revalidatePath } from "next/cache";
import { ID, Query } from "node-appwrite";
import { getDatabases } from "./appwrite";
import { getColumnById } from "./columnActions";

export async function getTasksByColumn(columnId: string) {
  const databases = await getDatabases();
  return (await databases
    .listDocuments(
      appwriteConstants.databaseId,
      appwriteConstants.taskTableId,
      [Query.equal("columnId", columnId)]
    )
    .then((res) => res.documents)) as Task[];
}

export async function addTaskToBoard(data: FormData, columnId: string) {
  const databases = await getDatabases();

  const column = await getColumnById(columnId);

  const taskTitle = data.get("task-title");
  const taskContent = data.get("task-content");
  const priorityId = data.get("task-priority");

  const body = new Map();
  body.set("taskTitle", taskTitle);
  body.set("taskContent", taskContent);
  body.set("columnId", columnId);
  if (priorityId !== "") {
    body.set("priorityId", priorityId);
  }

  await databases.createDocument(
    appwriteConstants.databaseId,
    appwriteConstants.taskTableId,
    ID.unique(),
    Object.fromEntries(body)
  );

  revalidatePath(`${DEV_BASE_URL}/boards/${column.boardId}`);
}

export async function getTaskById(taskId: string): Promise<Task> {
  const databases = await getDatabases();
  const task = (await databases.getDocument(
    appwriteConstants.databaseId,
    appwriteConstants.taskTableId,
    taskId
  )) as Task;
  return task;
}

export async function deleteTask(task: Task) {
  try {
    const databases = await getDatabases();

    const column = await getColumnById(task.columnId);

    await databases.deleteDocument(
      appwriteConstants.databaseId,
      appwriteConstants.taskTableId,
      task.$id
    );

    revalidatePath(`${DEV_BASE_URL}/boards/${column.boardId}`);
    return column.boardId;
  } catch (e) {
    console.log(e);
  }
}

export async function editTask(data: FormData, task: Task) {
  const databases = await getDatabases();

  const taskTitle = data.get("task-title");
  const taskContent = data.get("task-content");
  const priorityId = data.get("task-priority");

  const body = new Map();
  body.set("taskTitle", taskTitle);
  body.set("taskContent", taskContent);
  body.set("priorityId", priorityId);

  await databases.updateDocument(
    appwriteConstants.databaseId,
    appwriteConstants.taskTableId,
    task.$id,
    Object.fromEntries(body)
  );

  const column = await getColumnById(task.columnId);

  revalidatePath(`${DEV_BASE_URL}/tasks/${task.$id}`);
  revalidatePath(`${DEV_BASE_URL}/boards/${column.boardId}`);
}
