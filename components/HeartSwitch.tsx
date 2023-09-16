import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";

export default function HeartSwitch({ checked = false }: { checked?: boolean }) {
    return (
        <Link href="/favoritos"
            className="relative flex gap-4 w-fit items-center"
        >
            <div
                className={cn([
                    "w-14 h-8 rounded-2xl bg-[#E4E5E9]",
                    "after:content-[''] after:absolute after:bg-[#ff0000] after:rounded-full transition-all after:w-4 after:h-4",
                    "after:top-1/2 after:-translate-y-1/2 after:left-2",
                    " after:transition-all after:shadow after:shadow-[#ff0000]"
                ], {
                    "after:bg-white after:shadow-white after:left-8 bg-[#ff0000]": checked
                })}
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
        </Link>
    )
}