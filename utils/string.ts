export function splitString(inputString: string, separator: string) {
    const regex = new RegExp(`^(.*${separator})`, "i");
    const result = inputString.match(regex);

    if (result) {
        return [result[1], inputString.substring(result[1].length)];
    }

    return [inputString];
}