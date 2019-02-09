import { connect } from 'react-redux'
import { selectHandCard } from '../actions'
import CardList from '../components/CardList'

const mapStateToProps = state => {
  return {
    cards: state.hand
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCardClick: id => {
      dispatch(selectHandCard(id))
    }
  }
}

const Hand = connect(
  mapStateToProps,
  mapDispatchToProps
)(CardList)

export default Hand
