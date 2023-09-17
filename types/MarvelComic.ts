interface MarvelUrl {
    type: "detail"
    url: string
}

interface MarvelDates {
    type: "onsaleDate" | "focDate"
    date: string
}

export interface MarvelComic {
    id: number
    title: string
    urls: MarvelUrl[]
    dates: MarvelDates[]
    thumbnail: {
        path: string
        extension: string
    },
}