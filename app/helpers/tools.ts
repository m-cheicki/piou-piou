export function linspace(start: number, stop: number, cardinality: number) {
    let arr: number[] = []
    let step: number = (stop - start) / (cardinality - 1)

    for (let i = 0; i < cardinality; i++) {
        arr.push(start + (step * i))
    }

    return arr
}

export function sumArr(values: number[]) {
    let result: number = 0
    if (!!values) {
        // for (let i = 0; i < values.length; i++) {
        //     result += values[i]
        // }
        result = values.reduce((a, b) => a + b, 0)
    }
    return result
}

export function meanArr(values: number[]) {
    let result: number = 0
    if (!!values) {
        result = sumArr(values) / values.length
    }
    return result
}

export function stdArr(values: number[]) {
    let result: number = 0
    if (!!values && values.length > 0) {
        const mean: number = meanArr(values)

        for (let i = 0; i < values.length; i++) {
            result += Math.pow(values[i] - mean, 2)
        }

        result /= values.length - 1
        result = Math.sqrt(result)
    }
    return result
}