import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ControlpanelComponent } from "./controlpanel/controlpanel.component";
import { GameComponent } from "./game/game.component";
import { PlayerComponent } from "./player/player.component";
import { PlayersComponent } from "./players/players.component";

import { ConfigService } from "./service/config.service";

@NgModule({
  declarations: [AppComponent, ControlpanelComponent, GameComponent, PlayerComponent, PlayersComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [ConfigService],
  bootstrap: [AppComponent],
})
export class AppModule {}
