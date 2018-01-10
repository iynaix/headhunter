import React from "react"

import { formatNumber } from "./utils"

const LEAGUE_END = new Date(2018, 3 - 1, 6, 4)
const daysLeft = Math.floor((LEAGUE_END.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

const percent = (current, total) => (total === 0 ? 100 : current / total * 100)

const DivCard = ({
    total,
    mirror,
    cardName,
    cardImage,
    cardValue,
    cardCount = 0,
    completedRatio,
    numCards,
    onChangeCardCount,
}) => {
    const cardTotal = cardValue * numCards
    // take the completed ratio into account, since that is locked in stone
    const cardRemaining = (1 - completedRatio) * cardTotal

    return (
        <div className="column">
            <div className="card">
                <div className="card-image">
                    <figure className="image">
                        <img alt={cardName} src={cardImage} />
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
                                        max={numCards}
                                        value={cardCount}
                                        onChange={onChangeCardCount}
                                        style={{ width: 50, marginRight: 8 }}
                                    />
                                    {" of "}
                                    {numCards}
                                </td>
                            </tr>
                            <tr>
                                <td className="has-text-right">Total Required</td>
                                <td>{formatNumber(cardTotal)}</td>
                            </tr>
                            <tr>
                                <td className="has-text-right">Remaining</td>
                                <td>{formatNumber(cardRemaining)}</td>
                            </tr>
                            <tr>
                                <td className="has-text-right">Chaos Per Day</td>
                                <td>{formatNumber((cardRemaining - total) / daysLeft)}</td>
                            </tr>
                            <tr>
                                <td className="has-text-right">With Mirror</td>
                                <td>
                                    {formatNumber(
                                        completedRatio * 100 +
                                            percent(total + mirror, cardRemaining)
                                    )}%
                                </td>
                            </tr>
                            <tr>
                                <td className="has-text-right">Normal</td>
                                <td>
                                    {formatNumber(
                                        completedRatio * 100 + percent(total, cardRemaining),
                                        100
                                    )}%
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
