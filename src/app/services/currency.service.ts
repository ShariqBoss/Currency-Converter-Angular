import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { 
  CurrencyListResponse, 
  ConversionResponse, 
  ConversionHistoryItem 
} from '../models/currency.model';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private apiUrl = 'https://currency-converter-roan-chi.vercel.app/api/currency'; // for vercal
  // private apiUrl = 'http://localhost:3000/api/currency'; // for local

  constructor(private http: HttpClient) { }

  getCurrencies(): Observable<CurrencyListResponse> {
    return this.http.get<CurrencyListResponse>(`${this.apiUrl}/currencies`)
      .pipe(
        catchError(this.handleError<CurrencyListResponse>('getCurrencies'))
      );
  }

  convertCurrency(from: string, to: string, amount: number): Observable<ConversionResponse> {
    const body = { from, to, amount };
    return this.http.post<ConversionResponse>(`${this.apiUrl}/convert`, body)
      .pipe(
        catchError(this.handleError<ConversionResponse>('convertCurrency'))
      );
  }

  getConversionHistory(): Observable<ConversionHistoryItem[]> {
    return this.http.get<ConversionHistoryItem[]>(`${this.apiUrl}/history`)
      .pipe(
        catchError(this.handleError<ConversionHistoryItem[]>('getConversionHistory', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}