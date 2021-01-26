import { Injectable, EventEmitter } from "@angular/core";

import { ConfigService } from "./config.service";

import { Deck } from "../model/deck.model";
import { Card, Hand, Kitty } from "../model/hand.model";
import { Table } from "../model/table.model";
import { Player } from "../model/player.model";

@Injectable()
export class DealerService {
  private table: Table;
  tableChanged: EventEmitter<Table> = new EventEmitter<Table>();

  constructor(private configService: ConfigService) {
    this.configService.transparencyModeChanged.subscribe((value) => {
      this.table.setTransparencyMode(value);
      // fire event with table ????
      console.log(`TRACER DealerService transparency changed`);
      this.tableChanged.emit(this.table);
    });
  }

  newGame() {
    console.log(`TRACER DealerService newGame`);
    const numCards: number = this.configService.getNumCards();
    const numCardsInHand: number = this.configService.getNumCardsInHand();

    let deck: Deck = new Deck(numCards);
    deck.shuffle();
    // deck.emitLog();
    let hands: Hand[] = this.dealHands(deck.getCards(), numCardsInHand);
    hands.forEach((hand) => console.log(`TRACER hand: ${hand.toString()}`));

    this.table = this.assignToTable(hands, this.configService.getPlayers());
    // fire event with table ????
    console.log(`TRACER TODO fire event with table ${this.table.toString()}`);
    this.tableChanged.emit(this.table);
  }

  assignToTable(hands: Hand[], players: Player[]): Table {
    let kitty: Kitty = null;
    for (let handIndex = 0; handIndex < hands.length; handIndex++) {
      let hand: Hand = hands[handIndex];
      if (handIndex == 0) {
        kitty = hand;
      } else {
        let playerIndex = handIndex - 1;
        players[playerIndex].setHand(hand);
      }
    }

    let table: Table = new Table(kitty, players);
    return table;
  }

  dealHands(cards: Card[], numCardsInHand: number): Hand[] {
    let hands: Hand[] = [];

    let i: number, j: number;

    for (i = 0, j = cards.length; i < j; i += numCardsInHand) {
      let cardsForHand: Card[] = cards.slice(i, i + numCardsInHand);
      let hand: Hand = new Hand(cardsForHand);
      hands.push(hand);
    }

    return hands;
  }
}
