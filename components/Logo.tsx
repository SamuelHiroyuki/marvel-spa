import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";

export default function Logo({ small = false }: { small?: boolean }) {
    return (
        <Link href="/" className={cn("flex items-center sm:items-end select-none flex-col sm:flex-row", { "sm:min-w-[300px] gap-4 sm:items-center": small })}>
            <Image
                src="/logo.svg"
                alt="Marvel Search Heroes Logo"
                width={small ? 132 : 176}
                height={small ? 52 : 96}
                priority
                className="mix-blend-multiply"
            />
            <p className={cn("font-bold text-base text-neutral-700", { "mb-[14px]": !small })}>
                Search heroes
            </p>
        </Link>
    )
}