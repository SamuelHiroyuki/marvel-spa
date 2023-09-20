"use client"

import { cn } from "@/utils/cn";
import { OrderByType } from "@/utils/orderBy";
import { searchParamSetter } from "@/utils/params";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useMemo } from "react";

export default function HeroesSorter() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const setSearchParams = searchParamSetter();

    const [currentOrder, nextOrder]: [OrderByType, OrderByType] = useMemo(() => {
        const oBy = searchParams.get("orderBy")
        switch (oBy?.toLowerCase()) {
            case "desc": return ["desc", "asc"]
            case "asc":
            default: return ["asc", "desc"]
        }
    }, [searchParams])

    return (
        <Link
            data-testid="orderBy-button"
            href={{
                href: pathname,
                search: setSearchParams("orderBy", nextOrder)
            }}
            className={cn(
                "after:content-['▼'] after:text-[#ff0000] after:text-xs",
                "flex items-center gap-2",
                {
                    "after:rotate-180": currentOrder === "desc"
                }
            )}
        >
            <Image
                src="/hero.svg"
                alt=''
                width={16}
                height={16}
            />
            <p className="text-[#ff0000] font-medium text-sm text-center">
                Ordenar por nome - A/Z
            </p>
        </Link>
    )
}