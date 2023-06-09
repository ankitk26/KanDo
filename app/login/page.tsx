"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPending, setIsPending] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    async function handleLogin(e: FormEvent) {
        e.preventDefault();
        setIsPending(true);
        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
            callbackUrl: "/",
        });

        if (res?.error) {
            toast({
                description: "Invalid Credentials",
                variant: "destructive",
            });
            setIsPending(false);
            return;
        }

        setIsPending(false);

        router.refresh();
        router.replace("/");
    }

    return (
        <>
            <h2>Login</h2>

            <form onSubmit={handleLogin} className="flex flex-col gap-4 mt-4">
                <fieldset className="grid items-center grid-cols-8">
                    <label htmlFor="login-email" className="col-span-1">
                        Email
                    </label>
                    <Input
                        value={email}
                        id="login-email"
                        className="col-span-3 px-4"
                        type="email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </fieldset>

                <fieldset className="grid grid-cols-8">
                    <label htmlFor="login-password" className="col-span-1">
                        Password
                    </label>
                    <Input
                        value={password}
                        type="password"
                        id="login-password"
                        className="col-span-3 px-4 resize-none"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </fieldset>

                <p className="text-secondary">
                    Register{" "}
                    <Link href="/sign-up" className="underline">
                        here
                    </Link>
                </p>

                <Button type="submit" className="flex self-start">
                    {isPending ? <Loader2 /> : "Log in"}
                </Button>
            </form>
        </>
    );
}
