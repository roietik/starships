import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {GameViewComponent} from './components/game/game-view/game-view.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GameViewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Game';
}
