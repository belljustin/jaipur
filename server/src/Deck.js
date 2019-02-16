class Deck {
  constructor() {
    let unshuffledCards = Array(6).fill("broccoli")
      .concat(Array(1).fill("bellpepper"))
      .concat(Array(5).fill("carrot"))
      .concat(Array(8).fill("apple"))
      .concat(Array(8).fill("banana"))
      .concat(Array(10).fill("grape"))
      .concat(Array(5).fill("acorn"));

    this.cards = this.shuffle(unshuffledCards)
			.concat(Array(3).fill("acorn"));
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

  size() {
    return this.cards.length;
  }
};

export default Deck;
