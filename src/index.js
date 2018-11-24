import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import registerServiceWorker from "./registerServiceWorker"

import ApolloClient, { InMemoryCache } from "apollo-boost"
import { ApolloProvider } from "react-apollo"

const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "https://poeapi.com/",
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById("root")
)
registerServiceWorker()
