import { Card, Hand } from "./hand.model";
import { Strategy } from "./strategy.model";

class PlayerStats {
  points: number = 0;
  numRoundsWon: number = 0;

  addPoints(value: number): void {
    this.points += value;
  }

  incNumRoundsWon(): void {
    this.numRoundsWon++;
  }

  clear(): void {
    this.points = 0;
    this.numRoundsWon = 0;
  }

  toString(): string {
    return `total: ${this.points} numRounds: ${this.numRoundsWon}`;
  }
}

export class Bid {
  card: Card;
  player: Player;

  constructor(player: Player, card: Card) {
    this.player = player;
    this.card = card;
  }
}

export class Player {
  isInteractive: boolean = false;
  isTransparent: boolean = false;
  name: string;
  hand: Hand = new Hand();
  strategy: Strategy;
  playerStats: PlayerStats = new PlayerStats();

  constructor(name: string, strategy: Strategy, isInteractive?: boolean) {
    this.name = name;
    this.strategy = strategy;
    if (isInteractive) {
      this.isInteractive = isInteractive;
    }
  }

  getBid(prizeCard: Card, maxCard: number): Bid {
    let card: Card = this.strategy.select(prizeCard, this.hand, maxCard);
    this.hand.removeCard(card);
    let bid: Bid = new Bid(this, card);
    return bid;
  }

  getPlayerStats(): PlayerStats {
    return this.playerStats;
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

export class Players {
  findUser(players: Player[]): Player {
    return players.find((player) => player.isInteractive);
  }
}
