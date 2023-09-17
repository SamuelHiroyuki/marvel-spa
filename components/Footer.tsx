export default function Footer({ attributionText }: { attributionText: string }) {
    return (
        <footer className="bg-[#ff0000] h-16 mt-12 flex items-center justify-center">
            <p className="text-white font-medium">{attributionText}</p>
        </footer>
    )
}