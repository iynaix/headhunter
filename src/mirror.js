import React, { useState } from "react"
import ReactDOM from "react-dom"

import { num } from "./utils"
import DivCard from "./div_card"

const Mirror = ({ cards, userTotal }) => {
    const totalProgressEl = document.getElementById("total_progress")

    const [immortalCount, setImmortalCount] = useState(0)
    const [houseOfMirrorsCount, setHouseOfMirrorsCount] = useState(0)

    const immortal = cards["The Immortal"]
    const houseOfMirrors = cards["House of Mirrors"]

    const finalTotal = houseOfMirrors.chaosValue * houseOfMirrors.stackSize

    const immortalTotal = immortalCount * immortal.chaosValue
    const houseOfMirrorsTotal = houseOfMirrorsCount * houseOfMirrors.chaosValue

    const totalProgress =
        Math.min(((houseOfMirrorsTotal + immortalTotal + userTotal) / finalTotal) * 100, 100) || 0

    return (
        <div className="columns">
            <DivCard
                card={immortal}
                userTotal={userTotal}
                count={immortalCount}
                onChangeCardCount={setImmortalCount}
            />

            <DivCard
                card={houseOfMirrors}
                userTotal={userTotal}
                count={houseOfMirrorsCount}
                onChangeCardCount={setHouseOfMirrorsCount}
            />

            {/* {totalProgressEl && ReactDOM.createPortal(`${num(totalProgress)}%`, totalProgressEl)} */}
        </div>
    )
}

export default Mirror
