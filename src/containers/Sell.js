import { connect } from 'react-redux'
import { sellCards } from '../actions'
import Button from '../components/Button'

const mapStateToProps = state => {
  return {
    name: 'sell',
    disabled: !state.yourTurn
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(sellCards())
    }
  }
}

const Sell = connect(
  mapStateToProps,
  mapDispatchToProps
)(Button)

export default Sell
