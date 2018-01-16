import React from "react"

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

    render() {
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
            </div>
        )
    }
}

export default Headhunter
