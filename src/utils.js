import { useState } from "react"

export const num = n => {
    if ((n | 0) === n) {
        return n
    }

    n = parseFloat(Math.round(n * 100) / 100).toFixed(2)
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export const useInput = initial => {
    const [v, useV] = useState(initial)
    return {
        value: v,
        onChange: e => {
            useV(e.target.value)
        },
    }
}

export const percent = (current, total) => `${num((current / total) * 100)}%`
