import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Marvel Search Heroes | Page not found',
    description: 'Explore o Universo',
}

export default function Error() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-8">
            <div className='flex flex-col gap-2'>
                <p className="text-neutral-500 font-medium text-8xl text-center mb-4">
                    404
                </p>
                <h2 className="text-neutral-500 font-xs text-center">
                    Parece que o <span className="text-[#ff0000] text-sm font-semibold">Estalo</span> do Thanos levou essa página embora.
                </h2>
            </div>

            <div className='flex flex-col-reverse gap-4 items-center justify-center'>
                <Link
                    href="/"
                    className="bg-neutral-700 hover:bg-[#FF0000] text-white font-medium px-4 py-2 rounded peer transition-all ease-linear"
                >
                    Voltar no tempo?
                </Link>

                <Image
                    src="/hero.svg"
                    alt=''
                    width={32}
                    height={32}
                    className='grayscale peer-hover:grayscale-0 opacity-10 z-[-1] transition-all ease-linear fixed w-auto h-[100cqh] top-0 -right-[550px] -translate-x-1/2'
                />
            </div>
        </div>
    )
}