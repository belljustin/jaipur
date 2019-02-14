class Deck {
  constructor() {
    let unshuffledCards = Array(6).fill("red")
      .concat(Array(1).fill("gold"))
      .concat(Array(5).fill("silver"))
      .concat(Array(8).fill("pink"))
      .concat(Array(8).fill("green"))
      .concat(Array(10).fill("brown"))
      .concat(Array(5).fill("special"));

    this.cards = this.shuffle(unshuffledCards)
			.concat(Array(3).fill("special"));
  }

  deal(n) {
    const cards = this.cards.slice(-n);
    this.cards = this.cards.slice(0, -n);
    return cards;
  }

  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
	}
};

export default Deck;
