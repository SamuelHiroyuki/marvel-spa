import Image from "next/image";
import Link from "next/link";

export default function Logo() {
    return (
        <Link href="/" className="flex items-end select-none">
            <Image
                src="/logo.svg"
                alt="Marvel Search Heroes Logo"
                width={176}
                height={96}
                priority
            />
            <p className="mb-[14px] font-bold text-base text-neutral-700">
                Search heroes
            </p>
        </Link>
    )
}