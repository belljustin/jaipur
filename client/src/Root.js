import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import Jaipur from './containers/Jaipur'
import Lobby from './containers/Lobby'

import './index.css';

const Root = ({ store }) => {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <h1>Jaipur</h1>
          <Route exact path="/"
            render={(props) => <Lobby gameIds={[]} />} />
          <Route path="/games/:id"
            render={(props) => <Jaipur {...props} />} />
          <section id="footer"> 
            <p>
              Styles made by <a href="https://github.com/BcRikko" title="nostalgic-css">B.C. Rikko</a> from <a href="https://github.com/nostalgic-css/NES.css" title="NES.css">NES.css</a> is licensed by <a href="https://github.com/nostalgic-css/NES.css/blob/e7560362e43be4328745be060418ea5ae75da54b/LICENSE" title="MIT License">MIT License</a>
            </p>
            <p>
              Icons made by <a href="http://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>
            </p>
          </section>
        </div>
      </Router>
    </Provider>
  )
}

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root
