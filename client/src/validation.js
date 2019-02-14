const MAX_HAND = 7;

function countResourceCards(cards) {
  return cards.reduce((acc, c) => acc += (c === 'special') ? 0 : 1, 0);
}

export class Validation {
  // TODO: let consumer know WHY invalid
  static isValidSingle(hand, selectedHand, market, selectedMarket) {
    return (selectedMarket.length === 1       // must be selecting exactly one
      && countResourceCards(hand) < MAX_HAND  // picking one up cant put us over
      && selectedMarket[0] !== 'special'      // none selected are special
      && selectedHand.length === 0);          // none are selected in our hand
  }

  static isValidSpecial(hand, selectedHand, market, selectedMarket) {
    const marketSpecials = market.filter(c => c === 'special');
    const sMarketSpecials = selectedMarket.filter(c => c === 'special');
    return (marketSpecials.length > 0                       // must have some specials cards
      && sMarketSpecials.length === marketSpecials          // all specials must be selected
      && selectedMarket.length === marketSpecials.length    // selected must only be special
      && selectedHand.length === 0);                        // and no cards selected in hand
  }

  static isValidMultiple(hand, selectedHand, market, selectedMarket) {
    // Verify there's an even trade and we're trading at least two cards
    if (selectedHand.length !== selectedMarket.length || selectedHand.length < 2) {
      return false;
    }
    
    // Verify no special cards are selected in the market
    for (let i = 0; i < selectedMarket.length; i++) {
      if (selectedMarket[i] === "special") {
        return false;
      }
    }

    // Verify added cards don't put us over the the max hand limit
    let numSpecialSelected = selectedHand.length - countResourceCards(selectedHand);
    if (countResourceCards(hand) + numSpecialSelected > MAX_HAND) {
      return false;
    }

    // Verify type set of sHand and sMarket don't intersect
    let handTypes = new Set();
    for (let c of selectedHand) {
      handTypes.add(c);
    }
    for (let c of selectedMarket) {
      if (handTypes.has(c)) {
       return false;
      }
    }

    return true;
  }

  static isValidSell(hand, selectedHand) {
    // Check that we're tying to sell SOMETHING
    if (selectedHand < 1) {
      return false;
    }

    // Check that all the sale cards are of the same type
    let name = selectedHand[0];
    for (let c of selectedHand) {
      if (c !== name) {
        return false;
      }
    }

    // Luxury cards require at least two cards be sold
    let luxuryTypes = "^(red|gold|silver)$";
    if (name.match(luxuryTypes) && selectedHand.length < 2) {
      return false;
    }

    return true;
  }

  static selectedCards(cards, selected) {
    let scards = []
    for (let i of selected.keys()) {
      scards.push(cards[i]);
    }
    return scards;
  }
}

export default Validation;
