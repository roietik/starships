import {ComponentFixture, TestBed} from '@angular/core/testing';
import {GameCardsComponent} from './game-cards.component';
import {provideHttpClient} from '@angular/common/http';
import {IPerson, IStarship} from '../../../services/game/game.interfaces';

export const starshipsMock: IStarship[] = [
  {
    model: 'DS-1 Orbital Battle Station',
    starship_class: 'Deep Space Mobile Battlestation',
    manufacturer: 'Imperial Department of Military Research, Sienar Fleet Systems',
    cost_in_credits: '1000000000000',
    length: '120000',
    crew: '342,953',
    passengers: '843,342',
    max_atmosphering_speed: 'n/a',
    hyperdrive_rating: 4.0,
    MGLT: '10',
    cargo_capacity: '1000000000000',
    consumables: '3 years',
    pilots: [],
    created: '2020-09-17T17:55:06.604Z',
    edited: '2020-09-17T17:55:06.604Z',
    name: 'Death Star',
    url: 'https://www.swapi.tech/api/starships/9'
  },
  {
    model: 'T-65 X-wing',
    starship_class: 'Starfighter',
    manufacturer: 'Incom Corporation',
    cost_in_credits: '149999',
    length: '12.5',
    crew: '1',
    passengers: '0',
    max_atmosphering_speed: '1050',
    hyperdrive_rating: 1.0,
    MGLT: '100',
    cargo_capacity: '110',
    consumables: '1 week',
    pilots: [],
    created: '2020-09-17T17:55:06.604Z',
    edited: '2020-09-17T17:55:06.604Z',
    name: 'X-wing',
    url: 'https://www.swapi.tech/api/starships/12'
  },
];
export const peopleMock: IPerson[] = [
  {
    height: '172',
    mass: '77',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    birth_year: '19BBY',
    gender: 'male',
    created: '2024-09-25T05:12:16.058Z',
    edited: '2024-09-25T05:12:16.058Z',
    name: 'Luke Skywalker',
    homeworld: 'https://www.swapi.tech/api/planets/1',
    url: 'https://www.swapi.tech/api/people/1'
  },
  {
    height: '202',
    mass: '136',
    hair_color: 'none',
    skin_color: 'white',
    eye_color: 'yellow',
    birth_year: '41.9BBY',
    gender: 'male',
    created: '2024-09-25T05:12:16.058Z',
    edited: '2024-09-25T05:12:16.058Z',
    name: 'Darth Vader',
    homeworld: 'https://www.swapi.tech/api/planets/1',
    url: 'https://www.swapi.tech/api/people/4'
  }
]


describe('GameCardsComponent', () => {
  let component: GameCardsComponent;
  let fixture: ComponentFixture<GameCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ GameCardsComponent ],
      providers: [ provideHttpClient() ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GameCardsComponent);
    component = fixture.componentInstance;
    component.items = starshipsMock;
    component.type = 'starships';
    fixture.detectChanges();
  });

  it('should calculate scores based on crew for starships', () => {
    component.items = starshipsMock;
    component.type = 'starships';
    component.ngOnInit();

    expect('crew' in component.items[0]).toBeTruthy();
    expect(component.scores).toEqual(['342,953', '1']);
  });

  it('should calculate scores based on mass for people', () => {
    component.items = peopleMock;
    component.type = 'people';
    component.ngOnInit();

    expect('mass' in component.items[0]).toBeTruthy();
    expect(component.scores).toEqual(['77', '136']);
  });
});