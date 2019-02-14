import { connect } from 'react-redux';

import Validation from '../validation';
import { takeCards } from '../actions/websockets';
import Button from '../components/Button';

const mapStateToProps = state => {
  return {
    name: 'take',
    disabled: !canTake(state.cards.hand, state.cards.handSelected, state.cards.market, state.cards.marketSelected, state.game.yourTurn),
    onClick: () => {
      takeCards(state.cards.selectedHand, state.cards.selectedMarket)
    }
  }
}

const canTake = (hand, handSelected, market, marketSelected, yourTurn) => {
  const selectedHand = Validation.selectedCards(hand, handSelected);
  const selectedMarket = Validation.selectedCards(market, marketSelected);

  return (yourTurn
      && (Validation.isValidSingle(hand, selectedHand, market, selectedMarket)
      || Validation.isValidSpecial(hand, selectedHand, market, selectedMarket)
      || Validation.isValidMultiple(hand, selectedHand, market, selectedMarket))
  );
}

const Take = connect(
  mapStateToProps,
  null
)(Button)

export default Take
