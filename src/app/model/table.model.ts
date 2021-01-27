import { Card, Hand } from "./hand.model";

import { Kitty } from "./hand.model";
import { Player } from "./player.model";

export class Table {
  isInPlay: boolean = false;
  transparencyMode: boolean = false;
  kitty: Kitty = new Hand();
  players: Player[] = [];
  prizeCard: Card;

  constructor(kitty?: Kitty, players?: Player[]) {
    if (kitty) {
      this.kitty = kitty;
    }
    if (players) {
      this.players = players;
    }
  }

  assignPrizeCard(): void {
    this.isInPlay = true;
    this.prizeCard = this.kitty.getCards()[0];
    this.kitty.removeCard(this.prizeCard);
  }

  getPrizeCard(): Card {
    return this.prizeCard;
  }

  setTransparencyMode(transparencyMode: boolean) {
    this.players.forEach((player) => player.setIsTransparent(transparencyMode));
    this.transparencyMode = transparencyMode;
  }

  getIsTransparent(): boolean {
    return this.transparencyMode;
  }

  doesHaveKitty(): boolean {
    return this.kitty && !this.kitty.isEmpty();
  }

  getIsInPlay(): boolean {
    return this.isInPlay;
  }

  toString(): string {
    let result: string = "";
    result += `kitty: ${this.kitty.toString()}\n`;
    this.players.forEach((player) => (result += `${this.players.toString()}\n`));
    return result;
  }
}
