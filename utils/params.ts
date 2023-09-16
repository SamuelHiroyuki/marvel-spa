export type SearchParamValue = string | string[] | undefined
export type SearchParams = { [key: string]: SearchParamValue }

export function handleParser<T>(initialValue: T, parser?: (value: string, initialValue: T) => any) {
    return (value: string) => parser?.(value, initialValue) ?? value
}

export function handleServerSearchParam(obj: SearchParams) {
    return <T>(
        key: string,
        initialValue: T,
        parser?: (value: string, initialValue: T) => any
    ) => {
        const value = obj[key]
        if (!(key in obj) || value === undefined) return initialValue

        const _parser = handleParser<T>(initialValue, parser)

        if (Array.isArray(initialValue)) {
            if (Array.isArray(value)) return value.map(_parser) as T;
            return [_parser(value)] as T;
        }

        if (Array.isArray(value)) return _parser(value[0]) as T;

        return _parser(value) as T
    }
}
