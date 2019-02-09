import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import Jaipur from './containers/Jaipur'
import Lobby from './containers/Lobby'

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path="/"
          render={(props) => <Lobby gameIds={[]} />} />
        <Route path="/games/:id" component={Jaipur} />
      </div>
    </Router>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root
