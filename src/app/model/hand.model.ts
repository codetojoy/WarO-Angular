export class Card {
  value: number = 0;

  constructor(value: number) {
    this.value = value;
  }

  toString(): string {
    return "" + this.value;
  }
}

export class Hand {
  cards: Card[] = [];

  constructor(cards: Card[]) {
    this.cards = cards;
  }

  getCards(): Card[] {
    return this.cards.slice();
  }

  setCards(cards: Card[]) {
    this.cards = cards;
  }

  toString(): string {
    let result: string = "[";
    this.cards.forEach((card) => (result += ` ${card.toString()} `));
    result += "]";
    return result;
  }
}

export type Kitty = Hand;
