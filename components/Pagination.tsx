"use client"

import { cn } from "@/utils/cn";
import { searchParamSetter } from "@/utils/params";
import Link, { LinkProps } from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ReactNode } from "react";

interface PaginationProps {
    page: number
    total: number
}

export default function Pagination({ page, total }: PaginationProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const setSearchParams = searchParamSetter(searchParams);

    const totalPages = Math.ceil(total / 20)

    return (
        <div className="flex gap-8 justify-between md:justify-end">
            <Button
                data-testid="previous-page-button"
                href={{
                    href: pathname,
                    search: setSearchParams("page", (page - 1).toString())
                }}
                disabled={page === 1}
            >
                Anterior
            </Button>
            <Button
                data-testid="next-page-button"
                href={{
                    href: pathname,
                    search: setSearchParams("page", (page + 1).toString())
                }}
                disabled={page === totalPages}
            >
                Próximo
            </Button>
        </div>
    )
}

function Button({ disabled = false, children, ...props }: LinkProps & ({ disabled?: boolean; children: ReactNode; 'data-testid': string })) {
    const baseStyles = "text-white font-medium px-4 py-1.5 rounded"

    if (disabled) {
        return (
            <button data-testid={props["data-testid"]} disabled className={cn("bg-neutral-300", baseStyles)}>{children}</button>
        )
    }

    return (
        <Link {...props} className={cn("bg-[#ff0000]", baseStyles)}>{children}</Link>
    )
}