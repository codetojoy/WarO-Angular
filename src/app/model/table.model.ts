import { Card, Hand } from "./hand.model";

import { Kitty } from "./hand.model";
import { Player } from "./player.model";

export class Table {
  status: string = "no status";
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
    this.prizeCard = this.kitty.getCards()[0];
    this.kitty.removeCard(this.prizeCard);
    console.log(`TRACER Table aPC ${this.kitty.toString()}`);
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

  /*
  getPrizeCardDisplay(): string {
    let result: string = ".";
    if (this.doesHaveKitty()) {
      result = this.kitty.getCards()[0].getDisplay(this.transparencyMode);
    }
    return result;
  }

  getPrizeCard(): number {
    let result: number = 0;
    if (this.doesHaveKitty()) {
      result = this.kitty.getCards()[0].value;
    }
    return result;
  }
  */

  getStatus(): string {
    return this.status;
  }

  setStatus(status: string): void {
    this.status = status;
  }

  toString(): string {
    let result: string = "";
    result += `kitty: ${this.kitty.toString()}\n`;
    this.players.forEach((player) => (result += `${this.players.toString()}\n`));
    return result;
  }
}
