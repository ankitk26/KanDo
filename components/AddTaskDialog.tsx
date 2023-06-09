"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getPriorities } from "@/lib/priorityActions";
import { addTaskToBoard } from "@/lib/taskActions";
import { DialogOverlay } from "@radix-ui/react-dialog";
import { Loader2, Plus } from "lucide-react";
import { useState, useTransition } from "react";
import useSWR from "swr";
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
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";

interface Props {
  columnId: string;
}

export default function AddTaskDialog({ columnId }: Props) {
  const { data: priorities } = useSWR("/api/priorities", getPriorities);
  const [isPending, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  async function handleNewTask(data: FormData) {
    startTransition(async () => {
      await addTaskToBoard(data, columnId);
      setIsDialogOpen(false);
      toast({ description: "Task Added to column " });
    });
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost">
          <Plus size={16} className="mr-2" /> Add Card
        </Button>
      </DialogTrigger>

      <DialogOverlay className="fixed inset-0 bg-neutral-800 bg-opacity-60" />
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="m-0 mb-5 text-lg font-medium">
            Task Details
          </DialogTitle>
        </DialogHeader>

        <form className="flex flex-col gap-2">
          <fieldset>
            <label htmlFor="task-title">Task Title</label>
            <Input name="task-title" id="task-title" className="px-4 mt-2" />
          </fieldset>

          <fieldset>
            <label htmlFor="task-content">Task Content</label>
            <Textarea
              name="task-content"
              id="task-content"
              className="px-4 mt-2 resize-none"
              rows={5}
            />
          </fieldset>

          <fieldset>
            <label htmlFor="task-priority">Priority</label>
            <Select name="task-priority">
              <SelectTrigger>
                <SelectValue
                  className="mt-2"
                  placeholder="Select Task Priority"
                />
              </SelectTrigger>
              <SelectContent>
                {priorities?.map((priority) => (
                  <SelectItem
                    key={priority.$id}
                    value={priority.$id}
                    className="cursor-pointer"
                  >
                    {priority.priorityDescription}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </fieldset>

          <DialogFooter>
            <Button formAction={handleNewTask} type="submit" className="mt-6">
              {isPending ? <Loader2 /> : "Save Task"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
