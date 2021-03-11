export class FFT {

    /**
     * Returns the integer whose value is the reverse of the lowest 'length' bits of the integer 'val'.
     * @param val value
     * @param length number of bits
     */
    private static reverseBits = (val: number, length: number) => {
        let result: number = 0
        for (let i = 0; i < length; i++) {
            result = (result << 1) | (val & 1)
            val >>>= 1
        }
        return result
    }

    /**
     * Computes the circular convolution of the given complex vectors.
     * Each vector's length must be the same.
     * @param x_re x real values
     * @param x_im x imaginary values
     * @param y_re y real values
     * @param y_im y imaginary values
     */
    private static convolve = (x_re: number[], x_im: number[], y_re: number[], y_im: number[]): [number[], number[]] => {
        const n: number = x_re.length

        if (n != x_im.length || n != y_re.length || n != y_im.length) {
            throw "Mismatched lengths"
        }

        x_re = x_re.slice()
        x_im = x_im.slice()
        y_re = y_re.slice()
        y_im = y_im.slice()

        let x_result = FFT.transform(x_re, x_im)
        x_re = x_result[0]
        x_im = x_result[1]

        let y_result = FFT.transform(y_re, y_im)
        y_re = y_result[0]
        y_im = y_result[1]

        for (let i = 0; i < n; i++) {
            const temp: number = x_re[i] * y_re[i] - x_im[i] * y_im[i]
            x_im[i] = x_im[i] * y_re[i] + x_re[i] * y_im[i]
            x_re[i] = temp
        }

        x_result = FFT.transform(x_re, x_im, true)
        x_re = x_result[0]
        x_im = x_result[1]

        // Scaling (because this FFT implementation omits it)
        let out_re: number[] = new Array<number>(n)
        let out_im: number[] = new Array<number>(n)
        for (let i = 0; i < n; i++) {
            out_re[i] = x_re[i] / n
            out_im[i] = x_im[i] / n
        }

        return [out_re, out_im]
    }

    /**
     * Computes the discrete Fourier transform (DFT) of the given complex vector,
     * storing the result back into the vector.
     * The vector can have any length. This is a wrapper function.
     * @param re real values
     * @param im imaginary values
     * @param inverse perform the inverse transform
     */
    public static transform = (re: number[], im?: number[], inverse: boolean = false): [number[], number[]] => {
        const n: number = re.length

        if (n == 0 || n == 1) {
            if (!im) {
                im = new Array(re.length).map(x => 0)
            }
            return [[...re], [...im]]
        } else if ((n & (n - 1)) == 0) {
            // n is power of 2
            return FFT.transformRadix2(re, im, inverse)
        } else {
            // More complicated algorithm for arbitrary sizes
            return FFT.transformBluestein(re, im, inverse)
        }
    }

    /**
     * Computes the discrete Fourier transform (DFT) of the given complex vector,
     * storing the result back into the vector.
     * The vector's length must be a power of 2.
     * Uses the Cooley-Tukey decimation-in-time radix-2 algorithm.
     * @param re real values
     * @param im imaginary values
     * @param inverse perform the inverse transform
     */
    public static transformRadix2 = (re: number[], im?: number[], inverse: boolean = false): [number[], number[]] => {
        const n: number = re.length

        // check that length is a power of 2
        if ((n & (n - 1)) != 0) {
            throw "Length is not a power of 2"
        }

        if (!im) {
            im = new Array<number>(n).fill(0)
        }

        if (n != im.length) {
            throw "Mismatched lengths"
        }

        let _re: number[]
        let _im: number[]

        if (inverse) {
            _re = [...im]
            _im = [...re]
        } else {
            _re = [...re]
            _im = [...im]
        }

        if (n == 0 || n == 1) {
            return [_re, _im]
        }

        // Trigonometric tables
        let cosTable = new Array<number>(n / 2)
        let sinTable = new Array<number>(n / 2)
        for (let i = 0; i < n / 2; i++) {
            cosTable[i] = Math.cos(2 * Math.PI * i / n)
            sinTable[i] = Math.sin(2 * Math.PI * i / n)
        }

        // Bit-reversed addressing permutation
        const levels: number = Math.log2(n)
        for (let i = 0; i < n; i++) {
            const j: number = FFT.reverseBits(i, levels)
            if (j > i) {
                let temp: number = _re[i]

                _re[i] = _re[j]
                _re[j] = temp

                temp = _im[i]

                _im[i] = _im[j]
                _im[j] = temp
            }
        }

        // Cooley-Tukey decimation-in-time radix-2 FFT
        for (let size = 2; size <= n; size *= 2) {
            const halfsize: number = size / 2;
            const tablestep: number = n / size;
            for (let i = 0; i < n; i += size) {
                for (let j = i, k = 0; j < i + halfsize; j++, k += tablestep) {
                    const l: number = j + halfsize;
                    const tpre: number = _re[l] * cosTable[k] + _im[l] * sinTable[k];
                    const tpim: number = -_re[l] * sinTable[k] + _im[l] * cosTable[k];
                    _re[l] = _re[j] - tpre;
                    _im[l] = _im[j] - tpim;
                    _re[j] += tpre;
                    _im[j] += tpim;
                }
            }
        }

        return [_re, _im]
    }

    /**
     * Computes the discrete Fourier transform (DFT) of the given complex vector,
     * storing the result back into the vector.
     * The vector can have any length. This requires the convolution function, 
     * which in turn requires the radix-2 FFT function.
     * Uses Bluestein's chirp z-transform algorithm.
     * @param re real values
     * @param im imaginary values
     * @param inverse perform the inverse transform
     */
    public static transformBluestein = (re: number[], im?: number[], inverse: boolean = false): [number[], number[]] => {
        const n: number = re.length

        if (!im) {
            im = new Array<number>(n).fill(0)
        }

        if (n != im.length) {
            throw "Mismatched lengths"
        }

        let _re: number[]
        let _im: number[]

        if (inverse) {
            _re = [...im]
            _im = [...re]
        } else {
            _re = [...re]
            _im = [...im]
        }

        if (n == 0 || n == 1) {
            return [_re, _im]
        }

        let m: number = 1
        while (m < n * 2 + 1) {
            m *= 2
        }

        // Trigonometric tables
        let cosTable = new Array<number>(n)
        let sinTable = new Array<number>(n)
        for (let i = 0; i < n; i++) {
            const j: number = i * i % (n * 2) // This is more accurate than j = i * i
            cosTable[i] = Math.cos(Math.PI * j / n)
            sinTable[i] = Math.sin(Math.PI * j / n)
        }

        // Temporary vectors and preprocessing
        let areal: Array<number> = new Array<number>(m).fill(0)
        let aimag: Array<number> = new Array<number>(m).fill(0)
        for (let i = 0; i < n; i++) {
            areal[i] = _re[i] * cosTable[i] + _im[i] * sinTable[i]
            aimag[i] = -_re[i] * sinTable[i] + _im[i] * cosTable[i]
        }

        let breal: Array<number> = new Array<number>(m).fill(0)
        let bimag: Array<number> = new Array<number>(m).fill(0)
        breal[0] = cosTable[0]
        bimag[0] = sinTable[0]
        for (let i = 1; i < n; i++) {
            breal[i] = breal[m - i] = cosTable[i]
            bimag[i] = bimag[m - i] = sinTable[i]
        }

        // Convolution
        let result = FFT.convolve(areal, aimag, breal, bimag)
        let creal = result[0]
        let cimag = result[1]

        // Postprocessing
        for (let i = 0; i < n; i++) {
            _re[i] = creal[i] * cosTable[i] + cimag[i] * sinTable[i]
            _im[i] = -creal[i] * sinTable[i] + cimag[i] * cosTable[i]
        }

        return [_re, _im]
    }
}