import BoardColumns from "@/components/BoardColumns";
import BoardPageHeader from "@/components/BoardPageHeader";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

interface Props {
    params: {
        id: string;
    };
}

export default async function BoardPage({ params }: Props) {
    const session = await getAuthSession();

    if (!session) {
        redirect("/api/auth/signin");
    }

    const boardId = params.id;

    return (
        <>
            <BoardPageHeader boardId={boardId} />
            <BoardColumns boardId={boardId} />
        </>
    );
}
