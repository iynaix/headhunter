import React, { Component } from "react"
import ReactDOM from "react-dom"

import { num } from "./utils"
import DivCard from "./div_card"

class Headhunter extends Component {
    state = {
        doctorCount: 0,
        fiendCount: 0,
    }

    handleChange = key => e => {
        this.setState({ [key]: e.target.value })
    }

    getTotalProgress = () => {
        const fiend = this.props.cards["The Fiend"]
        const doctor = this.props.cards["The Doctor"]
        const { userTotal } = this.props

        const fiendProgress =
            (this.state.fiendCount * fiend.chaosValue + userTotal) /
            (fiend.chaosValue * fiend.stackSize)

        const doctorProgress =
            (this.state.doctorCount * doctor.chaosValue + userTotal) /
            (doctor.chaosValue * doctor.stackSize)

        const progress = Math.max(fiendProgress, doctorProgress) * 100

        return Math.min(progress, 100)
    }

    render() {
        const totalProgressEl = document.getElementById("total_progress")
        const { cards, userTotal } = this.props

        return (
            <div className="columns">
                <DivCard
                    card={cards["The Fiend"]}
                    userTotal={userTotal}
                    count={this.state.fiendCount}
                    onChangeCardCount={this.handleChange("fiendCount")}
                />

                <DivCard
                    card={cards["The Doctor"]}
                    userTotal={userTotal}
                    count={this.state.doctorCount}
                    onChangeCardCount={this.handleChange("doctorCount")}
                />

                {/* TOTAL PROGRESS */}
                {totalProgressEl &&
                    ReactDOM.createPortal(`${num(this.getTotalProgress())}%`, totalProgressEl)}
            </div>
        )
    }
}

export default Headhunter
