"use server";

import { appwriteConstants } from "@/data/appwriteIds";
import { Board } from "@/types";
import { redirect } from "next/navigation";
import { ID, Query } from "node-appwrite";
import { getDatabases } from "./appwrite";
import { cookies } from "next/headers";
import { getUserId } from "./auth";

export async function getBoards() {
    const databases = await getDatabases();

    const userId = (await getUserId()) as string;

    return databases.listDocuments(
        appwriteConstants.databaseId,
        appwriteConstants.boardTableId,
        [Query.search("members", userId)]
    );
}

export async function getBoardById(boardId: string): Promise<Board> {
    const databases = await getDatabases();

    return databases.getDocument(
        appwriteConstants.databaseId,
        appwriteConstants.boardTableId,
        boardId
    );
}

export async function createBoard(data: FormData) {
    const boardName = data.get("board-name")?.valueOf();
    const description = data.get("board-description")?.valueOf() ?? "";
    const boardAdmin = await getUserId();

    const body = { boardName, description, boardAdmin, members: [boardAdmin] };

    const databases = await getDatabases();
    const newBoard = await databases.createDocument(
        appwriteConstants.databaseId,
        appwriteConstants.boardTableId,
        ID.unique(),
        body
    );

    console.log(newBoard);

    redirect(`/boards/${newBoard.$id}`);
}

export async function updateMembersList(
    boardId: string | undefined,
    memberIds: string[]
) {
    const databases = await getDatabases();

    if (!boardId) {
        return;
    }

    await databases.updateDocument(
        appwriteConstants.databaseId,
        appwriteConstants.boardTableId,
        boardId,
        {
            members: memberIds,
        }
    );
}
