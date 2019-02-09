class Rules {
  // Determines if the provided market and hand sets can trade
  canTrade(market, hand) {
    const selectedMarket = market.filter(c => c.selected);
    const selectedHand = hand.filter(c => c.selected);
    // Must trade equal number of cards
    if selectedMarket.length !== selectedHand.length {
      return false;
    }

    // Make sure that using camels does not put card count over
    const c = cardCount(hand);
    if (c + selectedHand.filter(c => c.name === 'Camel').length > 7) {
      return false;
    }

    // The sets traded cannot intersect
    let mSet = new Set();
    selectedMarket.forEach(c => mSet.add(c.name))
    return selectedHand.reduce((acc, c) => acc && !mSet.has(c.name));
  }

  // Determines if the cards can be picked up
  canPickUp(selectedMarket, hand) {
    // If picking up camels, you can _only_ pick up camels
    let containsCamels = false;
    let containsOther = false;
    for (c in selectedMarket) {
      if c.name === 'Camel' {
        containsCamels = true;
      } else {
        containsOther = true;
      }
    }
    if (containsCamels) {
      return !containsOther;
    }

    // If picking up others, make sure there is enough room in hand 
    const c = cardCount(hand);
    if (selectedMarket.length + c > 7) {
      return false;
    }

    return true;
  }

  canSell(hand) {
    // TODO: implement rules
    return true;
  }

  // Get number of cards that count towards hand size
  cardCount(hand) {
    return hand.reduce((acc, c) => c.name === 'Camel' ? acc : acc + 1)
  }
}

export default Rules;
