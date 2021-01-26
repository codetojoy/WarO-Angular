import { EventEmitter, Injectable } from "@angular/core";

import { Player } from "../model/player.model";
import { Strategy } from "../model/strategy.model";

import { StrategyService } from "./strategy.service";

@Injectable()
export class ConfigService {
  // events for DealerService because it isn't "need to know", whereas StrategyService is
  transparencyModeChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  private isTransparentMode: boolean = true;
  private numCards: number = 30;
  private maxCard: number = this.numCards;
  private numCardsInHand: number = 0;

  constructor(private strategyService: StrategyService) {}

  toggleTransparency(): void {
    this.isTransparentMode = !this.isTransparentMode;
    this.transparencyModeChanged.emit(this.isTransparentMode);
  }

  getPlayers(): Player[] {
    let players: Player[] = [];
    let strategy: Strategy = this.strategyService.getStrategy("default");
    players.push(new Player("Beethoven", strategy));
    players.push(new Player("Chopin", strategy));
    players.push(new Player("Mozart", strategy));
    players.push(new Player("You", strategy, true));
    this.numCardsInHand = this.numCards / (players.length + 1);
    return players;
  }

  getNumCards(): number {
    return this.numCards;
  }

  getNumCardsInHand(): number {
    return this.numCardsInHand;
  }

  getMaxCard(): number {
    return this.maxCard;
  }

  getIsTransparentMode(): boolean {
    return this.isTransparentMode;
  }
}
