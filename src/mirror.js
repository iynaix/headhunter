import React from "react"

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

    render() {
        const { yourTotal, liquidationRatio, cards } = this.props
        const { mirrors, immortal } = cards

        const completedRatio = this.state.houseOfMirrorsCount / 8 + this.state.immortalCount / 11

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
            </div>
        )
    }
}

export default Mirror
