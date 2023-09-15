import Image from "next/image";
import Link from "next/link";
import HeartButton from "./HeartButton";

const ITEMS = 20

export default function HeroesList() {
    return (
        <ul role="list" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-9 gap-y-12">
            {[...Array(ITEMS)].map((_, index) => (
                <li key={index} className="flex flex-col gap-6">
                    <Link href="#" className='relative group aspect-square overflow-hidden'>
                        <Image
                            src="http://i.annihil.us/u/prod/marvel/i/mg/9/c0/527bb7b37ff55.jpg"
                            alt=''
                            className='object-cover'
                            width={300}
                            height={300}
                        />
                        <div className="absolute w-full p-3 bg-[#ff0000] inset-0 translate-y-100_4 group-hover:bg-opacity-50 group-hover:translate-y-0 transition-all">
                            <p className="line-clamp-4 font-medium text-white text-sm">
                                Wounded, captured and forced to build a weapon by his enemies, billionaire industrialist Tony Stark instead created an advanced suit of armor to save his life and escape captivity. Now with a new outlook on life, Tony uses his money and intelligence to make the world a safer, better place as Iron Man.
                            </p>
                        </div>
                    </Link>
                    <div className="flex items-center justify-between select-none">
                        <p className='truncate font-extrabold text-neutral-700'>Iron Man</p>
                        <HeartButton />
                    </div>
                </li>
            ))}
        </ul>
    )
}