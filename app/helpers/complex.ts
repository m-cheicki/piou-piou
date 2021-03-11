export class Complex {
    private _re: number = 0
    private _im: number = 0

    public get Re(): number { return this._re }
    public get Im(): number { return this._im }

    public constructor(re?: number, im?: number) {
        if (!!re)
            this._re = re
        if (im)
            this._im = im
    }

    public get Magnitude(): number {
        return Math.sqrt(Math.pow(this._re, 2) + Math.pow(this._im, 2))
    }

    public static sum = (...complexes: Complex[]) => {
        let re: number = 0
        let im: number = 0

        if (!!complexes && complexes.length > 0) {
            for (let i = 0; i < complexes.length; i++) {
                re += complexes[i].Re
                im += complexes[i].Im
            }
        }

        return new Complex(re, im)
    }

    public static zip = (re: number[], im: number[]) => {
        return re.map((x, i) => new Complex(x, im[i]))
    }
}