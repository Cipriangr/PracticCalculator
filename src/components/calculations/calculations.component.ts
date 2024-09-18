import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../app/backend.service';
import { anual } from '../../app/app.component';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-calculations',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './calculations.component.html',
  styleUrl: './calculations.component.scss'
})
export class CalculationsComponent implements OnInit {

  items: anual[] = [];
 
  constructor(private backendService: BackendService) { 

  }

  ngOnInit() {
    this.updateData();
  }

  updateData(): void{
    this.backendService.newDataObservable$.subscribe({
      next:((response) => {
        console.log('!!response', response);
        this.items = response;
      }),
      error:(error) => console.log(error)
    })
  }


}
