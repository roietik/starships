import {Component} from '@angular/core';
import {GameService} from '../../../services/game/game.service';
import {IPerson, IStarship, TEndpoint} from '../../../services/game/game.interfaces';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {combineLatest, finalize, Observable, switchMap, tap} from 'rxjs';
import {GameCardsComponent} from '../game-cards/game-cards.component';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule} from '@angular/forms';
import {MatButton, MatFabButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

export type IGameItem = IPerson | IStarship;

@Component({
  selector: 'game-view',
  standalone: true,
  templateUrl: 'game-view.component.html',
  styleUrl: 'game-view.component.scss',
  imports: [
    MatSelectModule,
    GameCardsComponent,
    NgIf,
    AsyncPipe,
    FormsModule,
    NgForOf,
    MatButton,
    MatIcon,
    MatFabButton,
    MatProgressSpinner
  ]
})
export class GameViewComponent  {
  items$?: Observable<[IGameItem, IGameItem]>;
  selectedType: TEndpoint = 'starships';
  type: TEndpoint = 'starships';
  typeOptions = ['people', 'starships'];
  loading = false;

  constructor(
    private readonly gameService: GameService
  ) {
  }

  playGame(): void {
    this.type = this.selectedType;
    this.items$ = this.gameService.getItems(this.selectedType)
      .pipe(
        tap(() => this.loading = true),
        switchMap((response) => {
          return combineLatest([
            this.gameService.getItem<IGameItem>(response[0].url),
            this.gameService.getItem<IGameItem>(response[1].url)
          ])
            .pipe(
              finalize(() => this.loading = false)
            );
        })
      );
  }
}