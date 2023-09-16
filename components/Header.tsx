import Logo from "./Logo";

export default function Header() {
    return (
        <header className="flex flex-col items-center gap-4">
            <Logo />
            <div className="flex flex-col items-center gap-2 px-14">
                <h1 className="text-neutral-700 uppercase font-bold text-3xl">Explore o Universo</h1>
                <p className="text-neutral-500 font-medium text-sm text-center">
                    Mergulhe no domínio deslumbrante de todos os personagens que você ama - e aqueles que você descobrirá em breve!
                </p>
            </div>
        </header>
    )
}
