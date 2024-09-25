import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {CommonModule} from '@angular/common';
import {GameService} from '../../../services/game/game.service';
import {Subject, takeUntil} from 'rxjs';

const PLAYERS = {
  RED_PLAYER: 'red',
  BLUE_PLAYER: 'blue'
};

@Component({
  selector: 'game-card-winner',
  templateUrl: 'game-card-winner.component.html',
  styleUrl: 'game-card-winner.component.scss',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule
  ]
})
export class GameCardWinnerComponent implements OnInit, OnDestroy {
  @Input() scores!: string[];

  winner!: string | null;
  message!: string;
  redPlayerValue!: number;
  bluePlayerValue!: number;
  redPlayerWins!: number;
  bluePlayerWins!: number;

  private readonly destroy: Subject<void> = new Subject<void>();

  constructor(
    private readonly gameService: GameService
  ) {
  }

  ngOnInit(): void {
    this.getValues();
    this.getWinner();
    this.getMessage();
    this.setWins();
    this.getWins();
  }

  private getValues(): void {
    this.redPlayerValue = this.gameService.computeValue(this.scores[0]);
    this.bluePlayerValue  = this.gameService.computeValue(this.scores[1]);
  }

  private getWinner(): void {
    if (this.redPlayerValue > this.bluePlayerValue) {
      this.winner = PLAYERS.RED_PLAYER;
      return;
    }

    if (this.redPlayerValue < this.bluePlayerValue) {
      this.winner = PLAYERS.BLUE_PLAYER;
      return;
    }

    this.winner = null;
  }

  private getMessage(): void {
    if (!this.winner) {
      this.message = 'It\'s a tie!';
      return;
    }

    this.message = `The ${this.winner === PLAYERS.RED_PLAYER ? 'red' : 'blue'} player won!`;
  }

  private setWins(): void {
    if (this.redPlayerValue > this.bluePlayerValue) {
      this.gameService.setWins(PLAYERS.RED_PLAYER);
    }

    if (this.redPlayerValue < this.bluePlayerValue) {
      this.gameService.setWins(PLAYERS.BLUE_PLAYER);
    }
  }

  private getWins(): void {
    this.gameService.getWins()
      .pipe(takeUntil(this.destroy))
      .subscribe(({red, blue}): void => {
        this.redPlayerWins = red;
        this.bluePlayerWins = blue;
    });
  };

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}