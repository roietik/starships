import {Component, Input} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {NgClass, NgIf} from '@angular/common';
import {IPerson} from '../../../services/game/game.interfaces';
import {MatChipsModule} from '@angular/material/chips';
import {IGameItem} from '../game-view/game-view.component';

@Component({
  selector: 'game-card-people',
  templateUrl: 'game-card-people.component.html',
  styleUrl: 'game-card-people.component.scss',
  standalone: true,
  imports: [
    MatCardModule,
    NgClass,
    NgIf,
    MatChipsModule
  ]
})
export class GameCardPeopleComponent {
  @Input({ transform: (item: IGameItem): IPerson => {
      if ('mass' in item) {
        return item;
      } else {
        throw new Error('Item is not a Person');
      }
    }}) item!: IPerson;
  @Input() color!: string;
}