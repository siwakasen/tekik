import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
} from "@nextui-org/navbar";

import { Link, Button } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { Logout } from "@/services/firebase/firebase";
import { useRouter } from "next/navigation";
export default function NavbarAdmin() {
    const router = useRouter();
    const pathname = usePathname();
    const handleLogout = async () => {
        await Logout();
        router.push("/login");
    }
    return (
        <Navbar position="static" isBlurred={true}>
            <NavbarBrand>
                <Link className="font-bold text-inherit" href="/">TEKIK</Link>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                {
                    pathname == '/administrator/profile' ?
                        <>
                            <NavbarItem isActive>
                                <Link href="/administrator/profile" aria-current="page">
                                    PROFIL
                                </Link>
                            </NavbarItem>
                            <NavbarItem >
                                <Link color="foreground" href="/administrator/article" >
                                    ARTIKEL
                                </Link>
                            </NavbarItem>
                        </> :
                        <>
                            <NavbarItem>
                                <Link color="foreground" href="/administrator/profile">
                                    PROFIL
                                </Link>
                            </NavbarItem>
                            <NavbarItem isActive>
                                <Link href="/administrator/article" aria-current="page">
                                    ARTIKEL
                                </Link>
                            </NavbarItem>
                        </>
                }

            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    <Button onClick={handleLogout} color="danger" href="#" variant="flat">
                        Logout
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}
