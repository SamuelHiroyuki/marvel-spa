import { MarvelComic } from "@/types/MarvelComic"
import { MarvelListResponse, MarvelResponse } from "@/types/MarvelResponse"
import Image from "next/image"
import Link from "next/link"
import { format, parseISO } from "date-fns"
import { cn } from "@/utils/cn"

async function fetchComics({ characterId }: { characterId: number }): Promise<MarvelResponse<MarvelListResponse<MarvelComic>>> {
    const url = new URL(`api/marvel/characters/${characterId}/comics`, "http://localhost:3000/")

    const request = await fetch(url, { next: { revalidate: 1800 } })

    return await request.json()
}

export default async function CharacterComics({ characterId }: { characterId: number }) {
    const { data } = await fetchComics({ characterId })

    if (!data.results.length) {
        return (
            <div className="flex flex-col items-center justify-center gap-2 h-[600px]">
                <Image
                    src="/comics.svg"
                    alt=''
                    width={32}
                    height={32}
                />
                <p className="text-neutral-500 font-medium text-sm text-center">
                    Nenhum quadrinho encontrado <span className="text-[#ff0000] font-semibold">nessa</span> linha do tempo!
                </p>
            </div>
        )
    }

    return (
        <ul role="list" className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-x-9 gap-y-12">
            {data.results.map(comic => {
                const stringOnSaleDate = comic.dates.find(date => date.type === "onsaleDate")
                const detailsUrl = comic.urls.find(url => url.type === "detail")
                const onSaleDate = stringOnSaleDate ?
                    format(parseISO(stringOnSaleDate.date), "dd/MM/yyyy") : ""

                return (
                    <li key={comic.id} className="flex flex-col gap-4">
                        <div className="overflow-hidden group perspective-1000 flex-1">
                            <div className="preserve-3d h-full grid transition-all duration-500 group-hover:-rotate-y-180">
                                <div className='grid-area-1 backface-hidden'>
                                    <Image
                                        src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                                        alt={comic.title}
                                        className='object-cover h-auto w-full'
                                        width={151}
                                        height={231}
                                        sizes="(min-width: 1300px) 151px, (min-width: 1040px) calc(4.17vw + 98px), (min-width: 760px) 151px, (min-width: 640px) calc(26vw - 41px), (min-width: 360px) 151px, calc(100vw - 192px)"
                                    />
                                </div>
                                <div className={cn(
                                    "grid-area-1 flex flex-col justify-between items-center",
                                    "px-4 lg:py-2 py-4 text-neutral-950 bg-white backface-hidden",
                                    "-rotate-y-180 overflow-hidden relative",
                                )}>
                                    <Image
                                        src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                                        alt={comic.title}
                                        className='z-[-1] blur-sm opacity-50 object-cover h-full w-auto'
                                        fill
                                        sizes="(min-width: 1280px) 151px, (min-width: 1040px) calc(20vw - 67px), (min-width: 640px) calc(33.42vw - 89px), calc(100vw - 192px)"
                                    />
                                    <p title={comic.title} className='text-xs text-center font-extrabold'>
                                        {comic.title}
                                    </p>

                                    {!!detailsUrl?.url && (
                                        <Link href={detailsUrl?.url} target="_blank" className="font-medium">
                                            Ver mais
                                        </Link>
                                    )}

                                    <div>
                                        <p className='text-[10px] text-center font-extrabold'>Publicação</p>
                                        <time
                                            dateTime={stringOnSaleDate?.date}
                                            className='text-xs text-center font-extrabold'
                                        >
                                            {onSaleDate}
                                        </time>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p title={comic.title} className='truncate font-extrabold text-neutral-700'>
                            {comic.title}
                        </p>
                    </li>
                )
            })}
        </ul>
    )
}