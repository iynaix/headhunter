import { useState } from "react"

export const num = n => {
    if ((n | 0) === n) {
        return n
    }

    n = parseFloat(Math.round(n * 100) / 100).toFixed(2)
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export const useInput = (key, initial) => {
    const [v, useV] = useState(() => {
        let local = localStorage.getItem("poeProgress")
        local = local ? JSON.parse(local) : {}

        // use existing localStorage value
        if (key in local) {
            return local[key]
        }

        // use provided default and store new value in localStorage
        localStorage.setItem("poeProgress", JSON.stringify({ ...local, [key]: initial }))
    })

    return {
        value: v,
        onChange: e => {
            const { value } = e.target
            useV(value)

            let local = localStorage.getItem("poeProgress")
            local = local ? JSON.parse(local) : {}

            // update new value in localStorage
            localStorage.setItem("poeProgress", JSON.stringify({ ...local, [key]: value }))
        },
    }
}

export const percent = (current, total) => `${num((current / total) * 100)}%`
