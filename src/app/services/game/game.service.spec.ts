import { TestBed } from '@angular/core/testing';
import { GameService } from './game.service';
import {provideHttpClient} from '@angular/common/http';

describe('GameService', () => {
  let service: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameService, provideHttpClient()]
    });
    service = TestBed.inject(GameService);
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

  it('should handle values with commas and ranges correctly', () => {
    const value1 = '321,123';
    const result1 = service.computeValue(value1);
    expect(result1).toBe(321123);
  });

  it('should handle values with commas and ranges correctly', () => {
    const value = '1,000';
    const result = service.computeValue(value);
    expect(result).toBe(1000);
  });

  it('should convert string to number for simple values', () => {
    const value = '5';
    const result = service.computeValue(value);
    expect(result).toBe(5);
  });
});