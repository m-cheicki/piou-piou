export class Statistic {

    public static sum = (values: number[]): number => {
        let result: number = 0
        if (!!values) {
            for (let i = 0; i < values.length; i++) {
                result += values[i]
            }
        }
        return result
    }

    public static min = (values: number[]): number => {
        let minVal = values[0]

        for (let i = 0; i < values.length; i++) {
            const val = values[i]
            if (minVal > val) {
                minVal = val
            }
        }

        return minVal
    }

    public static max = (values: number[]): number => {
        let maxVal = values[0]

        for (let i = 0; i < values.length; i++) {
            const val = values[i]
            if (maxVal < val) {
                maxVal = val
            }
        }

        return maxVal
    }

    public static mean = (values: number[]): number => {
        let result: number = 0
        if (!!values) {
            result = Statistic.sum(values) / values.length
        }
        return result
    }

    public static std = (values: number[]): number => {
        let result: number = 0
        if (!!values && values.length > 0) {
            const mean: number = Statistic.mean(values)

            for (let i = 0; i < values.length; i++) {
                result += Math.pow(values[i] - mean, 2)
            }

            result /= values.length - 1
            result = Math.sqrt(result)
        }
        return result
    }
}