import React from "react"

import { useInput } from "./utils"
import DivCard from "./div_card"

const cardProgress = (card, userTotal, count) =>
    (count * card.chaosValue + userTotal) / (card.chaosValue * card.stackSize)

const Headhunter = ({ cards, userTotal }) => {
    const fiendCountInput = useInput(0)
    const doctorCountInput = useInput(0)

    const fiend = cards["The Fiend"]
    const doctor = cards["The Doctor"]

    const totalProgress =
        Math.min(
            Math.max(
                cardProgress(fiend, userTotal, fiendCountInput.value),
                cardProgress(doctor, userTotal, doctorCountInput.value)
            ) * 100,
            100
        ) || 0

    return (
        <div className="columns">
            <DivCard card={fiend} userTotal={userTotal} count={fiendCountInput} />

            <DivCard card={doctor} userTotal={userTotal} count={doctorCountInput} />

            {/* {totalProgressEl && ReactDOM.createPortal(`${num(totalProgress)}%`)} */}
        </div>
    )
}

export default Headhunter
