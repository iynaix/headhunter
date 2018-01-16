import React, { Component } from "react"
import "./bulmaswatch.min.css"

import { fetchCardRates } from "./utils"
import Headhunter from "./headhunter"
import Mirror from "./mirror"

const parseCards = cards => {
    const ret = {}

    cards.forEach(card => {
        const name = card.name
            .toLowerCase()
            .split(" ")
            .pop()
        ret[name] = card
    })

    return ret
}

class Home extends Component {
    state = {
        activeTab: 0,
        yourTotal: 0,
        cards: undefined,
        // how much of current currency can be converted
        liquidationRatio: 0.6,
    }

    componentDidMount() {
        // init from localStorage
        Object.keys(this.state).forEach(key => {
            this.setState({
                [key]: parseFloat(localStorage.getItem(key)) || 0,
            })
        })

        // fetch divination cards
        fetchCardRates().then(cards => {
            this.setState({
                cards: parseCards(cards),
            })
        })
    }

    handleChange = key => e => {
        this.setState({ [key]: e.target.value })
        localStorage.setItem(key, e.target.value)
    }

    changeTab = idx => e => {
        this.setState({ activeTab: idx })
        localStorage.setItem("activeTab", idx)
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

    renderTopTabs() {
        return (
            <div className="tabs is-toggle is-fullwidth">
                <ul>
                    <li className={this.state.activeTab === 0 ? "is-active" : ""}>
                        <a onClick={this.changeTab(0)}>
                            <span className="icon is-small">
                                <i className="fas fa-image" />
                            </span>
                            <span>Headhunter</span>
                        </a>
                    </li>
                    <li className={this.state.activeTab === 1 ? "is-active" : ""}>
                        <a onClick={this.changeTab(1)}>
                            <span className="icon is-small">
                                <i className="fas fa-music" />
                            </span>
                            <span>Mirror</span>
                        </a>
                    </li>
                </ul>
            </div>
        )
    }

    render() {
        if (!this.state.cards) {
            return null
        }

        return (
            <div>
                {this.renderTopTabs()}
                <div style={{ margin: "2rem" }}>{this.renderTotalHeader()}</div>
                <div>
                    {this.state.activeTab === 0 ? (
                        <Headhunter {...this.state} />
                    ) : (
                        <Mirror {...this.state} />
                    )}
                </div>
            </div>
        )
    }
}

export default Home
