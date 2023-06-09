"use client";

import { deleteColumn } from "@/lib/columnActions";
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
import { useToast } from "./ui/use-toast";

interface Props {
  columnId: string;
}

export default function DeleteColumnAlert({ columnId }: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { toast } = useToast();

  function handleColumnDelete() {
    startTransition(async () => {
      await deleteColumn(columnId);
      toast({ description: "Column deleted" });
    });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex items-center" asChild>
        <Button variant="ghost" size="sm">
          <Trash size={16} className="text-secondary" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogOverlay className="fixed inset-0 bg-neutral-800 bg-opacity-60" />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure to delete this column?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            column data and remove data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleColumnDelete}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
