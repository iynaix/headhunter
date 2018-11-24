import fetch from "isomorphic-fetch"

const CORS_PROXY_URL = "https://cors-anywhere.herokuapp.com/"
const POE_NINJA_URL = "http://poe.ninja/api/Data/"

export const num = n => {
    if ((n | 0) === n) {
        return n
    }

    n = parseFloat(Math.round(n * 100) / 100).toFixed(2)
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

const fetchNinja = async (endpoint, league) => {
    const now = new Date()
    const dt = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`

    const resp = await fetch(
        `${CORS_PROXY_URL}${POE_NINJA_URL}${endpoint}?league=${league}&date=${dt}`,
        {
            headers: { "X-Requested-With": "XMLHttpRequest" },
        }
    )

    if (resp.status >= 400) {
        throw new Error("Bad response from server")
    }

    return await resp.json()
}

export const percent = (current, total) => `${num((current / total) * 100)}%`

// fetch divination cards
export const fetchCardRates = league => {
    return fetchNinja("GetDivinationCardsOverview", league)

    /*
    if (process.env.NODE_ENV === "production") {
        return fetchNinja("GetDivinationCardsOverview")
    }
    return Promise.resolve(require("./cards.json").lines)
    */
}
