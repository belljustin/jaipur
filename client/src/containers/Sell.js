import { connect } from 'react-redux'
import { sellCards } from '../actions/websockets'
import Validation from '../validation'
import Button from '../components/Button'

const mapStateToProps = state => {
  return {
    name: 'sell',
    disabled: !canSell(state.yourTurn, state.hand),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(sellCards())
    }
  }
}

const canSell = (yourTurn, hand) => {
  if (!yourTurn) {
    return false;
  }

  return Validation.isValidSell(hand);
}

const Sell = connect(
  mapStateToProps,
  mapDispatchToProps
)(Button)

export default Sell
