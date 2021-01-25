import { Hand } from "./hand.model";
import { Strategy } from "./strategy.model";

export class Player {
  name: string;
  hand: Hand;
  strategy: Strategy;

  constructor(name: string, strategy: Strategy) {
    this.name = name;
    this.strategy = strategy;
  }

  setHand(hand: Hand) {
    this.hand = hand;
  }

  toString(): string {
    let result: string = `${this.name} : ${this.hand}\n`;
    return result;
  }
}
