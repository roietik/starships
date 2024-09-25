import {Component, Input} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {NgClass, NgIf} from '@angular/common';
import {IStarship} from '../../../services/game/game.interfaces';
import {MatChipsModule} from '@angular/material/chips';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {IGameItem} from '../game-view/game-view.component';

@Component({
  selector: 'game-card-starship',
  templateUrl: 'game-card-starship.component.html',
  styleUrl: 'game-card-starship.component.scss',
  standalone: true,
  imports: [
    MatCardModule,
    MatChipsModule,
    MatProgressBarModule,
    NgClass,
    NgIf
  ]
})
export class GameCardStarshipComponent {
  @Input({ transform: (item: IGameItem): IStarship => {
      if ('crew' in item) {
        return item;
      } else {
        throw new Error('Item is not a Starship');
      }
    }}) item!: IStarship;
  @Input() color!: string;
}