import { connect } from 'react-redux'
import { takeCards } from '../actions'
import Button from '../components/Button'

const mapStateToProps = state => {
  return {
    name: 'take'
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onClick: () => {
      dispatch(takeCards())
    }
  }
}

const Take = connect(
  mapStateToProps,
  mapDispatchToProps
)(Button)

export default Take