"use client"

import { cn } from "@/utils/cn";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

export default function HeartSwitch({ checked = false, disabled = false }: {
    checked?: boolean;
    disabled?: boolean;
}) {
    const pathname = usePathname()
    const { push } = useRouter()

    const nextRoute = useMemo(() => {
        if (pathname === "/my-favorites") return "/"
        return "/my-favorites"
    }, [pathname])

    return (
        <label htmlFor="checkbox"
            className="relative flex gap-4 w-fit items-center"
        >
            <input
                type="checkbox"
                id="checkbox"
                disabled={disabled}
                defaultChecked={checked}
                data-navigation="switch"
                data-route={nextRoute}
                onChange={() => setTimeout(() => push(nextRoute), 160)}
                className="absolute w-14 h-8 opacity-0 z-[1] rounded-2xl peer"
            />
            <div
                className={cn([
                    "w-14 h-8 rounded-2xl bg-[#E4E5E9]",
                    "after:content-[''] after:absolute after:bg-[#ff0000] after:rounded-full transition-all after:w-4 after:h-4",
                    "after:top-1/2 after:-translate-y-1/2 after:left-2",
                    "after:transition-all after:shadow after:shadow-[#ff0000]",
                    "peer-checked:after:bg-white peer-checked:after:shadow-white peer-checked:after:left-8 peer-checked:bg-[#ff0000]",
                ])}
            />
            <div className="flex gap-2 select-none">
                <Image
                    src="/fav-filled.svg"
                    alt=''
                    width={16}
                    height={16}
                />
                <p className="text-[#ff0000] font-medium text-sm text-center">
                    Somente favoritos
                </p>
            </div>
        </label>
    )
}