import { connect } from 'react-redux'

import { Lobby as LobbyComponent } from '../components/Lobby'
import { listGames } from '../actions/websockets'

const mapStateToProps = (state) => {
  return {
    games: state.games
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    listGames: () => listGames()
  }
}

const Lobby = connect(
  mapStateToProps,
  mapDispatchToProps
)(LobbyComponent)


export default Lobby 
