"use client";

import { sampleAvatar } from "@/data/sample";
import { updateMembersList } from "@/lib/boardActions";
import { DialogOverlay } from "@radix-ui/react-dialog";
import { Loader2, UserPlus } from "lucide-react";
import { Models } from "node-appwrite";
import { useState, useTransition } from "react";
import MyAvatar from "./MyAvatar";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useToast } from "./ui/use-toast";

interface Props {
  members: Models.User<Models.Preferences>[];
  boardMembers?: Models.User<Models.Preferences>[];
  boardId?: string;
}

export default function AddMembersDialog({
  members,
  boardId,
  boardMembers = [],
}: Props) {
  const [isPending, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const joinedMembersMap = new Map<string, number>();
  if (boardId !== undefined) {
    boardMembers.forEach((member) => {
      joinedMembersMap.set(member.$id, 1);
    });
  }

  const [selectedMembers, setSelectedMembers] = useState(joinedMembersMap);

  function toggleMembers(userId: string) {
    if (selectedMembers.has(userId)) {
      joinedMembersMap.delete(userId);
    } else {
      joinedMembersMap.set(userId, 1);
    }
    setSelectedMembers(joinedMembersMap);
  }

  function handleMembersUpdate() {
    startTransition(async () => {
      await updateMembersList(boardId, [...selectedMembers.keys()]);
      setIsDialogOpen(false);
      toast({ description: "Board members list updated" });
    });
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex self-start">
          <UserPlus className="w-4 h-4 mr-2" /> Add Members
        </Button>
      </DialogTrigger>

      <DialogOverlay className="fixed inset-0 bg-neutral-800 bg-opacity-60" />
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="m-0 mb-5 text-lg font-medium">
            Add Members to Board
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-2">
          {members?.map((user) => (
            <div
              className={`flex cursor-pointer px-4 py-2 rounded items-center gap-3 ${
                selectedMembers.has(user.$id) ? "bg-muted" : "hover:bg-card"
              }`}
              onClick={() => toggleMembers(user.$id)}
              key={user.$id}
            >
              <MyAvatar src={sampleAvatar} alt={user.name} fallback="AK" />
              <div className="flex flex-col">
                <h4>{user.name}</h4>
                <span className="text-secondary">{user.email}</span>
              </div>
            </div>
          ))}
        </div>

        <DialogFooter>
          <div className="flex justify-end mt-6">
            <Button onClick={handleMembersUpdate}>
              {isPending ? <Loader2 /> : "Save changes"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
