import { getTasksByColumn } from "@/lib/taskActions";
import { Column, Task } from "@/types";
import AddTaskDialog from "./AddTaskDialog";
import ColumnHeader from "./ColumnHeader";
import TaskCard from "./TaskCard";

interface Props {
  column: Column;
}

export default async function BoardColumn({ column }: Props) {
  const tasks = await getTasksByColumn(column.$id);

  return (
    <div className="flex-1 p-2 rounded-lg">
      <ColumnHeader column={column} tasksCount={tasks.length} />

      <div className="flex flex-col h-full gap-2 p-2 mt-2 rounded bg-muted">
        {tasks.map((task) => (
          <TaskCard key={task.$id} task={task} />
        ))}
        <AddTaskDialog columnId={column.$id} />
      </div>
    </div>
  );
}
