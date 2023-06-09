import DeleteTaskDialog from "@/components/DeleteTaskDialog";
import EditTaskDialog from "@/components/EditTaskDialog";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getAuthSession } from "@/lib/auth";
import { getTaskById } from "@/lib/taskActions";
import { formateDate } from "@/utils/formatDate";
import { Settings } from "lucide-react";
import { redirect } from "next/navigation";

interface PageProps {
    params: {
        id: string;
    };
}

export default async function TaskPage({ params }: PageProps) {
    const session = await getAuthSession();

    if (!session) {
        redirect("/api/auth/sigin");
    }

    const taskId = params.id;
    const task = await getTaskById(taskId);

    return (
        <>
            <div className="flex items-center justify-between">
                <h2>{task.taskTitle}</h2>

                <div className="flex items-center gap-2">
                    <Button>Assign to me</Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                                <Settings size={16} />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem asChild>
                                <EditTaskDialog task={task} />
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <DeleteTaskDialog task={task} />
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <small className="font-normal">
                {formateDate(task.$createdAt)}
            </small>

            <p className="my-4">{task.taskContent}</p>

            <h4>Discussion</h4>
        </>
    );
}
