import { Card, Hand } from "./hand.model";

export interface Strategy {
  select(prizeCard: Card, hand: Hand): Card;
}
