import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {IItem, IResponseObject, IResponseCollection, TEndpoint} from './game.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private readonly API_URL = 'https://www.swapi.tech/api';
  private readonly winsSubject = new BehaviorSubject<Record<string, number>>({
    red: 0,
    blue: 0
  });
  private readonly wins$ = this.winsSubject.asObservable();

  constructor(
    private readonly httpClient: HttpClient
  ) {
  }

  getItem<TObject>(url: string): Observable<TObject> {
    return this.httpClient.get<IResponseObject<TObject>>(url)
      .pipe(
        map((response) => {
          return response.result.properties;
        })
      )
  }

  getItems(endpoint: TEndpoint): Observable<IItem[]> {
    return this.httpClient.get<IResponseCollection>(`${this.API_URL}/${endpoint}?page=1&limit=100`)
      .pipe(
        map((response: IResponseCollection) => {
          const items: IItem[]  = response.results;
          if (items.length < 2) {
            throw new Error('Not enough items in the response');
          }

          const firstIndex = this.getRandomIndex(items),
            secondIndex = this.getRandomIndex(items);
          return [items[firstIndex], items[secondIndex]];
        })
      );
  }

  private getRandomIndex(items: IItem[]): number {
    return Math.floor(Math.floor(Math.random() * items.length));
  }

  computeValue(value: string): number {

    if (value === 'unknown') {
      return 0;
    }

    const isRange = value.indexOf('-') !== -1;
    if (isRange) {
      return Number(value.split('-')[1]);
    }

    const hasSeparator = value.indexOf(',') !== -1;
    if (hasSeparator) {
      return Number(value.replace(',', ''));
    }

    return Number(value);
  }

  setWins(player: string): void {
    this.winsSubject.next({
      ...this.winsSubject.getValue(),
      [player]: (this.winsSubject.getValue()[player]) + 1
    });
  }

  getWins(): Observable<Record<string, number>> {
    return this.wins$;
  }
}