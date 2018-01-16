import React from "react"
import ReactDOM from "react-dom"

import { CARD_DATA } from "./constants"
import { num } from "./utils"
import DivCard from "./div_card"

class Mirror extends React.Component {
    state = {
        houseOfMirrorsCount: 0,
        immortalCount: 0,
    }

    handleChange = key => e => {
        this.setState({ [key]: e.target.value })
        localStorage.setItem(key, e.target.value)
    }

    componentDidMount() {
        // init from localStorage
        Object.keys(this.state).forEach(key => {
            this.setState({
                [key]: parseFloat(localStorage.getItem(key)) || 0,
            })
        })
    }

    getTotalProgress = () => {
        const { mirrors, immortal } = this.props.cards
        const total = this.props.yourTotal * this.props.liquidationRatio

        const finalTotal = mirrors.chaosValue * CARD_DATA["house of mirrors"].total

        const immortalTotal = this.state.immortalCount * immortal.chaosValue
        const houseOfMirrorsTotal = this.state.houseOfMirrorsCount * mirrors.chaosValue

        const progress = (houseOfMirrorsTotal + immortalTotal + total) / finalTotal * 100

        return Math.min(progress, 100)
    }

    render() {
        const totalProgressEl = document.getElementById("total_progress")
        const { yourTotal, liquidationRatio, cards } = this.props
        const { mirrors, immortal } = cards

        return (
            <div className="columns">
                <DivCard
                    total={yourTotal * liquidationRatio}
                    cardName="Immortal"
                    count={this.state.immortalCount}
                    value={immortal.chaosValue}
                    onChangeCardCount={this.handleChange("immortalCount")}
                />

                <DivCard
                    total={yourTotal * liquidationRatio}
                    cardName="House of Mirrors"
                    count={this.state.houseOfMirrorsCount}
                    value={mirrors.chaosValue}
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
