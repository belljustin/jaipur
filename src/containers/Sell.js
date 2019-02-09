import { connect } from 'react-redux'
import { sellCardsCreator, endTurn } from '../actions'
import Button from '../components/Button'

const mapStateToProps = state => {
  return {
    name: 'sell',
    disabled: !state.yourTurn
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onClick: () => {
      sellCardsCreator(dispatch)
        .then(() => dispatch(endTurn()))
    }
  }
}

const Sell = connect(
  mapStateToProps,
  mapDispatchToProps
)(Button)

export default Sell
