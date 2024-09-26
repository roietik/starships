import { TestBed } from '@angular/core/testing';
import { GameService } from './game.service';
import {HttpClient, provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {of} from 'rxjs';

const responseItemsMockup = {
  message: "ok",
  total_records: 36,
  total_pages: 1,
  previous: null,
  next: null,
  results: [
    {
      uid: "2",
      name: "CR90 corvette",
      url: "https://www.swapi.tech/api/starships/2"
    },
    {
      uid: "3",
      name: "Star Destroyer",
      url: "https://www.swapi.tech/api/starships/3"
    },
    {
      uid: "5",
      name: "Sentinel-class landing craft",
      url: "https://www.swapi.tech/api/starships/5"
    },
    {
      uid: "9",
      name: "Death Star",
      url: "https://www.swapi.tech/api/starships/9"
    },
    {
      uid: "11",
      name: "Y-wing",
      url: "https://www.swapi.tech/api/starships/11"
    },
    {
      uid: "10",
      name: "Millennium Falcon",
      url: "https://www.swapi.tech/api/starships/10"
    },
    {
      uid: "13",
      name: "TIE Advanced x1",
      url: "https://www.swapi.tech/api/starships/13"
    },
    {
      uid: "15",
      name: "Executor",
      url: "https://www.swapi.tech/api/starships/15"
    },
    {
      uid: "12",
      name: "X-wing",
      url: "https://www.swapi.tech/api/starships/12"
    },
    {
      uid: "17",
      name: "Rebel transport",
      url: "https://www.swapi.tech/api/starships/17"
    },
    {
      uid: "21",
      name: "Slave 1",
      url: "https://www.swapi.tech/api/starships/21"
    },
    {
      uid: "22",
      name: "Imperial shuttle",
      url: "https://www.swapi.tech/api/starships/22"
    },
    {
      uid: "23",
      name: "EF76 Nebulon-B escort frigate",
      url: "https://www.swapi.tech/api/starships/23"
    },
    {
      uid: "28",
      name: "A-wing",
      url: "https://www.swapi.tech/api/starships/28"
    },
    {
      uid: "27",
      name: "Calamari Cruiser",
      url: "https://www.swapi.tech/api/starships/27"
    },
    {
      uid: "29",
      name: "B-wing",
      url: "https://www.swapi.tech/api/starships/29"
    },
    {
      uid: "31",
      name: "Republic Cruiser",
      url: "https://www.swapi.tech/api/starships/31"
    },
    {
      uid: "32",
      name: "Droid control ship",
      url: "https://www.swapi.tech/api/starships/32"
    },
    {
      uid: "39",
      name: "Naboo fighter",
      url: "https://www.swapi.tech/api/starships/39"
    },
    {
      uid: "40",
      name: "Naboo Royal Starship",
      url: "https://www.swapi.tech/api/starships/40"
    },
    {
      uid: "43",
      name: "J-type diplomatic barge",
      url: "https://www.swapi.tech/api/starships/43"
    },
    {
      uid: "41",
      name: "Scimitar",
      url: "https://www.swapi.tech/api/starships/41"
    },
    {
      uid: "47",
      name: "AA-9 Coruscant freighter",
      url: "https://www.swapi.tech/api/starships/47"
    },
    {
      uid: "48",
      name: "Jedi starfighter",
      url: "https://www.swapi.tech/api/starships/48"
    },
    {
      uid: "52",
      name: "Republic Assault ship",
      url: "https://www.swapi.tech/api/starships/52"
    },
    {
      uid: "49",
      name: "H-type Nubian yacht",
      url: "https://www.swapi.tech/api/starships/49"
    },
    {
      uid: "59",
      name: "Trade Federation cruiser",
      url: "https://www.swapi.tech/api/starships/59"
    },
    {
      uid: "58",
      name: "Solar Sailer",
      url: "https://www.swapi.tech/api/starships/58"
    },
    {
      uid: "61",
      name: "Theta-class T-2c shuttle",
      url: "https://www.swapi.tech/api/starships/61"
    },
    {
      uid: "63",
      name: "Republic attack cruiser",
      url: "https://www.swapi.tech/api/starships/63"
    },
    {
      uid: "64",
      name: "Naboo star skiff",
      url: "https://www.swapi.tech/api/starships/64"
    },
    {
      uid: "65",
      name: "Jedi Interceptor",
      url: "https://www.swapi.tech/api/starships/65"
    },
    {
      uid: "66",
      name: "arc-170",
      url: "https://www.swapi.tech/api/starships/66"
    },
    {
      uid: "68",
      name: "Banking clan frigte",
      url: "https://www.swapi.tech/api/starships/68"
    },
    {
      uid: "74",
      name: "Belbullab-22 starfighter",
      url: "https://www.swapi.tech/api/starships/74"
    },
    {
      uid: "75",
      name: "V-wing",
      url: "https://www.swapi.tech/api/starships/75"
    }
  ]
};
const responseItemMockup = {
  message: "ok",
  result: {
    properties: {
      model: "DS-1 Orbital Battle Station",
      starship_class: "Deep Space Mobile Battlestation",
      manufacturer: "Imperial Department of Military Research, Sienar Fleet Systems",
      cost_in_credits: "1000000000000",
      length: "120000",
      crew: "342,953",
      passengers: "843,342",
      max_atmosphering_speed: "n/a",
      hyperdrive_rating: "4.0",
      MGLT: "10",
      cargo_capacity: "1000000000000",
      consumables: "3 years",
      pilots: [],
      created: "2020-09-17T17:55:06.604Z",
      edited: "2020-09-17T17:55:06.604Z",
      name: "Death Star",
      url: "https://www.swapi.tech/api/starships/9"
    },
    description: "A Starship",
    _id: "5f63a34fee9fd7000499be21",
    uid: "9",
    __v: 0
  }
}

describe('GameService', () => {
  let service: GameService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    let httpClientSpyObj = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [
        GameService,
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: HttpClient,
          useValue: httpClientSpyObj
        }
      ]
    });
    service = TestBed.inject(GameService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should return 0 for unknown values', () => {
    const value = 'unknown';
    const result = service.computeValue(value);
    expect(result).toBe(0);
  });

  it('should return second value for ranges', () => {
    const value = '10-20';
    const result = service.computeValue(value);
    expect(result).toBe(20);
  });

  it('should handle values with commas correctly', () => {
    const value = '321,123';
    const result = service.computeValue(value);
    expect(result).toBe(321123);
  });

  it('should handle values with commas correctly', () => {
    const value = '1,000';
    const result = service.computeValue(value);
    expect(result).toBe(1000);
  });

  it('should convert string to number for simple values', () => {
    const value = '5';
    const result = service.computeValue(value);
    expect(result).toBe(5);
  });

  it('should get getItems() with success', () => {
    httpClientSpy.get.and.returnValue(of(responseItemsMockup));
    service.getItems('starships').subscribe((data) => {
      expect(Array.isArray(data)).toBe(true);

      data.forEach((item) => {
        expect(item).toEqual({
          uid: jasmine.any(String),
          name: jasmine.any(String),
          url: jasmine.any(String)
        });
      });
    });
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  });

  it('should get getItem() with success', () => {
    httpClientSpy.get.and.returnValue(of(responseItemMockup));
    service.getItem('starships').subscribe((data) => {
      expect(typeof data === 'object').toBe(true);

      expect(data).toEqual({
        name: jasmine.any(String),
        model: jasmine.any(String),
        starship_class: jasmine.any(String),
        manufacturer: jasmine.any(String),
        cost_in_credits: jasmine.any(String),
        length: jasmine.any(String),
        crew: jasmine.any(String),
        passengers: jasmine.any(String),
        max_atmosphering_speed: jasmine.any(String),
        hyperdrive_rating: jasmine.any(String),
        MGLT: jasmine.any(String),
        cargo_capacity: jasmine.any(String),
        consumables: jasmine.any(String),
        pilots: jasmine.any(Array),
        created: jasmine.any(String),
        edited: jasmine.any(String),
        url: jasmine.any(String),
      });
    });
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  });
});