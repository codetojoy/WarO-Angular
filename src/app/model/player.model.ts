import { Card, Hand } from "./hand.model";
import { Strategy } from "./strategy.model";

export class Player {
  isInteractive: boolean = false;
  isTransparent: boolean = false;
  name: string;
  hand: Hand = new Hand();
  strategy: Strategy;

  constructor(name: string, strategy: Strategy, isInteractive?: boolean) {
    this.name = name;
    this.strategy = strategy;
    if (isInteractive) {
      this.isInteractive = isInteractive;
    }
  }

  getIsTransparent(): boolean {
    return this.isTransparent || this.isInteractive;
  }

  setIsTransparent(isTransparent: boolean) {
    this.isTransparent = isTransparent;
  }

  getCards(): Card[] {
    return this.hand.getCards();
  }

  getIsInteractive(): boolean {
    return this.isInteractive;
  }

  hasHand(): boolean {
    return this.hand.getCards().length > 0;
  }

  setHand(hand: Hand) {
    this.hand = hand;
  }

  toString(): string {
    let result: string = `${this.name} : ${this.hand}\n`;
    return result;
  }
}
