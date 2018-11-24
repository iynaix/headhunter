import React from "react"

import { num, useInput } from "./utils"
import DivCard from "./div_card"

const Mirror = ({ cards, userTotal }) => {
    const immortalCountInput = useInput("immortalCount", 0)
    const houseOfMirrorsCountInput = useInput("houseOfMirrorsCount", 0)

    const immortal = cards["The Immortal"]
    const houseOfMirrors = cards["House of Mirrors"]

    const finalTotal = houseOfMirrors.chaosValue * houseOfMirrors.stackSize

    const immortalTotal = immortalCountInput.value * immortal.chaosValue
    const houseOfMirrorsTotal = houseOfMirrorsCountInput.value * houseOfMirrors.chaosValue

    const totalProgress =
        Math.min(((houseOfMirrorsTotal + immortalTotal + userTotal) / finalTotal) * 100, 100) || 0

    return (
        <>
            <div className="columns">
                <DivCard card={immortal} userTotal={userTotal} count={immortalCountInput} />

                <DivCard
                    card={houseOfMirrors}
                    userTotal={userTotal}
                    count={houseOfMirrorsCountInput}
                />
            </div>
            <div className="section">
                <div className="level-item has-text-centered">
                    <div>
                        <p className="heading is-size-6">Progress</p>
                        <p className="title is-size-1">{num(totalProgress)}%</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Mirror
