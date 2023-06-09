import { DefaultSession, Session } from "next-auth";
import { Models } from "node-appwrite";

export interface Board extends Models.Document {
    boardName: string;
    boardAdmin: string;
    boardTags: string[];
    members: string[];
    description?: string;
}

export interface Priority extends Models.Document {
    priorityDescription: string;
    color: string;
}

export interface Task extends Models.Document {
    taskTitle: string;
    assigneeId?: string;
    assignedAt?: string;
    taskContent?: string;
    columnId: string;
    priorityId: string;
}

export interface Column extends Models.Document {
    columnName: string;
    boardId: string;
}

export interface Ctx {
    params: {
        id: string;
    };
}

export interface UserPrefs extends Models.Preferences {
    avatar: string;
    role?: string;
}

export interface AuthUser {
    email: string;
    sub: string;
    iat: number;
    exp: number;
    jti: string;
}

export interface AuthSession extends Omit<DefaultSession, "user"> {
    user: AuthUser;
    expires: string;
}
