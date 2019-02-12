const MAX_HAND = 7;
const MARKET_SIZE = 5;

function countResourceCards(cards) {
  return cards.reduce((acc, c) => acc += (c.name === 'special') ? 0 : 1, 0);
}

function selectedCards(cards) {
  return cards.filter(c => c.selected);
}

export class Validation {
  // TODO: let consumer know WHY invalid
  static isValidSingle(hand, market) {
    return (selectedCards(market).length === 1                // must be selecting exactly one
      && countResourceCards(hand) < MAX_HAND                  // picking one up cant put us over
      && selectedCards(market)[0].name !== 'special'          // none selected are special
      && selectedCards(hand).length === 0);                   // none are selected in our hand
  }

  static isValidSpecial(hand, market) {
    const sMarket = selectedCards(market);
    const specials = market.filter(c => c.name === 'special');
    return (specials.length > 0                                 // must have some specials cards
      && specials.reduce((acc, c) => acc && c.selected, true)   // all specials must be selected
      && sMarket.length === specials.length                     // selected must only be special
      && selectedCards(hand).length === 0);                     // and no cards selected in hand
  }

  static isValidMultiple(hand, market) {
    let sHand = selectedCards(hand);
    let sMarket = selectedCards(market);

    // Verify there's an even trade and we're trading at least two cards
    if (sHand.length !== sMarket.length || sHand.length < 2) {
      return false;
    }
    
    // Verify no special cards are selected in the market
    for (let i = 0; i < sMarket.length; i++) {
      if (sMarket[i].name === "special") {
        return false;
      }
    }

    // Verify added cards don't put us over the the max hand limit
    let numSpecialSelected = sHand.length - countResourceCards(sHand);
    if (countResourceCards(hand) + numSpecialSelected > MAX_HAND) {
      return false;
    }

    // Verify type set of sHand and sMarket don't intersect
    let handTypes = new Set();
    for (let c of sHand) {
      handTypes.add(c.name);
    }
    for (let c of sMarket) {
      if (handTypes.has(c.name)) {
       return false;
      }
    }

    return true;
  }

  static isValidPurchase(hand) {
    let sHand = selectedCards(hand);

    // Check that we're tying to sell SOMETHING
    if (sHand < 1) {
      return false;
    }

    // Check that all the sale cards are of the same type
    let name = sHand[0].name;
    for (let c of sHand) {
      if (c.name !== name) {
        return false;
      }
    }

    // Luxury cards require at least two cards be sold
    let luxuryTypes = "^(red|gold|silver)$";
    console.log(name);
    if (name.match(luxuryTypes) && sHand.length < 2) {
      return false;
    }

    return true;
  }
}

export default Validation;
