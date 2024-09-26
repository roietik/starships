import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameViewComponent } from './game-view.component';
import { GameService } from '../../../services/game/game.service';
import { IPerson, IStarship, TEndpoint } from '../../../services/game/game.interfaces';
import { MatSelectModule } from '@angular/material/select';
import { GameCardsComponent } from '../game-cards/game-cards.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { peopleMock, starshipsMock } from '../game-cards/game-cards.component.spec';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { responseItemsMockup } from '../../../services/game/game.service.spec';

describe('GameViewComponent', () => {
  let component: GameViewComponent;
  let fixture: ComponentFixture<GameViewComponent>;
  let gameService: GameService;

  const mockPerson: IPerson = peopleMock[0];
  const mockStarship: IStarship = starshipsMock[0];
  const getItemsResponseMock = [responseItemsMockup.results[0], responseItemsMockup.results[1]];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        GameViewComponent,
        MatSelectModule,
        GameCardsComponent,
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatIcon,
        MatProgressSpinner
      ],
      providers: [
        {
          provide: GameService,
          useValue: {
            getItems: (endpoint: TEndpoint) => {
              if (endpoint === 'starships') {
                return of(getItemsResponseMock)
              }

              if (endpoint === 'people') {
                return of(getItemsResponseMock)
              }

              return of([]);
            },
            getItem: () => {
              return of(mockStarship);
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GameViewComponent);
    component = fixture.componentInstance;
    gameService = TestBed.inject(GameService);
    component.type = 'starships';
    component.selectedType = 'starships';
    component.loading = false;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });


  it('should call gameService.getItems when playGame is clicked', () => {
    component.type = 'starships';
    component.selectedType = 'starships';

    const getItemsMethodSpy = spyOn(gameService, 'getItems').and.callThrough();

    const playButton = fixture.debugElement.query(By.css('[data-test="play-button"]'));
    playButton.nativeElement.click();

    expect(getItemsMethodSpy).toHaveBeenCalled();
  });

  it('should set loading to true and false during the game', () => {
    expect(component.loading).toBeFalse();
    component.playGame();
    expect(component.loading).toBeTrue();
    component.items$!.subscribe(() => {});
    expect(component.loading).toBeFalse();
  });

  it('should combine the fetched items into an observable', () => {
    component.playGame();
    expect(component.items$).toBeInstanceOf(Observable);
  });

  it('should emit the correct items when the observable completes', () => {
    component.playGame();
    component.items$!.subscribe((items) => {
      expect(items).toEqual([mockStarship, mockStarship]);
    });
  });
});