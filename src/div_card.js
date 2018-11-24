import React from "react"

import { num } from "./utils"

const leagueEnd = new Date(2018, 12 - 1, 8, 4)
const DAYS_LEFT = Math.floor((leagueEnd.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

const DivCard = ({ card, userTotal, count }) => {
    const { name, artFilename, chaosValue, stackSize } = card
    const cardTotal = chaosValue * stackSize
    // take the completed ratio into account, since that is locked in stone
    const cardRemaining = (stackSize - count.value) * chaosValue

    const imgUrl = `https://web.poecdn.com/image/gen/divination_cards/${artFilename}.png`

    return (
        <div className="column">
            <div className="card">
                <div className="card-image">
                    <figure className="image">
                        <img alt={name} src={imgUrl} />
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
                                        max={stackSize}
                                        {...count}
                                        style={{ width: 80, marginRight: 8 }}
                                    />
                                    {" of "}
                                    {stackSize}
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
                                <td>{num(Math.max((cardRemaining - userTotal) / DAYS_LEFT, 0))}</td>
                            </tr>
                            <tr>
                                <td className="has-text-right">Progress</td>
                                <td>
                                    {num(
                                        Math.min(
                                            ((count.value * chaosValue + userTotal) / cardTotal) *
                                                100,
                                            100
                                        )
                                    )}
                                    %
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
