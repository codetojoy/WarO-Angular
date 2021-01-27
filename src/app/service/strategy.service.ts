import { NextCard, Strategy } from "../model/strategy.model";
import { Constants } from "../util/constants";

export class StrategyService {
  getStrategy(name: string): Strategy {
    let strategy: Strategy = null;
    switch (name) {
      case Constants.STRATEGY_NEXT: {
        strategy = new NextCard();
        break;
      }
      default:
        console.log(`TRACER UNKNOWN strategy: ${name}`);
        strategy = new NextCard();
        break;
    }
    return strategy;
  }
}
