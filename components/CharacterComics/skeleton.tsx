export default function Skeleton() {
    return (
        <ul role="list" className="animate-pulse grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-x-9 gap-y-12">
            {[...Array(12)].map((_, index) => (
                <li key={index} className="flex flex-col gap-4">
                    <div className="overflow-hidden group h-full">
                        <div
                            className='h-[225px] w-[315px] bg-neutral-400/50'
                        />
                    </div>
                    <p className='rounded-lg bg-neutral-400/70 h-4 w-[100px]' />
                </li>
            ))}
        </ul>
    )
}
