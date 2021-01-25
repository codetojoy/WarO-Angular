import { Card, Hand } from "./hand.model";

export interface Strategy {
  select(prizeCard: Card, hand: Hand, maxCard: number): Card;
}

export class NextCard implements Strategy {
  select(prizeCard: Card, hand: Hand, maxCard: number): Card {
    return null;
  }
}
