import { connect } from 'react-redux'
import { sellCards } from '../actions'
import Button from '../components/Button'

const mapStateToProps = state => {
  return {
    name: 'sell'
  }
}

const mapDispatchToProps = dispatch => {
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
