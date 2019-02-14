import { connect } from 'react-redux';

import Validation from '../validation';
import { takeCards } from '../actions/websockets';
import Button from '../components/Button';

const mapStateToProps = state => {
  return {
    name: 'take',
    disabled: !canTake(state.hand, state.market, state.yourTurn),
    onClick: () => {
      takeCards(state.cards.selectedHand, state.cards.selectedMarket)
    }
  }
}

const canTake = (hand, market, yourTurn) => {
  return true;
  //return (yourTurn
  //  && (Validation.isValidSingle(hand, market)
  //    || Validation.isValidSpecial(hand, market)
  //    || Validation.isValidMultiple(hand, market))
  //);
}

const Take = connect(
  mapStateToProps,
  null
)(Button)

export default Take
