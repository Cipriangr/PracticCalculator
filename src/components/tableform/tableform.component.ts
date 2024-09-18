import { Component, EventEmitter, inject, input, OnInit, output, Output, signal,  } from '@angular/core';
import { NgForm, FormsModule  } from '@angular/forms';
import { BackendService } from '../../app/backend.service';
import { backendData } from '../../app/interfaces';
import { lastValueFrom, map, tap } from 'rxjs';

export interface dataTable {
  annual: number;
  duration: number;
  expected: number;
  initial: number;
}

@Component({
  selector: 'app-tableform',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './tableform.component.html',
  styleUrl: './tableform.component.scss'
})
export class TableformComponent implements OnInit {

  data: backendData[] = [];
  inputData = signal<dataTable>({
    annual: 0,
    duration: 0,
    expected: 0,
    initial: 0
  });
  @Output() formData = new EventEmitter<dataTable>();

  constructor(private backendService: BackendService) {

  }

  async ngOnInit() {
    await this.assignData();
    this.calculate();
  }
  
  async assignData() {
    try {
      const response = await lastValueFrom(this.backendService.getBackendData())
      this.data = response;
    }
    catch (error) {
      console.log('!!err', error);
    }
  }
  

  calculate() {
    if (!this.data.length) {
      return;
    }
    const toArr = this.data.reduce((accumulator, currentValue) => {
      accumulator = accumulator + currentValue.count;
      return accumulator;
    }, 0);
    console.log('!!toarr', toArr);
  }

  submitForm(data: NgForm, event: Event): void {
    const values: dataTable = data.form.value;
    if (!data.valid && !values) {
      return;
    }
    this.inputData.set(values);
    this.formData.emit(values);
    console.log('!!data', values);
    this.backendService.calculateInvestmentResults(values);
    data.resetForm();
    event.preventDefault();
  }

  testing(values: dataTable): void {
    const arr = Object.values(values);
    const test2 = arr.map(element => {
      return element = element+1;
    })
  }
}
