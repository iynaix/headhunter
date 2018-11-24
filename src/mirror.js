import React from "react"

import { useInput } from "./utils"
import DivCard from "./div_card"

const Mirror = ({ cards, userTotal }) => {
    const immortalCountInput = useInput(0)
    const houseOfMirrorsCountInput = useInput(0)

    const immortal = cards["The Immortal"]
    const houseOfMirrors = cards["House of Mirrors"]

    const finalTotal = houseOfMirrors.chaosValue * houseOfMirrors.stackSize

    const immortalTotal = immortalCountInput.value * immortal.chaosValue
    const houseOfMirrorsTotal = houseOfMirrorsCountInput.value * houseOfMirrors.chaosValue

    const totalProgress =
        Math.min(((houseOfMirrorsTotal + immortalTotal + userTotal) / finalTotal) * 100, 100) || 0

    return (
        <div className="columns">
            <DivCard card={immortal} userTotal={userTotal} count={immortalCountInput} />

            <DivCard card={houseOfMirrors} userTotal={userTotal} count={houseOfMirrorsCountInput} />

            {/* {totalProgressEl && ReactDOM.createPortal(`${num(totalProgress)}%`, totalProgressEl)} */}
        </div>
    )
}

export default Mirror
