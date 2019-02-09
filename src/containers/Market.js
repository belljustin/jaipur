import { connect } from 'react-redux'
import { selectMarketCard } from '../actions'
import CardList from '../components/CardList'

const mapStateToProps = state => {
  return {
    cards: state.market
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
