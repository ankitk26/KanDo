import { getColumnsByBoard } from "@/lib/columnActions";
import { Column } from "@/types";
import BoardColumn from "./BoardColumn";

interface Props {
  boardId: string;
}

export default async function BoardColumns({ boardId }: Props) {
  const columnDocuments = await getColumnsByBoard(boardId);

  if (columnDocuments.total === 0) {
    return <p className="text-center text-secondary">No columns added</p>;
  }

  const columns = columnDocuments.documents as Column[];

  return (
    <section className="flex gap-4 mt-4">
      {columns.map(async (column) => (
        <BoardColumn key={column.$id} column={column as Column} />
      ))}
    </section>
  );
}
