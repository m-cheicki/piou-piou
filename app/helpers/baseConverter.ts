/**
 * Class that provide functions to convert number from base 10 to another base
 * or the opposite 
 */
export class BaseConverter {
    private static readonly MINIMUM_BASE_VALUE: number = 2

    /**
     * Convert an unsigned number of base 10 to another base
     * @param n number to convert
     * @param base base number
     */
    public static toBase = (n: number, base: number): number[] => {
        if (base < BaseConverter.MINIMUM_BASE_VALUE || !Number.isInteger(base)) {
            throw "The value of the base is not correct"
        }

        n = Math.abs(n)
        let result: number[] = []

        while (n > 0) {
            const q: number = Math.floor(n / base)
            const r: number = n % base
            result.unshift(r)
            n = q
        }

        return result
    }

    /**
     * Convert an array of digits in base 'base' into a number in base 10
     * @param arr array of digits
     * @param base base
     */
    public static fromBase = (arr: number[], base: number): number => {
        if (base < BaseConverter.MINIMUM_BASE_VALUE || !Number.isInteger(base)) {
            throw "The value of the base is not correct"
        }

        let result: number = 0

        for (let i = 0; arr && i < arr.length; i++) {
            let c: number = arr[i]

            if (!Number.isInteger(c)) {
                console.warn(`Value at index ${i} is not an integer`)
                c = Math.floor(c)
            }

            if (c >= base) {
                console.warn(`Value at index ${i} is greeter than the base`)
                c = base - 1
            }

            const p: number = arr.length - i - 1
            result += c * Math.pow(base, p)
        }

        return result
    }

    /**
     * Convert a number into a signed binary array
     * @param n number ot convert
     * @param size number of bits wanted
     */
    public static numberToSBinary = (n: number, size: number) => {
        const base: number = 2
        let binary = BaseConverter.toBase(n, base)
        binary.unshift(0)

        let result: number[] = binary

        if (n < 0) {
            let flippedBinary: number[] = result.map(b => b === 0 ? 1 : 0)
            const complementNumber: number = BaseConverter.fromBase(flippedBinary, 2) + 1
            result = BaseConverter.toBase(complementNumber, base)
        }

        if (result.length > size - 1) {
            result = result.slice(result.length - size + 1)
        }

        for (let i = result.length; i < size; i++) {
            if (n < 0) {
                result.unshift(1)
            } else {
                result.unshift(0)
            }
        }

        return result
    }

    /**
     * Convert a string into a binary array
     * @param str string to convert
     * @param bitsPerElement bits per element
     */
    public static stringToBinary = (str: string, bitsPerElement: number = 8) => {
        if (bitsPerElement < BaseConverter.MINIMUM_BASE_VALUE || !Number.isInteger(bitsPerElement)) {
            throw "The value of bits per element is not correct"
        }

        let result: number[] = []

        const base: number = 2
        const asciiArray: number[] = str.split('').map(c => c.charCodeAt(0))

        for (let i = 0; i < asciiArray.length; i++) {
            const val: number = asciiArray[i]
            let binary: number[] = BaseConverter.toBase(val, base)

            if (binary.length > bitsPerElement) {
                binary = binary.slice(binary.length - bitsPerElement)
            }

            for (let j = binary.length; j < bitsPerElement; j++) {
                binary.unshift(0)
            }

            result.push(...binary)
        }

        return result
    }

    /**
     * Convert a binary array to a string
     * @param arr binary array
     * @param bitsPerElement bits per element
     */
    public static binaryToString = (arr: number[], bitsPerElement: number = 8) => {
        if (bitsPerElement < BaseConverter.MINIMUM_BASE_VALUE || !Number.isInteger(bitsPerElement)) {
            throw "The value of bits per element is not correct"
        }
        
        let characters: string[] = []

        for (let i = 0; i < arr.length; i += bitsPerElement) {
            const binary: number[] = arr.slice(i, i + bitsPerElement)
            const val: number = BaseConverter.fromBase(binary, 2)
            characters.push(String.fromCharCode(val))
        }

        const result: string = characters.join('')
        return result
    }
}