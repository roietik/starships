import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GameCardWinnerComponent} from '../game-card-winner/game-card-winner.component';
import {IGameItem} from '../game-view/game-view.component';
import {TEndpoint} from '../../../services/game/game.interfaces';
import {GameCardStarshipComponent} from '../game-card-starship/game-card-starship.component';
import {GameCardPeopleComponent} from '../game-card-people/game-card-people.component';

@Component({
  selector: 'game-cards',
  standalone: true,
  imports: [
    CommonModule,
    GameCardWinnerComponent,
    GameCardStarshipComponent,
    GameCardPeopleComponent
  ],
  templateUrl: 'game-cards.component.html',
  styleUrl: 'game.cards.component.scss'
})
export class GameCardsComponent implements OnInit {
  @Input() items!: IGameItem[];
  @Input() type!: TEndpoint;
  scores!: string[];

  ngOnInit(): void {
    this.getPlayersScores();
  }

  getPlayersScores(): void {
    const [firstItem, secondItem] = this.items;

    if ('crew' in firstItem && 'crew' in secondItem) {
      this.scores = [firstItem.crew, secondItem.crew];
    }

    if ('mass' in firstItem && 'mass' in secondItem) {
      this.scores = [firstItem.mass, secondItem.mass];
    }
  }
}