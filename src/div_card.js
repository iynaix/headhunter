import React from "react"

import { CARD_DATA } from "./constants"
import { num } from "./utils"

const leagueEnd = new Date(2018, 5 - 1, 28, 4)
const DAYS_LEFT = Math.floor((leagueEnd.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

const DivCard = ({ total, cardName, value, count = 0, onChangeCardCount }) => {
    const CARD = CARD_DATA[cardName.toLowerCase()]

    const cardTotal = value * CARD.total
    // take the completed ratio into account, since that is locked in stone
    const cardRemaining = (CARD.total - count) * value

    return (
        <div className="column">
            <div className="card">
                <div className="card-image">
                    <figure className="image">
                        <img alt={cardName} src={CARD.image} />
                    </figure>
                </div>
                <div className="card-content">
                    <table className="table is-fullwidth">
                        <tbody>
                            <tr>
                                <td className="has-text-right">Cards</td>
                                <td>
                                    <input
                                        className="input is-small"
                                        type="number"
                                        min={0}
                                        max={CARD.total}
                                        value={count}
                                        onChange={onChangeCardCount}
                                        style={{ width: 50, marginRight: 8 }}
                                    />
                                    {" of "}
                                    {CARD.total}
                                </td>
                            </tr>
                            <tr>
                                <td className="has-text-right">Total</td>
                                <td>{num(cardTotal)}</td>
                            </tr>
                            <tr>
                                <td className="has-text-right">Remaining</td>
                                <td>{num(cardRemaining)}</td>
                            </tr>
                            <tr>
                                <td className="has-text-right">Chaos Per Day</td>
                                <td>{num(Math.max((cardRemaining - total) / DAYS_LEFT, 0))}</td>
                            </tr>
                            <tr>
                                <td className="has-text-right">Progress</td>
                                <td>
                                    {num(Math.min((count * value + total) / cardTotal * 100, 100))}%
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default DivCard
