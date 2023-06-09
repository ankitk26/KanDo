import { appwriteConstants } from "@/data/appwriteIds";
import { Account, Client } from "appwrite";

const client = new Client();
client
    .setEndpoint(appwriteConstants.endpoint)
    .setProject(appwriteConstants.projectId);

const account = new Account(client);

export { account };
