export interface MarvelResponse<T> {
    attributionText: string
    data: T
}

export interface MarvelListResponse<T> {
    offset: number
    limit: number
    total: number
    count: number
    results: Array<T>
}