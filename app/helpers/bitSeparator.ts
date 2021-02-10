/**
 * Class that provide functions to separate bit from a number
 */
export class BitSeparator {
    /**
     * Separate bits from a number
     * @param n number
     * @param bitsPerElement bits per element
     * @param nbElement number of element wanted
     */
    public static split = (n: number, bitsPerElement: number, nbElement?: number): number[] => {
        if (bitsPerElement < 1 || !Number.isInteger(bitsPerElement)) {
            throw "Bits per element has to be greeter or equal to 1"
        }

        n = Math.abs(n)
        const mask: number = Math.pow(2, bitsPerElement) - 1
        let result: number[] = []

        while (n != 0) {
            const val: number = n & mask
            result.unshift(val)
            n = n >> bitsPerElement
        }

        if (nbElement && result.length > nbElement) {
            result = result.slice(result.length - nbElement)
        }

        for (let i = result.length; nbElement && i < nbElement; i++) {
            result.unshift(0)
        }

        return result
    }

    /**
     * Assemble separated array of bits
     * @param arr array of element
     * @param bitsPerElement bits per element
     */
    public static assemble = (arr: number[], bitsPerElement: number) => {
        if (bitsPerElement < 1 || !Number.isInteger(bitsPerElement)) {
            throw "Bits per element has to be greeter or equal to 1"
        }

        let result: number = 0
        const base: number = Math.pow(2, bitsPerElement)

        for (let i = 0; i < arr.length; i++) {
            const val: number = arr[i]
            result += val * Math.pow(base, arr.length - i - 1)
        }

        return result
    }

    /**
     * Split a string into an array of bits
     * @param str string to split
     * @param bitsPerCaracter bits per caracter
     */
    public static splitString = (str: string, bitsPerCaracter: number = 8) => {
        if (bitsPerCaracter < 1 || !Number.isInteger(bitsPerCaracter)) {
            throw "Bits per element has to be greeter or equal to 1"
        }

        let result: number[] = []

        if (str) {
            for (let i = 0; i < str.length; i++) {
                const c: string = str[i]
                const cVal: number = c.charCodeAt(0)
                const representation: number[] = BitSeparator.split(cVal, bitsPerCaracter, 1)
                result.push(...representation)
            }
        }

        return result
    }

    /**
     * Assemble string from byte array
     * @param bytes bytes of character
     */
    public static assembleString = (bytes: number[]) => {
        let result: string = ''

        for (let i = 0; bytes && i < bytes.length; i++) {
            const val: number = bytes[i]
            const character: string = String.fromCharCode(val)

            result += character
        }

        return result
    }

}