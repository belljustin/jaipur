import { connect } from 'react-redux'
import { sellCards } from '../actions/websockets'
import Validation from '../validation'
import Button from '../components/Button'

const mapStateToProps = state => {
  return {
    name: 'sell',
    disabled: !canSell(state.game.yourTurn, state.cards.hand, state.cards.handSelected),
    onClick: () => {
      sellCards(state.cards.handSelected)
    }
  }
}

const canSell = (yourTurn, hand, handSelected) => {
  if (!yourTurn) {
    return false;
  }

  let selectedHand = Validation.selectedCards(hand, handSelected);
  return Validation.isValidSell(hand, selectedHand);
}

const Sell = connect(
  mapStateToProps,
  null
)(Button)

export default Sell
