import React from "react"
import ReactDOM from "react-dom"

import { CARD_DATA } from "./constants"
import { num } from "./utils"
import DivCard from "./div_card"

class Headhunter extends React.Component {
    state = {
        doctorCount: 0,
        fiendCount: 8,
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
        const { doctor, fiend } = this.props.cards
        const total = this.props.yourTotal * this.props.liquidationRatio

        const fiendProgress =
            (this.state.fiendCount * fiend.chaosValue + total) /
            (fiend.chaosValue * CARD_DATA.fiend.total)

        const doctorProgress =
            (this.state.doctorCount * doctor.chaosValue + total) /
            (doctor.chaosValue * CARD_DATA.doctor.total)

        const progress = Math.max(fiendProgress, doctorProgress) * 100

        return Math.min(progress, 100)
    }

    render() {
        const totalProgressEl = document.getElementById("total_progress")
        const { yourTotal, liquidationRatio, cards } = this.props
        const { doctor, fiend } = cards

        return (
            <div className="columns">
                <DivCard
                    total={yourTotal * liquidationRatio}
                    cardName="Fiend"
                    count={this.state.fiendCount}
                    value={fiend.chaosValue}
                    onChangeCardCount={this.handleChange("fiendCount")}
                />

                <DivCard
                    total={yourTotal * liquidationRatio}
                    cardName="Doctor"
                    count={this.state.doctorCount}
                    value={doctor.chaosValue}
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
