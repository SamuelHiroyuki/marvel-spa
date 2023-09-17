import { MarvelComic } from "@/types/MarvelComic"
import { MarvelListResponse, MarvelResponse } from "@/types/MarvelResponse"
import Image from "next/image"
import Link from "next/link"
import { format, parseISO } from "date-fns"
import { cn } from "@/utils/cn"

async function fetchHero({ characterId }: { characterId: number }): Promise<MarvelResponse<MarvelListResponse<MarvelComic>>> {
    const url = new URL(`api/marvel/characters/${characterId}/comics`, "http://localhost:3000/")

    const request = await fetch(url, { next: { revalidate: 1800 } })

    return await request.json()
}

export default async function CharacterComics({ characterId }: { characterId: number }) {
    const { data } = await fetchHero({ characterId })

    return (
        <ul role="list" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-x-9 gap-y-12">
            {data.results.map(comic => {
                const stringOnSaleDate = comic.dates.find(date => date.type === "onsaleDate")
                const detailsUrl = comic.urls.find(url => url.type === "detail")
                const onSaleDate = stringOnSaleDate ?
                    format(parseISO(stringOnSaleDate.date), "dd/MM/yyyy") : ""
                return (
                    <li key={comic.id} className="flex flex-col gap-4">
                        <div className="overflow-hidden group perspective-1000 h-full">
                            <div className="preserve-3d h-full grid transition-all duration-500 group-hover:-rotate-y-180">
                                <div className='grid-area-1 backface-hidden'>
                                    <Image
                                        src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                                        alt={comic.title}
                                        className='h-full'
                                        width={225}
                                        height={315}
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
                                        className='h-full z-[-1] blur-sm opacity-50'
                                        fill
                                        priority
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