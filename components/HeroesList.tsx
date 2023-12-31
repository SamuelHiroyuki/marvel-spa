import Image from "next/image";
import Link from "next/link";
import { MarvelCharacter } from "@/types/MarvelCharacters";
import FavoriteButton from "./FavoriteButton";

interface HeroesListProps {
    heroes: MarvelCharacter[]
}

export default function HeroesList({ heroes }: HeroesListProps) {
    if (!heroes.length) {
        return (
            <div className="flex flex-col items-center justify-center mt-36 gap-2">
                <Image
                    src="/hero.svg"
                    alt=''
                    width={32}
                    height={32}
                />
                <p className="text-neutral-500 font-medium text-sm text-center">
                    Nenhum herói encontrado <span className="text-[#ff0000] font-semibold">nesse</span> universo!
                </p>

                <Link href="/" className="bg-[#ff0000] hover:bg-[#AA0000] text-white font-medium px-4 py-2 rounded mt-4">
                    Voltar ao início?
                </Link>
            </div>
        )
    }

    return (
        <ul role="list" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-9 gap-y-12">
            {heroes.map((hero, index) => (
                <li key={hero.id} className="flex flex-col gap-6" data-testid={`HeroesList__item-${index}`}>
                    <Link
                        href={`/characters/${hero.name.replace(/\//g, "__")}`}
                        className='relative group aspect-square overflow-hidden'
                    >
                        <Image
                            src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
                            alt=''
                            className='object-cover object-left w-full h-full'
                            width={300}
                            height={300}
                            priority={index === 0}
                        />
                        <div className="absolute w-full p-3 bg-[#ff0000] inset-0 translate-y-100_4 group-hover:bg-opacity-50 group-hover:translate-y-0 transition-all">
                            <p className="line-clamp-4 font-medium text-white text-sm">
                                {hero.description || hero.name}
                            </p>
                        </div>
                    </Link>
                    <div className="flex items-center justify-between gap-4 select-none">
                        <p title={hero.name} className='truncate font-extrabold text-neutral-700'>
                            {hero.name}
                        </p>
                        <div className="min-w-[16px]">
                            <FavoriteButton characterId={hero.id} />
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}