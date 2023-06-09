import AddMembersDialog from "@/components/AddMembersDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getUsers } from "@/lib/appwrite";
import { getAuthSession } from "@/lib/auth";
import { createBoard } from "@/lib/boardActions";
import { redirect } from "next/navigation";

export default async function AddBoardPage() {
    const session = await getAuthSession();
    if (!session) {
        redirect("/api/auth/signin");
    }

    const users = await getUsers();
    const usersList = await users.list().then((res) => res.users);

    return (
        <>
            <h2>Add Board</h2>

            <form action={createBoard} className="flex flex-col gap-4 mt-4">
                <fieldset className="grid items-center grid-cols-8">
                    <label htmlFor="board-name" className="col-span-1">
                        Board Name
                    </label>
                    <Input
                        name="board-name"
                        id="board-name"
                        className="col-span-3 px-4"
                        required
                    />
                </fieldset>

                <fieldset className="grid grid-cols-8">
                    <label htmlFor="board-description" className="col-span-1">
                        Board Description
                    </label>
                    <Textarea
                        name="board-description"
                        id="board-description"
                        className="col-span-3 px-4 resize-none"
                        rows={5}
                        required
                    />
                </fieldset>

                <AddMembersDialog members={usersList} />

                <Button type="submit" className="flex self-start">
                    Submit
                </Button>
            </form>
        </>
    );
}
