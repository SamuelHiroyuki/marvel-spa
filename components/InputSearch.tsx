"use client"

import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { throttle } from "@/utils/function";
import { MarvelCharacterResponse, MarvelResponse } from "@/types/MarvelResponse";
import { MarvelCharacter } from "@/types/MarvelCharacters";
import { splitString } from "@/utils/string";
import { cn } from "@/utils/cn";

const FormDataSchema = z.object({
    q: z.string(),
});

type FormData = z.infer<typeof FormDataSchema>

interface Option {
    id: number
    complement: string
    highlight: string
    fullname: string
}

async function fetchHeroesByName(q: string): Promise<MarvelResponse<MarvelCharacterResponse<MarvelCharacter>>> {
    const url = new URL("api/marvel/characters", "http://localhost:3000/")
    url.searchParams.append("limit", "5")
    url.searchParams.append("query", q)
    const request = await fetch(url)

    return await request.json()
}

export default function InputSearch({ query, disabled = false }: { query: string; disabled?: boolean }) {
    const [options, setOptions] = useState<Option[]>([])
    const { register, reset, handleSubmit } = useForm<FormData>({
        resolver: zodResolver(FormDataSchema),
        mode: "all",
        defaultValues: {
            q: query
        }
    });
    const router = useRouter();
    const searchParams = useSearchParams();

    const onSubmit = useCallback((data: FormData) => {
        const newSearchParams = new URLSearchParams(searchParams)
        newSearchParams.set("q", data.q)
        router.push(`?${newSearchParams.toString()}`)
    }, [router, searchParams])

    const { onChange, ...inputProps } = useMemo(() => register("q"), [register])

    const onInputChange = useCallback(async (value: string) => {
        if (value.length) {
            const { data } = await fetchHeroesByName(value)
            setOptions(data.results.map(hero => {
                const [highlight, complement] = splitString(hero.name, value)
                return {
                    id: hero.id,
                    complement,
                    highlight,
                    fullname: hero.name,
                }
            }))
        } else {
            setOptions([])
        }
    }, [])

    const throttledFuncao = throttle(onInputChange, 1000);

    useEffect(() => {
        return () => {
            if (!!query) reset() // Limpa o input quando volta pra tela inicial sem o param 'q'
        }
    }, [query, reset])

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-[800px] w-full self-center relative"
        >
            <input type="submit" hidden />
            <input
                type="text"
                {...inputProps}
                onChange={e => {
                    onChange(e)
                    throttledFuncao(e.target.value)
                }}
                disabled={disabled}
                autoComplete="off"
                className="peer w-full font-semibold placeholder:text-[#ff0000]/60 text-[#ff0000]/60 outline-[#ff0000] bg-[#FDECEC] rounded-full pl-20 pr-8 py-3"
                placeholder="Procure por heróis"
            />

            <ul
                className={cn([
                    "z-10 hidden shadow-lg",
                    "absolute bg-[#FDECEC] rounded inset-x-0 mt-2",
                    "py-2 overflow-hidden"
                ], {
                    "peer-focus:block": options.length > 0,
                })}
            >
                {options.map(option => (
                    <li key={option.id} className="text-neutral-500 px-8 py-4 hover:bg-[#ff0000]/20 cursor-pointer">
                        <Link href="#">
                            <span className="text-neutral-700 font-semibold">{option.highlight}</span>
                            {option.complement}
                        </Link>
                    </li>
                ))}
            </ul>

            <button
                tabIndex={-1}
                onClick={handleSubmit(onSubmit)}
                className="absolute left-6 inset-y-0 translate-y-1/2 h-fit"
            >
                <Image
                    src="/search.svg"
                    width={24}
                    height={24}
                    alt=""
                />
            </button>
        </form>
    )
}
