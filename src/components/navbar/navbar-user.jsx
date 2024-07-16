import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle,
} from "@nextui-org/navbar";

import { Link } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function NavbarUser() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} className="sticky top-0 ">
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <Link href="/" className="text-green-800">
                        <p className="font-bold text-inherit text-lg text-green-800">TEKIK</p>
                    </Link>
                </NavbarBrand>
            </NavbarContent>
            <NavbarContent justify="end" className="hidden sm:flex">
                <NavbarItem >
                    <Link
                        href="/profil"
                        className="font-semibold text-green-800"
                    >
                        PROFIL
                    </Link>
                </NavbarItem>
                <NavbarItem >
                    <Link
                        href="/berita"
                        className="font-semibold text-green-800"
                    >
                        BERITA
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarMenu>
                <NavbarItem >
                    <Link
                        href="/profil"
                        className=" text-green-800"
                    >
                        PROFIL
                    </Link>
                </NavbarItem>
                <NavbarItem >
                    <Link
                        href="/berita"
                        className=" text-green-800"
                    >
                        BERITA
                    </Link>
                </NavbarItem>
            </NavbarMenu>
        </Navbar >
    );
}
