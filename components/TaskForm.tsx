import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Priority } from "@/types";
import { Button } from "./ui/button";
import { DialogFooter } from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

interface Props {
  columnId: string;
  priorities: Priority[] | undefined;
}

export default function TaskForm({ columnId, priorities }: Props) {
  return <div />;
}
