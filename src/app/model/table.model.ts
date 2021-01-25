import { Hand } from "./hand.model";

import { Kitty } from "./hand.model";
import { Player } from "./player.model";

export class Table {
  kitty: Kitty;
  players: Player[] = [];

  constructor(kitty: Kitty, players: Player[]) {
    this.kitty = kitty;
    this.players = players;
  }

  toString(): string {
    let result: string = "";
    result += `kitty: ${this.kitty.toString()}\n`;
    this.players.forEach((player) => (result += `${this.players.toString()}\n`));
    return result;
  }
}
