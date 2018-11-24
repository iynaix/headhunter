import React, { useState } from "react"
import ReactDOM from "react-dom"

import { num } from "./utils"
import DivCard from "./div_card"

const cardProgress = (card, userTotal, count) =>
    (count * card.chaosValue + userTotal) / (card.chaosValue * card.stackSize)

const Headhunter = ({ cards, userTotal }) => {
    const totalProgressEl = document.getElementById("total_progress")

    const [fiendCount, setFiendCount] = useState(0)
    const [doctorCount, setDoctorCount] = useState(0)

    const fiend = cards["The Fiend"]
    const doctor = cards["The Doctor"]

    const totalProgress =
        Math.min(
            Math.max(
                cardProgress(fiend, userTotal, fiendCount),
                cardProgress(doctor, userTotal, doctorCount)
            ) * 100,
            100
        ) || 0

    return (
        <div className="columns">
            <DivCard
                card={fiend}
                userTotal={userTotal}
                count={fiendCount}
                onChangeCardCount={setFiendCount}
            />

            <DivCard
                card={doctor}
                userTotal={userTotal}
                count={doctorCount}
                onChangeCardCount={setDoctorCount}
            />

            {/* {totalProgressEl && ReactDOM.createPortal(`${num(totalProgress)}%`)} */}
        </div>
    )
}

export default Headhunter
