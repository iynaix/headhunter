import React from "react"
import { Query } from "react-apollo"
import gql from "graphql-tag"
import keyBy from "lodash/keyBy"

import { LEAGUES } from "./constants"
import { useInput } from "./utils"
import Headhunter from "./headhunter"
import Mirror from "./mirror"
import Tabs from "./tabs"
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

const TotalHeader = ({ leagueInput, yourTotalInput, liquidationRatioInput }) => {
    return (
        <section className="section">
            <nav className="level">
                <div className="level-item has-text-centered" style={{ flexDirection: "column" }}>
                    <p className="heading is-size-6">League</p>
                    <div className="select">
                        <select id="league" name="league" {...leagueInput}>
                            {LEAGUES.map(league => (
                                <option key={league} value={league}>
                                    {league}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="level-item has-text-centered">
                    <div>
                        <p className="heading is-size-6">Total</p>
                        <p className="title">
                            <input className="input" type="text" {...yourTotalInput} />
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
                                {...liquidationRatioInput}
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

const Main = ({ cards }) => {
    cards = cardsById(cards)
    const leagueInput = useInput(LEAGUES[0])
    const yourTotalInput = useInput(0)
    const liquidationRatioInput = useInput(0.6)

    const userTotal = yourTotalInput.value * liquidationRatioInput.value

    return (
        <div>
            <TotalHeader
                leagueInput={leagueInput}
                yourTotalInput={yourTotalInput}
                liquidationRatioInput={liquidationRatioInput}
            />
            <Tabs
                titles={[
                    <img src={headhunterImg} alt="Headhunter" style={{ height: "1.5rem" }} />,
                    <img src={mirrorImg} alt="Mirror" style={{ height: "1.5rem" }} />,
                ]}
            >
                <Headhunter cards={cards} userTotal={userTotal} />
                <Mirror cards={cards} userTotal={userTotal} />
            </Tabs>
        </div>
    )
}

const Home = () => {
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

    return <Main cards={CARDS_RESPONSE.data.ninjaItems} />
}

export default Home
