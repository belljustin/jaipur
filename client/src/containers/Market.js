import { connect } from 'react-redux'
import { selectMarketCard } from '../actions/cards'
import CardList from '../components/CardList'

const mapStateToProps = state => {
  return {
    cards: state.cards.market,
    selectedCards: state.cards.marketSelected
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCardClick: id => {
      dispatch(selectMarketCard(id))
    }
  }
}

const Market = connect(
  mapStateToProps,
  mapDispatchToProps
)(CardList)

export default Market
