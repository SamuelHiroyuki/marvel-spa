import { createHash } from "crypto"
import { SearchParams } from "./params"

export function requestToMarvel(path: string, { init, searchParams }: {
    init?: RequestInit
    searchParams?: SearchParams
} = {}) {
    const ts = Date.now().toString()
    const md5 = createHash('md5')
        .update(`${ts}${process.env.MARVEL_PRIVATE_KEY}${process.env.MARVEL_PUBLIC_KEY}`)
        .digest("hex")

    const url = new URL(path, process.env.MARVEL_API_URL)

    if (searchParams) {
        Object.entries(searchParams)
            .forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    value.forEach(_value => {
                        url.searchParams.append(key, _value)
                    })
                } else if (value) {
                    url.searchParams.append(key, value)
                }
            })
    }

    url.searchParams.append("ts", ts)
    url.searchParams.append("hash", md5)
    url.searchParams.append("apikey", process.env.MARVEL_PUBLIC_KEY!)
    console.log(url.searchParams.toString())
    return fetch(url, init)
}