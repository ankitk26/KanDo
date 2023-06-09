import { getPriorityById } from "@/lib/priorityActions";
import { Task } from "@/types";
import { formateDate } from "@/utils/formatDate";
import Link from "next/link";
import { Badge } from "./ui/badge";

interface Props {
  task: Task;
}

export default async function TaskCard({ task }: Props) {
  const priority = await getPriorityById(task.priorityId);

  return (
    <Link
      href={`/tasks/${task.$id}`}
      className="flex flex-col items-start gap-2 p-4 rounded bg-card"
    >
      <Badge style={{ backgroundColor: priority?.color }}>
        {priority?.priorityDescription}
      </Badge>
      <strong className="text-base">{task.taskTitle}</strong>
      <span className="text-sm">{formateDate(task.$createdAt)}</span>
    </Link>
  );
}
