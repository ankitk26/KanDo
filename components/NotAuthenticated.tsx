import Link from "next/link";
import { Button } from "./ui/button";

export default function NotAuthenticated() {
    return (
        <div>
            <h4>Please log-in</h4>
            <Link href="/login">
                <Button variant="outline" className="mt-4" size="sm">
                    Go to login page
                </Button>
            </Link>
        </div>
    );
}
