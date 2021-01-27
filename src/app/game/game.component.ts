import { Component, OnInit } from "@angular/core";
import { Table } from "../model/table.model";

import { DealerService } from "../service/dealer.service";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.css"],
})
export class GameComponent implements OnInit {
  status: string = "Click 'New Game' to begin";
  table: Table = new Table();
  constructor(private dealerService: DealerService) {}

  ngOnInit(): void {
    this.dealerService.tableChanged.subscribe((table) => {
      this.table = table;
    });
    this.dealerService.statusChanged.subscribe((status) => {
      this.status = status;
    });
  }
}
