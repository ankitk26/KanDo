import { Skeleton } from "@/components/ui/skeleton";

export default function HomeLoadingPage() {
    return (
        <div>
            <Skeleton className="w-full h-4 bg-accent" />

            <div className="grid grid-cols-4 gap-4 mt-4">
                {Array.from({ length: 8 }, (_, i) => i + 1).map((index) => (
                    <Skeleton className="h-32 bg-accent" key={index} />
                ))}
            </div>
        </div>
    );
}
