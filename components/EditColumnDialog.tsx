"use client";

import { updateColumn } from "@/lib/columnActions";
import { Column } from "@/types";
import { DialogOverlay } from "@radix-ui/react-dialog";
import { Loader2, Pencil } from "lucide-react";
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
  column: Column;
}

export default function EditColumnDialog({ column }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  async function handleColumnUpdate(data: FormData) {
    startTransition(async () => {
      await updateColumn(column.$id, {
        columnName: data.get("column-name"),
      });
      toast({
        description: "Column updated",
      });
      setIsDialogOpen(false);
    });
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost">
          <Pencil size={16} className="text-secondary" />
        </Button>
      </DialogTrigger>

      <DialogOverlay className="fixed inset-0 bg-neutral-800 bg-opacity-60" />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit column</DialogTitle>
        </DialogHeader>
        <form>
          <Input
            name="column-name"
            className="px-4"
            placeholder="Enter column name"
            defaultValue={column.columnName}
          />
          <DialogFooter className="mt-4">
            <Button formAction={handleColumnUpdate} type="submit" size="sm">
              {isPending ? <Loader2 /> : "Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
