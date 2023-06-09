import DeleteColumnAlert from "./DeleteColumnAlert";
import EditColumnDialog from "./EditColumnDialog";
import { Column } from "@/types";
import { Circle } from "lucide-react";

interface Props {
  column: Column;
  tasksCount: number;
}

export default function ColumnHeader({ column, tasksCount }: Props) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <Circle size={16} className="text-col-blue" />
        <span className="px-2 py-1 text-sm font-medium rounded">
          {column.columnName}
        </span>
        <span className="flex items-center justify-center w-5 h-5 text-sm rounded-full bg-accent">
          {tasksCount}
        </span>
      </div>

      <div className="flex items-center">
        <EditColumnDialog column={column} />
        <DeleteColumnAlert columnId={column.$id} />
      </div>
    </div>
  );
}
