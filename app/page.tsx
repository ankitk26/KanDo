import BoardCard from "@/components/BoardCard";
import { getAuthSession } from "@/lib/auth";
import { getBoards } from "@/lib/boardActions";
import { Board } from "@/types";
import { redirect } from "next/navigation";

export default async function HomePage() {
    const session = await getAuthSession();

    if (!session) {
        redirect("/api/auth/signin");
    }

    const boards = await getBoards();

    if (boards.total === 0) {
        return <h4>You are not a member in any board</h4>;
    }

    const boardsList = boards.documents as Board[];

    return (
        <>
            <h2>Boards</h2>

            <div className="grid items-stretch grid-cols-4 gap-4 mt-4">
                {boardsList.map(async (board) => (
                    <BoardCard key={board.$id} board={board} />
                ))}
            </div>
        </>
    );
}
