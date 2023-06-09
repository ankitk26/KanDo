import { sampleAvatar } from "@/data/sample";
import { getUsers } from "@/lib/appwrite";
import { getBoardById } from "@/lib/boardActions";
import AddColumnDialog from "./AddColumnDialog";
import AddMembersDialog from "./AddMembersDialog";
import MyAvatar from "./MyAvatar";
import { UserPrefs } from "@/types";
import { getNameInitials } from "@/lib/utils";
import { getUser, getUserId } from "@/lib/auth";

interface Props {
  boardId: string;
}

export default async function BoardPageHeader({ boardId }: Props) {
  const board = await getBoardById(boardId);

  const currentUserId = await getUserId();

  const users = await getUsers();
  const admin = await users.get(board.boardAdmin);
  const adminPrefs = (await users.getPrefs(board.boardAdmin)) as UserPrefs;

  const membersPromise = board.members.map(async (memberId) => {
    return users.get(memberId);
  });

  const boardMembers = await Promise.all(membersPromise);
  const allUsers = await users.list().then((res) => res.users);

  return (
    <section className="flex items-center justify-between mb-4">
      <div>
        <h3>{board.boardName}</h3>
        <div className="flex items-center gap-2 mt-2">
          <MyAvatar
            src={adminPrefs.avatar}
            alt={admin.name}
            fallback={getNameInitials(admin.name)}
          />
          <p className="text-sm text-muted-foreground">
            Created by {admin.name}
          </p>
        </div>
      </div>

      {/* {currentUserId === admin.$id && ( */}
      <div className="flex items-center gap-2">
        <AddColumnDialog boardId={boardId} />
        <AddMembersDialog
          members={allUsers}
          boardMembers={boardMembers}
          boardId={board.$id}
        />
      </div>
      {/* )} */}
    </section>
  );
}
