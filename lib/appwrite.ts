"use server";

import { Client, Databases, Users } from "node-appwrite";
import { appwriteConstants } from "../data/appwriteIds";

const client = new Client()
    .setEndpoint(appwriteConstants.endpoint)
    .setProject(appwriteConstants.projectId)
    .setKey(process.env.APPWRITE_API_KEY as string);

const databases = new Databases(client);

export const getDatabases = async () => databases;
export const getUsers = async () => new Users(client);
