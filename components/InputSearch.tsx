"use client"

import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

const FormDataSchema = z.object({
    q: z.string(),
});

type FormData = z.infer<typeof FormDataSchema>

export default function InputSearch({ query }: { query: string }) {
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
                {...register("q")}
                className="w-full font-semibold placeholder:text-[#ff0000]/60 text-[#ff0000]/60 outline-[#ff0000] bg-[#FDECEC] rounded-full pl-20 pr-8 py-3"
                placeholder="Procure por heróis"
            />

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
