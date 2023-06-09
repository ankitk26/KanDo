"use client";

import { deleteTask } from "@/lib/taskActions";
import { Task } from "@/types";
import { AlertDialogOverlay } from "@radix-ui/react-alert-dialog";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";

interface Props {
  task: Task;
}

export default function DeleteTaskDialog({ task }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  async function handleTaskDelete() {
    startTransition(async () => {
      const boardId = await deleteTask(task);
      router.push(`/boards/${boardId}`);
    });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex items-center" asChild>
        <Button size="sm" variant="ghost">
          <Trash size={16} className="mr-2" /> Delete
        </Button>
      </AlertDialogTrigger>

      <AlertDialogOverlay className="fixed inset-0 bg-neutral-800 bg-opacity-60" />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure to delete this task?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            column data and remove data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleTaskDelete}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
