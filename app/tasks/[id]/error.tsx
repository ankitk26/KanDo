"use client";

import { Button } from "@/components/ui/button";

interface Props {
    error: Error;
    reset: () => void;
}

export default function TaskErrorPage({ error, reset }: Props) {
    return (
        <div className="flex flex-col items-center">
            <h3>Some error occured</h3>
            <p>Either the task does not exist or some server error occured</p>
            <pre>{JSON.stringify(error, null, 4)}</pre>

            <div className="flex items-center gap-2 mt-8">
                <Button onClick={() => reset()}>Try Again</Button>
                <Button variant="outline">Go to Home Page</Button>
            </div>
        </div>
    );
}
