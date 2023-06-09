"use server";

import { cookies } from "next/headers";
import { getUsers } from "./appwrite";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { AuthSession } from "@/types";

export async function getAuthSession() {
    const session = (await getServerSession(authOptions)) as AuthSession;
    return session;
}

export async function getUserId() {
    const session = await getAuthSession();

    if (!session) {
        return null;
    }

    return session.user.sub;
}

export async function getUser() {
    const userId = await getUserId();

    if (!userId) {
        return null;
    }

    const users = await getUsers();

    const authenticatedUser = await users.get(userId);
    return authenticatedUser;
}

export async function getUserPrefs() {
    const userId = await getUserId();

    if (!userId) {
        return null;
    }

    const users = await getUsers();
    const prefs = await users.getPrefs(userId);

    return prefs;
}
