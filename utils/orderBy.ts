export enum OrderBy {
    asc,
    desc
}

export type OrderByType = keyof typeof OrderBy

export function parseStringToOrderBy(value: string, initialValue: OrderByType) {
    const lowerCaseValue = value.toLowerCase()
    return Object.values(OrderBy).includes(lowerCaseValue) ?
        lowerCaseValue as OrderByType : initialValue
}