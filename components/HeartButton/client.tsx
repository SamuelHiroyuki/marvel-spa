"use client"

import Image from "next/image";
import { cn } from "@/utils/cn";
import { useCallback } from "react";
import { addToCookies } from "./actions";
import { toast } from "react-toastify";
import { usePathname } from "next/navigation";

export interface HeartButtonProps {
    isChecked: boolean
    dimension?: number
    characterId: number
    className?: string
}

export default function HeartButtonClient({
    characterId,
    dimension = 16,
    className,
    isChecked
}: HeartButtonProps) {
    const pathname = usePathname()

    const onSubmit = useCallback(async (data: FormData) => {
        const { message, icon, type } = await addToCookies(data, pathname === "my-favorites")
        toast(message, { icon, type, autoClose: 2000 })
    }, [pathname])

    return (
        <form action={onSubmit}>
            <input type="text" name="characterId" hidden defaultValue={characterId} />
            <button
                type="submit"
                aria-label="favorite"
                className={cn("flex flex-col items-center justify-center group", className)}
            >
                <Image
                    src="/fav-hover.svg"
                    alt=''
                    className='group-hover:block hidden'
                    width={dimension}
                    height={dimension}
                />
                <Image
                    src={isChecked ? "/fav-filled.svg" : "/fav-empty.svg"}
                    alt=''
                    className='group-hover:hidden block'
                    width={dimension}
                    height={dimension}
                />
            </button>
        </form>
    )
}
