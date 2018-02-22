import fetch from "isomorphic-fetch"

const CORS_PROXY_URL = "https://cors-anywhere.herokuapp.com/"
const POE_NINJA_URL = "http://poe.ninja/api/Data/"

const getLeague = () => {
    const bestiary = Date.UTC(2018, 3 - 1, 2, 24 - 4)
    if (new Date() - bestiary >= 0) {
        return "Bestiary"
    }
    return "Abyss"
}

export const num = n => {
    if ((n | 0) === n) {
        return n
    }

    n = parseFloat(Math.round(n * 100) / 100).toFixed(2)
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

const fetchNinja = endpoint => {
    const now = new Date()
    const dt = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`

    return fetch(`${CORS_PROXY_URL}${POE_NINJA_URL}${endpoint}?league=${getLeague()}&date=${dt}`, {
        headers: { "X-Requested-With": "XMLHttpRequest" },
    })
        .then(resp => resp.json())
        .then(json => json.lines)
}

export const percent = (current, total) => `${num(current / total * 100)}%`

// fetch divination cards
export const fetchCardRates = () => {
    return fetchNinja("GetDivinationCardsOverview")

    /*
    if (process.env.NODE_ENV === "production") {
        return fetchNinja("GetDivinationCardsOverview")
    }
    return Promise.resolve(require("./cards.json").lines)
    */
}
