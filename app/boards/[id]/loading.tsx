import { Skeleton } from "@/components/ui/skeleton";

export default async function BoardPageLoading() {
    return (
        <>
            <div className="flex flex-col w-full">
                <Skeleton className="w-full h-4 bg-accent" />
                <div className="flex items-center gap-2">
                    <Skeleton className="w-10 h-10 mt-2 rounded-full bg-accent" />
                    <Skeleton className="w-32 h-4 bg-accent" />
                </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mt-4">
                {Array.from({ length: 4 }, (_, i) => i + 1).map((index) => (
                    <Skeleton
                        key={index}
                        className="col-span-1 bg-accent h-80"
                    />
                ))}
            </div>
        </>
    );
}
