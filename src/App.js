import React, { Component } from "react"
import { Query } from "react-apollo"
import gql from "graphql-tag"
import keyBy from "lodash/keyBy"

import { LEAGUES } from "./constants"
import Headhunter from "./headhunter"
import Mirror from "./mirror"
import headhunterImg from "./Headhunter.png"
import mirrorImg from "./Mirror.png"

const CARDS_QUERY = gql`
    query Cards {
        ninjaItems(ids: [636, 1476, 1496, 1529]) {
            id
            name
            stackSize
            artFilename
            chaosValue
        }
    }
`

const cardsById = cards => keyBy(cards, "name")

const CARDS_RESPONSE = {
    data: {
        ninjaItems: [
            {
                id: 636,
                name: "House of Mirrors",
                stackSize: 9,
                artFilename: "HouseOfMirrors",
                chaosValue: 3144.75,
            },
            {
                id: 1476,
                name: "The Doctor",
                stackSize: 8,
                artFilename: "TheDoctor",
                chaosValue: 571.68,
            },
            {
                id: 1496,
                name: "The Fiend",
                stackSize: 11,
                artFilename: "TheFiend",
                chaosValue: 357.3,
            },
            {
                id: 1529,
                name: "The Immortal",
                stackSize: 10,
                artFilename: "TheImmortal",
                chaosValue: 303.9,
            },
        ],
    },
}

// TODO: store league in localStorage

class Home extends Component {
    state = {
        activeTab: 0,
        yourTotal: 0,
        cards: undefined,
        // how much of current currency can be converted
        liquidationRatio: 0.6,
        league: LEAGUES[0],
    }

    handleChange = key => e => {
        this.setState({ [key]: e.target.value })
    }

    changeTab = idx => e => {
        this.setState({ activeTab: idx })
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
                            <p className="heading is-size-6">Progress</p>
                            <p id="total_progress" className="title is-size-1" />
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
                                    step={0.1}
                                />
                            </p>
                        </div>
                    </div>
                </nav>
            </section>
        )
    }

    renderLeagueSelect() {
        return (
            <nav className="level" style={{ marginTop: "1rem", marginBottom: "1rem" }}>
                <div className="level-item has-text-centered">
                    <div className="select">
                        <select
                            id="league"
                            name="league"
                            value={this.state.league}
                            onChange={this.handleChange("league")}
                        >
                            {LEAGUES.map(league => (
                                <option key={league} value={league}>
                                    {league}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </nav>
        )
    }

    renderTopTabs() {
        return (
            <div className="tabs is-toggle is-fullwidth">
                <ul>
                    <li className={this.state.activeTab === 0 ? "is-active" : ""}>
                        <button
                            className={`button is-large is-fullwidth ${
                                this.state.activeTab === 0 ? "is-info" : ""
                            }`}
                            onClick={this.changeTab(0)}
                        >
                            <span className="icon is-small">
                                <i className="fas fa-image" />
                            </span>
                            <img
                                src={headhunterImg}
                                alt="Headhunter"
                                style={{ height: "1.5rem" }}
                            />
                        </button>
                    </li>
                    <li className={this.state.activeTab === 1 ? "is-active" : ""}>
                        <button
                            className={`button is-large is-fullwidth ${
                                this.state.activeTab === 1 ? "is-info" : ""
                            }`}
                            onClick={this.changeTab(1)}
                        >
                            <span className="icon is-small">
                                <i className="fas fa-music" />
                            </span>
                            <img src={mirrorImg} alt="Mirror" style={{ height: "1.5rem" }} />
                        </button>
                    </li>
                </ul>
            </div>
        )
    }

    renderContent(cards) {
        cards = cardsById(cards)
        const { yourTotal, liquidationRatio } = this.state
        const userTotal = yourTotal * liquidationRatio

        return (
            <div>
                {this.renderLeagueSelect()}
                {this.renderTopTabs()}
                <div style={{ margin: "2rem" }}>{this.renderTotalHeader()}</div>
                <div>
                    {this.state.activeTab === 0 ? (
                        <Headhunter cards={cards} userTotal={userTotal} />
                    ) : (
                        <Mirror cards={cards} userTotal={userTotal} />
                    )}
                </div>
            </div>
        )
    }

    render() {
        /*
        return (
            <Query query={CARDS_QUERY}>
                {({ loading, error, data: { ninjaItems: cards } }) => {
                    if (loading) {
                        // TODO: loading spinner
                        return null
                    }
                    if (error) {
                        console.error(error)
                        return null
                    }

                    return this.renderContent(cards)
                }}
            </Query>
        )
        */
        return this.renderContent(CARDS_RESPONSE.data.ninjaItems)
    }
}

export default Home
