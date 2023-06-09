"use client";

import { addColumn } from "@/lib/columnActions";
import { DialogOverlay } from "@radix-ui/react-dialog";
import { Columns, Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { useToast } from "./ui/use-toast";

interface Props {
  boardId: string;
}

export default function AddColumnDialog({ boardId }: Props) {
  const [isPending, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  function handleColumnDelete(data: FormData) {
    startTransition(async () => {
      await addColumn(data, boardId);
      setIsDialogOpen(false);
      toast({ description: "New column added" });
    });
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Columns size={16} className="mr-2" />
          Add column
        </Button>
      </DialogTrigger>

      <DialogOverlay className="fixed inset-0 bg-neutral-800 bg-opacity-60" />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add column</DialogTitle>
        </DialogHeader>
        <form>
          <Input
            name="column-name"
            className="px-4"
            placeholder="Enter column name"
          />
          <DialogFooter className="mt-4">
            <Button formAction={handleColumnDelete} type="submit" size="sm">
              {isPending ? <Loader2 /> : "Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
