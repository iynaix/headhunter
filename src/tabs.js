import React, { Children, useState } from "react"

const Tabs = ({ titles, children }) => {
    const [activeTab, setActiveTab] = useState(0)

    return (
        <div>
            <div className="tabs is-toggle is-fullwidth">
                <ul>
                    {titles.map((title, idx) => (
                        <li key={idx}>
                            <button
                                className={`button is-large is-fullwidth ${
                                    activeTab === idx ? "is-info" : ""
                                }`}
                                onClick={e => {
                                    setActiveTab(idx)
                                }}
                            >
                                <span className="icon is-small">
                                    <i className="fas fa-image" />
                                </span>
                                {title}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <div>{Children.toArray(children)[activeTab]}</div>
        </div>
    )
}

export default Tabs
