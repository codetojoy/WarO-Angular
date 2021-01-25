import { NextCard, Strategy } from "../model/strategy.model";

export class StrategyService {
  getStrategy(name: string): Strategy {
    let strategy: Strategy = new NextCard();
    return strategy;
  }
}
