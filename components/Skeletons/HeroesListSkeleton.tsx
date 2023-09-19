import InputSearch from "@/components/InputSearch";

export default function HeroesListSkeleton() {
    return (
        <>
            <section className="max-w-7xl mx-auto px-6 lg:px-24 flex-1">
                <header className="mb-8 flex flex-col gap-20">
                    <InputSearch disabled query={""} />
                    <div className="animate-pulse">
                        <p className="rounded-lg h-6 mt-2 w-[200px] bg-neutral-400/50" />
                    </div>
                </header>
                <ul role="list" className="animate-pulse grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-9 gap-y-12">
                    {[...Array(20)].map((_, index) => (
                        <li key={index} className="flex flex-col gap-6">
                            <div className='relative group aspect-square overflow-hidden'>
                                <div
                                    className='h-[300px] w-[300px] bg-neutral-400/50'
                                />
                            </div>
                            <div className="flex items-center justify-between gap-4 select-none">
                                <p className='rounded-lg bg-neutral-400/70 h-4 w-[100px]' />
                                <div className="rounded-full bg-neutral-400/70 w-4 h-4" />
                            </div>
                        </li>
                    ))}
                </ul>
            </section>

            <footer className="bg-[#ff0000] h-16 mt-12 flex items-center justify-center">
                <p className="text-white font-medium">Data provided by Marvel.</p>
            </footer>
        </>
    )
}
