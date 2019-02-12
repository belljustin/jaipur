import { connect } from 'react-redux';

import Validation from '../validation';
import { takeCards } from '../actions/websockets';
import Button from '../components/Button';

const mapStateToProps = state => {
  return {
    name: 'take',
    disabled: !canTake(state.hand, state.market, state.yourTurn)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(takeCards())
    }
  }
}

const canTake = (hand, market, yourTurn) => {
  return (yourTurn
    && (Validation.isValidSingle(hand, market)
      || Validation.isValidSpecial(hand, market)
      || Validation.isValidMultiple(hand, market))
  );
}

const Take = connect(
  mapStateToProps,
  mapDispatchToProps
)(Button)

export default Take
