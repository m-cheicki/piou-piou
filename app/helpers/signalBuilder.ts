/**
 * Signal class
 */
export class SignalBuilder {

    public static sinFormula = (w: number, t: number, phase: number = 0) => {
        return Math.sin((w * t) + phase)
    }

    public static cosFormula = (w: number, t: number, phase: number = 0) => {
        return Math.cos((w * t) + phase)
    }

    /**
     * Generate a signal array
     * @param freq signal's frequency
     * @param phase phase
     * @param duration duration of the signal
     * @param amp amplitude
     * @param formula formula to generate the signal (result of the formula should be between 0 and 1)
     */
    public static generateSignal = (freq: number, phase: number, duration: number, sampleRate: number, amp: number = 100,
        formula: (w: number, t: number, phase: number) => number = SignalBuilder.sinFormula) => {
        const w: number = 2 * Math.PI * freq
        let signal: number[] = []

        amp = Math.min(Math.abs(amp), 100)

        for (let i = 0; i < sampleRate * duration; i++) {
            const t: number = i * (1 / sampleRate)
            let value: number = 0

            value = amp * formula(w, t, phase)

            signal.push(value)
        }

        return signal
    }

    /**
     * Generate a signal array for n periods in freqP frequency
     * @param freq Signal frequency
     * @param phase signal phase
     * @param sampleRate Sample rate
     * @param freqP Frequency for the perdiod
     * @param nP Number of period
     * @param amp Amplitude
     * @param formula formula to compute the signal (result of the formula should be between 0 and 1)
     */
    public static generatePeriod = (freq: number, phase: number, sampleRate: number, freqP: number, nP: number = 1, amp: number = 100,
        formula: (w: number, t: number, phase: number) => number = SignalBuilder.sinFormula) => {
        nP = Math.floor(nP)
        const period: number = (1 / freqP) * nP

        return SignalBuilder.generateSignal(freq, phase, period, sampleRate, amp, formula)
    }
}