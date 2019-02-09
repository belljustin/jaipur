import { connect } from 'react-redux'

import { Lobby as LobbyComponent } from '../components/Lobby'

const mapStateToProps = (state) => {
  return {
    gameId: []
  }
}

const Lobby = connect(
  mapStateToProps,
  null
)(LobbyComponent)


export default Lobby 
