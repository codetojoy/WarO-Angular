import { Player } from "../model/player.model";

export class ConfigService {
  getPlayers(): Player[] {
    let players: Player[] = [];
    players.push(new Player("Beetoven"));
    players.push(new Player("Chopin"));
    players.push(new Player("Mozart"));
    players.push(new Player("You"));
    return players;
  }
}
