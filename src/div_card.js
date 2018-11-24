import React from "react"

import { num } from "./utils"

const leagueEnd = new Date(2018, 5 - 1, 28, 4)
const DAYS_LEFT = Math.floor((leagueEnd.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

const DivCard = ({ card, userTotal, count = 0, onChangeCardCount }) => {
    const { name, artFilename, chaosValue, stackSize } = card
    const cardTotal = chaosValue * stackSize
    // take the completed ratio into account, since that is locked in stone
    const cardRemaining = (stackSize - count) * chaosValue

    const imgUrl = `${process.env.PUBLIC_URL}/images/${artFilename}.png`

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
                                        value={count}
                                        onChange={onChangeCardCount}
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
                                            ((count * chaosValue + userTotal) / cardTotal) * 100,
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
