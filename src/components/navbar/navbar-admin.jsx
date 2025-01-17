import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle,
} from "@nextui-org/navbar";

import { Link, Button } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { Logout } from "@/services/firebase/firebase";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function NavbarAdmin() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const handleLogout = async () => {
        await Logout();
        router.push("/login");
    }
    const menuItems = ["Profil", "Berita", "Logout"];
    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} className=" shadow-md shadow-slate-400">
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <Link href="/" className="text-black">
                        <p className="font-bold text-inherit text-lg text-black">TEKIK</p>
                    </Link>
                </NavbarBrand>
            </NavbarContent>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                {
                    pathname == '/administrator/profile' ?
                        <>
                            <NavbarItem isActive>
                                <Link href="/administrator/profile" aria-current="page" className="text-lg">
                                    Profil
                                </Link>
                            </NavbarItem>
                            <NavbarItem >
                                <Link color="foreground" href="/administrator/article"  >
                                    Berita
                                </Link>
                            </NavbarItem>
                        </> :
                        <>
                            <NavbarItem>
                                <Link color="foreground" href="/administrator/profile" >
                                    Profil
                                </Link>
                            </NavbarItem>
                            <NavbarItem isActive>
                                <Link href="/administrator/article" aria-current="page" className="text-lg">
                                    Berita
                                </Link>
                            </NavbarItem>
                        </>
                }

            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    <Button onClick={handleLogout} color="danger" href="#" variant="flat">
                        Log out
                    </Button>
                </NavbarItem>
            </NavbarContent>
            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            color={
                                index === 0 && pathname == '/administrator/profile' ? "primary" : index === 1 && pathname === '/administrator/article' ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                            }
                            onClick={index === menuItems.length - 1 ? handleLogout : index === 0 ? () => router.push('/administrator/profile') : () => router.push('/administrator/article')}
                            className="w-full"
                            href="#"
                            size="lg"
                        >
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar >
    );
}
