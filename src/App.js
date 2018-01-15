import React, { Component } from "react"
import "./bulmaswatch.min.css"
import doctorImage from "./TheDoctor.png"
import fiendImage from "./TheFiend.png"
import { fetchCurrencyRates, fetchCardRates } from "./utils"
import DivCard from "./div_card"

const parseCards = cards => {
    const ret = {}

    cards.forEach(card => {
        const name = card.name
            .toLowerCase()
            .split(" ")
            .pop()
        if (name === "doctor" || name === "fiend") {
            ret[name] = card
        }
    })

    return ret
}

class Home extends Component {
    state = {
        yourTotal: 0,
        mirror: undefined,
        cards: undefined,
        doctorCount: 0,
        fiendCount: 8,
        // how much of current currency can be converted
        liquidationRatio: 0.6,
    }

    handleChange = key => e => {
        this.setState({ [key]: e.target.value })
        if (key === "yourTotal") {
            localStorage.setItem(key, e.target.value)
        }
    }

    componentDidMount() {
        // get your total from localStorage
        const yourTotal = localStorage.getItem("yourTotal")
        this.setState({
            yourTotal: parseFloat(yourTotal) || 0,
        })

        // fetch currency
        fetchCurrencyRates().then(currency => {
            const mirror = currency.find(({ currencyTypeName }) =>
                currencyTypeName.startsWith("Mirror")
            )
            this.setState({
                // use the average of buy and sell values
                mirror: (1 / mirror.pay.value + mirror.receive.value) / 2,
            })
        })

        // fetch divination cards
        fetchCardRates().then(cards => {
            this.setState({
                cards: parseCards(cards),
            })
        })
    }

    renderTotalHeader() {
        return (
            <section className="section">
                <nav className="level">
                    <div className="level-item has-text-centered">
                        <div>
                            <p className="heading is-size-6">Total</p>
                            <p className="title">
                                <input
                                    className="input"
                                    type="text"
                                    value={this.state.yourTotal}
                                    onChange={this.handleChange("yourTotal")}
                                />
                            </p>
                        </div>
                    </div>
                    <div className="level-item has-text-centered">
                        <div>
                            <p className="heading is-size-6">Mirror</p>
                            <p className="title">
                                <input
                                    className="input"
                                    type="text"
                                    value={this.state.mirror}
                                    onChange={this.handleChange("mirror")}
                                />
                            </p>
                        </div>
                    </div>
                    <div className="level-item has-text-centered">
                        <div>
                            <p className="heading is-size-6">Liquidation Ratio</p>
                            <p className="title">
                                <input
                                    className="input"
                                    type="number"
                                    value={this.state.liquidationRatio}
                                    onChange={this.handleChange("liquidationRatio")}
                                    min={0}
                                    max={1}
                                    step={0.01}
                                />
                            </p>
                        </div>
                    </div>
                </nav>
            </section>
        )
    }

    render() {
        if (!this.state.mirror || !this.state.cards) {
            return null
        }

        // getMirrorRate(),
        const { doctor, fiend } = this.state.cards

        const completedRatio = this.state.doctorCount / 8 + this.state.fiendCount / 11
        const cardProps = {
            // handle liquidationRatio
            total: this.state.yourTotal * this.state.liquidationRatio,
            mirror: this.state.mirror,
            completedRatio: completedRatio,
        }

        return (
            <div style={{ margin: "2rem" }}>
                {this.renderTotalHeader()}

                <div className="columns">
                    <DivCard
                        {...cardProps}
                        cardName="Fiend"
                        cardImage={fiendImage}
                        cardCount={this.state.fiendCount}
                        cardValue={fiend.chaosValue}
                        numCards={11}
                        onChangeCardCount={this.handleChange("fiendCount")}
                    />

                    <DivCard
                        {...cardProps}
                        cardName="Doctor"
                        cardImage={doctorImage}
                        cardCount={this.state.doctorCount}
                        cardValue={doctor.chaosValue}
                        numCards={8}
                        onChangeCardCount={this.handleChange("doctorCount")}
                    />
                </div>
            </div>
        )
    }
}

export default Home
