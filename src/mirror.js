import React, { Component } from "react"
import ReactDOM from "react-dom"

import { num } from "./utils"
import DivCard from "./div_card"

class Mirror extends Component {
    state = {
        houseOfMirrorsCount: 0,
        immortalCount: 0,
    }

    handleChange = key => e => {
        this.setState({ [key]: e.target.value })
    }

    getTotalProgress = () => {
        const immortal = this.props.cards["The Immortal"]
        const mirrors = this.props.cards["House of Mirrors"]
        const { userTotal } = this.props

        const finalTotal = mirrors.chaosValue * mirrors.stackSize

        const immortalTotal = this.state.immortalCount * immortal.chaosValue
        const houseOfMirrorsTotal = this.state.houseOfMirrorsCount * mirrors.chaosValue

        const progress = ((houseOfMirrorsTotal + immortalTotal + userTotal) / finalTotal) * 100

        return Math.min(progress, 100)
    }

    render() {
        const totalProgressEl = document.getElementById("total_progress")
        const { cards, userTotal } = this.props

        return (
            <div className="columns">
                <DivCard
                    card={cards["The Immortal"]}
                    userTotal={userTotal}
                    count={this.state.immortalCount}
                    onChangeCardCount={this.handleChange("immortalCount")}
                />

                <DivCard
                    card={cards["House of Mirrors"]}
                    userTotal={userTotal}
                    count={this.state.houseOfMirrorsCount}
                    onChangeCardCount={this.handleChange("houseOfMirrorsCount")}
                />

                {/* TOTAL PROGRESS */}
                {totalProgressEl &&
                    ReactDOM.createPortal(`${num(this.getTotalProgress())}%`, totalProgressEl)}
            </div>
        )
    }
}

export default Mirror
