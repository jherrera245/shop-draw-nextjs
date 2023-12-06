import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { auth, UserButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

export const Navbar = () => {
    const { userId } = auth();
    return (
        <nav className="bg-gray-800">
            <div className="container flex">
                <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between pt-5 pb-5">
                    <Logo />
                    <div className="flex gap-x-8 ml-auto">
                        {!userId && (
                            <>
                                <Button
                                    size="sm"
                                    className={cn(
                                        "text-white hover:text-[#fd3d57] transition"
                                    )}
                                    asChild>
                                    <Link href="/sign-in">
                                        Iniciar sesión
                                    </Link>
                                </Button>
                                <Button
                                    size="sm"
                                    className={cn(
                                        "text-white hover:text-[#fd3d57] transition"
                                    )}
                                    asChild>
                                    <Link href="/sign-up">
                                        Registrate gratis
                                    </Link>
                                </Button>
                            </>
                        )}
                        
                        {userId && (
                            <Button size="sm"
                                className={cn("text-white hover:text-[#fd3d57] transition")}
                                asChild>
                                <Link href="/client">
                                    Dashboard
                                </Link>
                            </Button>
                        )}

                        <UserButton
                            afterSignOutUrl="/"
                        />
                        <ModeToggle />
                    </div>
                </div>
            </div>
        </nav>
    );
};
