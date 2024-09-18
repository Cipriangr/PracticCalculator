import { Component, signal } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { TableformComponent } from '../components/tableform/tableform.component';
import { CalculationsComponent } from '../components/calculations/calculations.component';

export interface dataTable {
  annual: number;
  duration: number;
  expected: number;
  initial: number;
}

export interface anual {
  year: number;
  interestYear: number;
  valueEndOfYear: number;
  annualInvestment: number;
  totalInterest: number;
  totalAmountInvested: number;
}


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [HeaderComponent, TableformComponent, CalculationsComponent]
})
export class AppComponent {

  getFormData(event: dataTable) {
    console.log('!!event', event);
  }
}
