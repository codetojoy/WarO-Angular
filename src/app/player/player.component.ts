import { Component, Input, OnInit } from "@angular/core";
import { Player } from "../model/player.model";

import { ConfigService } from "../service/config.service";

@Component({
  selector: "app-player",
  templateUrl: "./player.component.html",
  styleUrls: ["./player.component.css"],
})
export class PlayerComponent implements OnInit {
  @Input() player: Player;

  constructor(private configService: ConfigService) {}

  ngOnInit(): void {}
}
