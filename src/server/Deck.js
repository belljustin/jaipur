module.exports = class Deck {
  constructor() {
    this.cards = Array(40).fill("Diamond")
      .concat(Array(9).fill("Ruby"))
      .concat(Array(3).fill("Camel"));
  }

  deal(n) {
    const cards = this.cards.slice(-n)
      .map(c => makeCard(c));
    this.cards = this.cards.slice(0, n);
    return cards;
  }
};

function makeCard(name) {
  return {
    name: name,
    selected: false,
  };
}
