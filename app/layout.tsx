import { Header } from "@/components/Header";
import { NextAuthProvider } from "@/components/LayoutChildren";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import "@/styles/globals.css";
import { Inter } from "next/font/google";

const fontFamily = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "KanDo",
    description: "Manage your tasks and workflow easily",
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "white" },
        { media: "(prefers-color-scheme: dark)", color: "black" },
    ],
};

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en" suppressHydrationWarning>
            <NextAuthProvider>
                <body
                    className={
                        "min-h-screen bg-background antialiased " +
                        fontFamily.className
                    }
                    suppressHydrationWarning={true}
                >
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                    >
                        <div className="relative flex flex-col min-h-screen">
                            <Header />
                            <div className="flex-1 px-16 mt-8">{children}</div>
                            <Toaster />
                        </div>
                    </ThemeProvider>
                </body>
            </NextAuthProvider>
        </html>
    );
}
