import { connect } from 'react-redux'

import { Lobby as LobbyComponent } from '../components/Lobby'

const mapStateToProps = (state) => {
  return {
    games: state.games
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    listGames: () => ownProps.client.listGames()
  }
}

const Lobby = connect(
  mapStateToProps,
  mapDispatchToProps
)(LobbyComponent)


export default Lobby 
