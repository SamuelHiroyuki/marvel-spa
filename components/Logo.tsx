import Image from "next/image";
import Link from "next/link";

export default function Logo() {
    return (
        <Link href="/" className="flex items-end select-none">
            <Image
                src="/logo.svg"
                alt="Marvel Search Heroes Logo"
                width={220}
                height={120}
                priority
            />
            <p className="mb-5 font-bold text-base text-neutral-700">
                Search heroes
            </p>
        </Link>
    )
}