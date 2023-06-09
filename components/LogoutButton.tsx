"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

export default function LogoutButton() {
    return (
        <div>
            <Button onClick={() => signOut()} variant="ghost" size="sm">
                <LogOut size={16} className="mr-2" />
                Log out
            </Button>
        </div>
    );
}
