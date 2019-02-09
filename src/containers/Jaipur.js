import { connect } from 'react-redux'

import { Jaipur as JaipurComponent } from '../components/Jaipur'

const mapStateToProps = (state, ownProps) => {
  return {
    gameId: ownProps.match.params.id,
    joinGame: (id) => ownProps.client.joinGame(id)
  }
}

const Jaipur = connect(
  mapStateToProps,
  null
)(JaipurComponent)


export default Jaipur 
