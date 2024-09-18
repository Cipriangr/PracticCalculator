import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { backendData } from './interfaces';
import { anual, dataTable } from './app.component';

@Injectable({
  providedIn: 'root',
})
export class BackendService {

  data = new Subject<anual[]>();
  newDataObservable$ = this.data.asObservable();

  constructor(private http: HttpClient) { }

  getBackendData(): Observable<backendData[]> {
    return this.http.get<backendData[]>('http://127.0.0.1:8080/1.json');
  }

  calculateInvestmentResults(values: dataTable) {
    const annualData = [];
    const { initial, duration, expected, annual } = values; 
    let investmentValue = initial;
  
    for (let i = 0; i < duration; i++) {
      const year = i + 1;
      const interestEarnedInYear = investmentValue * (expected / 100);
      investmentValue += interestEarnedInYear + annual;
      const totalInterest =
        investmentValue - annual * year - initial;
      annualData.push({
        year: year,
        interestYear: parseFloat(interestEarnedInYear.toFixed(2)),
        valueEndOfYear: parseFloat(investmentValue.toFixed(2)),
        annualInvestment: parseFloat(annual.toFixed(2)),
        totalInterest: parseFloat(totalInterest.toFixed(2)),
        totalAmountInvested: parseFloat((initial + annual * year).toFixed(2)),
      });
    }
    console.log('!!anuald', annualData);
  this.data.next(annualData);
  return annualData;
  }

}
