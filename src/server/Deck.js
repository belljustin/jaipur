module.exports = class Deck {
  constructor() {
    this.cards = Array(3).fill("red")
      .concat(Array(1).fill("silver"))
      .concat(Array(5).fill("red"))
      .concat(Array(3).fill("special"));
  }

  deal(n) {
    const cards = this.cards.slice(-n)
      .map(c => makeCard(c));
    this.cards = this.cards.slice(0, -n);
    return cards;
  }
};

function makeCard(name) {
  return {
    name: name,
    selected: false,
  };
}
