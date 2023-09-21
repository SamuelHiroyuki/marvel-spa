export function getApiUrl(path: string) {
    return new URL(path, process.env.API_URL || process.env.NEXT_PUBLIC_API_URL)
}