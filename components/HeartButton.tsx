import { ComponentProps } from "react";
import Image from "next/image";
import { cn } from "@/utils/cn";

interface HeartButtonProps extends Omit<ComponentProps<"button">, "children"> {
    isChecked?: boolean
}


export default function HeartButton({ isChecked = false, className, ...props }: HeartButtonProps) {
    return (
        <button
            {...props}
            className={cn("flex flex-col items-center justify-center group", className)}
        >
            <Image
                src="/fav-hover.svg"
                alt=''
                className='group-hover:block hidden'
                width={16}
                height={16}
            />
            <Image
                src={isChecked ? "/fav-filled.svg" : "/fav-empty.svg"}
                alt=''
                className='group-hover:hidden block'
                width={16}
                height={16}
            />
        </button>
    )
}
