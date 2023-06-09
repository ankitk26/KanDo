import { Board } from "@/types";
import { formateDate } from "@/utils/formatDate";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface Props {
  board: Board;
}

export default function BoardCard({ board }: Props) {
  return (
    <Link href={`/boards/${board.$id}`}>
      <Card className="h-full">
        <CardHeader>
          <CardTitle>{board.boardName}</CardTitle>
          <CardDescription>{board.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <span className="text-sm text-secondary">
            Created at {formateDate(board.$createdAt)}
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}
