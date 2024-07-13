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
    const menuItems = ["Profil", "Berita"];
    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} className="bg-slate-100">
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <Link href="/" color="foreground">
                        <p className="font-bold text-inherit">TEKIK</p>
                    </Link>
                </NavbarBrand>
            </NavbarContent>
            <NavbarContent justify="end" className="hidden sm:flex">
                {menuItems.map((item, index) => (
                    <NavbarItem key={`${item}-${index}`}>
                        <Link
                            color={
                                index === 0 && pathname == '/profil' ? "primary" : index === 1 && pathname === '/berita' ? "primary" : index === menuItems.length - 1 ? "foreground" : "foreground"
                            }
                            onClick={() => { index === 0 ? router.push('/profil') : router.push('/berita') }}
                            href="#"
                        >
                            {item}
                        </Link>
                    </NavbarItem>
                ))}
            </NavbarContent>
            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            color={
                                index === 0 && pathname == '/profile' ? "primary" : index === 1 && pathname === '/article' ? "primary" : index === menuItems.length - 1 ? "foreground" : "foreground"
                            }
                            className="w-full"
                            onClick={() => { index === 0 ? router.push('/profil') : router.push('/berita') }}
                            size="lg"
                            href="#"
                        >
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar >
    );
}
