import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import Jaipur from './containers/Jaipur'
import Lobby from './containers/Lobby'
import SocketClient from './client'

const ws = 'localhost:3001'
const wsPath = '/test'

const Root = ({ store }) => {
  const client = new SocketClient(ws, wsPath, store.dispatch);

  return (
    <Provider store={store}>
      <Router>
        <div>
          <Route exact path="/"
            render={(props) => <Lobby gameIds={[]} client={client} />} />
          <Route path="/games/:id"
            render={(props) => <Jaipur {...props} client={client} />} />
        </div>
      </Router>
    </Provider>
  )
}

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root
