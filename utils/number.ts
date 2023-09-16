export function parseStringToNumber(value: string, defaultReturn: number) {
    const _value = Number(value)

    return isNaN(_value) ? defaultReturn : _value
}

export function parseNumberWithMin(value: string, min: number, defaultReturn: number = min) {
    const _value = parseStringToNumber(value, defaultReturn)

    return _value < min ? min : _value
}