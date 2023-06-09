"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { account } from "@/lib/appwriteAccount";
import { ID } from "appwrite";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function SignUpPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const [isPending, setIsPending] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    async function handleLogin(e: FormEvent) {
        e.preventDefault();
        setIsPending(true);

        try {
            const res = await account.create(
                ID.unique(),
                email,
                password,
                name
            );

            console.log(res);

            // setEmail("");
            // setPassword("");
            setIsPending(false);

            signIn(undefined, { callbackUrl: "/" });

            // router.refresh();
            // router.replace("/");
        } catch (e) {
            const message = (e as any).message;
            console.error(message);
            toast({
                description: message,
                variant: "destructive",
                duration: 3000,
            });
            setIsPending(false);
        }
    }

    return (
        <>
            <h2>Register</h2>

            <form onSubmit={handleLogin} className="flex flex-col gap-4 mt-4">
                <fieldset className="grid items-center grid-cols-8">
                    <label htmlFor="register-name" className="col-span-1">
                        Name
                    </label>
                    <Input
                        value={name}
                        id="register-name"
                        className="col-span-3 px-4"
                        required
                        onChange={(e) => setName(e.target.value)}
                    />
                </fieldset>

                <fieldset className="grid items-center grid-cols-8">
                    <label htmlFor="register-email" className="col-span-1">
                        Email
                    </label>
                    <Input
                        value={email}
                        id="register-email"
                        className="col-span-3 px-4"
                        type="email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </fieldset>

                <fieldset className="grid grid-cols-8">
                    <label htmlFor="register-password" className="col-span-1">
                        Password
                    </label>
                    <Input
                        value={password}
                        type="password"
                        id="register-password"
                        className="col-span-3 px-4 resize-none"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </fieldset>

                <p className="text-secondary">
                    Login{" "}
                    <Link href="/login" className="underline">
                        here
                    </Link>
                </p>

                <Button type="submit" className="flex self-start">
                    {isPending ? <Loader2 /> : "Register"}
                </Button>
            </form>
        </>
    );
}
