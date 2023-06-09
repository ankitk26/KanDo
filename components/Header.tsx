import { Button } from "@/components/ui/button";
import { getUser, getUserPrefs } from "@/lib/auth";
import { getNameInitials } from "@/lib/utils";
import { UserPrefs } from "@/types";
import { Plus, Search, User } from "lucide-react";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import MyAvatar from "./MyAvatar";
import { ThemeToggle } from "./ThemeToggle";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export async function Header() {
    const user = await getUser();
    const prefs = (await getUserPrefs()) as UserPrefs;

    return (
        <nav className="flex items-center justify-between px-16 py-3 border-b border-accent">
            <div className="flex items-center gap-16">
                <Link href="/">
                    <h3>KanDo</h3>
                </Link>
                <div></div>
            </div>

            {user && (
                <div className="flex items-center gap-4">
                    {prefs.role && prefs?.role.includes("admin") && (
                        <Link href="/add-board">
                            <Button variant="outline" size="sm">
                                <Plus className="w-4 h-4 mr-2" /> New Board
                            </Button>
                        </Link>
                    )}

                    <button>
                        <Search size={16} />
                    </button>

                    <ThemeToggle />

                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <MyAvatar
                                src={prefs.avatar}
                                alt={user.name}
                                fallback={getNameInitials(user.name)}
                            />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
                            <DropdownMenuItem>
                                <Link href="/profile">
                                    <Button variant="ghost" size="sm">
                                        <User size={16} className="mr-2" />
                                        Account
                                    </Button>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <LogoutButton />
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )}
        </nav>
    );
}
