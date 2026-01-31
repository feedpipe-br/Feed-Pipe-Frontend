import {Button} from "@heroui/react";
import Link from "next/link";
import {ArrowLeft} from "lucide-react";
import {Tooltip} from "@heroui/tooltip";
import {usePathname} from "next/navigation";

export default function BackButton() {
    const path = usePathname();
    if (path === "/dashboard") return;
    return (
        <Tooltip content="Regresar al Dashboard">
            <Button variant={"shadow"} isIconOnly as={Link} href={"/dashboard"} className="absolute top-20 left-2 md:left-10 z-50 text-green-900 rounded-full">
                <ArrowLeft/>
            </Button>
        </Tooltip>
    )
}