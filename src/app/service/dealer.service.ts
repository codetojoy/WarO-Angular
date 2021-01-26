import { Injectable, EventEmitter } from "@angular/core";

import { ConfigService } from "./config.service";

import { Deck } from "../model/deck.model";
import { Card, Hand, Kitty } from "../model/hand.model";
import { Table } from "../model/table.model";
import { Bid, Player, Players } from "../model/player.model";

@Injectable()
export class DealerService {
  private table: Table;
  tableChanged: EventEmitter<Table> = new EventEmitter<Table>();

  constructor(private configService: ConfigService) {
    this.configService.transparencyModeChanged.subscribe((value) => {
      this.table.setTransparencyMode(value);
      // fire event with table ????
      console.log(`TRACER `);
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
    this.table.assignPrizeCard();
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

  // TODO: test
  dealHands(cards: Card[], numCardsInHand: number): Hand[] {
    let hands: Hand[] = [];

    for (let i: number = 0, j: number = cards.length; i < j; i += numCardsInHand) {
      let cardsForHand: Card[] = cards.slice(i, i + numCardsInHand);
      let hand: Hand = new Hand(cardsForHand);
      hands.push(hand);
    }

    return hands;
  }

  playRound(userCard: Card) {
    let user: Player = new Players().findUser(this.table.players);
    let userBid: Bid = new Bid(user, userCard);
    let bids: Bid[] = this.getBids(userBid);
    let winningBid: Bid = this.findWinningBid(bids);
    let winner: Player = winningBid.player;
    this.awardPoints(this.table.prizeCard.value, bids, winner);
    console.log(`TRACER ROUND ${winner.name} WINS prize: ${this.table.prizeCard.value}`);
    this.tableChanged.emit(this.table);
    /*
    // apply bid to user
    // get bids
    // find winner
    // award points
    // fire event
    this.tableChanged.emit(this.table);
    */
  }

  awardPoints(prizeValue: number, bids: Bid[], winner: Player) {
    bids.forEach((bid) => {
      let player: Player = bid.player;
      if (player.name === winner.name) {
        player.getPlayerStats().addPoints(prizeValue);
        player.getPlayerStats().incNumRoundsWon();
      }
    });
  }

  findWinningBid(bids: Bid[]): Bid {
    return bids.reduce((acc, bid) => {
      let result: Bid = bid;
      if (acc && acc.card.value > bid.card.value) {
        result = acc;
      }
      return result;
    }, null);
  }

  getBids(userBid: Bid): Bid[] {
    let bids: Bid[] = [];
    bids.push(userBid);
    this.table.players.forEach((player) => {
      let bid: Bid = player.getBid(this.table.getPrizeCard(), this.configService.getMaxCard());
      bids.push(bid);
    });
    return bids;
  }
}
