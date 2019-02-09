import { connect } from 'react-redux'

import { Jaipur as JaipurComponent } from '../components/Jaipur'
import SocketClient from '../client';

const ws = 'localhost:3001'
const wsPath = '/test'

const mapStateToProps = (state, ownProps) => {
  return {
    gameId: ownProps.match.params.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    client: new SocketClient(ws, wsPath, dispatch)
  }
}

const Jaipur = connect(
  mapStateToProps,
  mapDispatchToProps
)(JaipurComponent)


export default Jaipur 
