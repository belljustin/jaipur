import { connect } from 'react-redux'
import { sellCards } from '../actions/websockets'
import Validation from '../validation'
import Button from '../components/Button'

const mapStateToProps = state => {
  return {
    name: 'sell',
    disabled: !canSell(state.yourTurn, state.hand),
    onClick: () => {
      sellCards(state.cards.handSelected)
    }
  }
}

const canSell = (yourTurn, hand) => {
  return true;
  // if (!yourTurn) {
  //   return false;
  // }

  // return Validation.isValidSell(hand);
}

const Sell = connect(
  mapStateToProps,
  null
)(Button)

export default Sell
