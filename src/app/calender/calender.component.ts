import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LocalDataStoreService } from '../Services/local-data-store.service';

@Component({
  selector: 'app-calender',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calender.component.html',
  styleUrl: './calender.component.css'
})
export class CalenderComponent {

  dates: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]

  constructor(private store: LocalDataStoreService) {

  }

  clickedItemIndex: number | null = null;
  
  storeDate(value: number, index:number) {
    this.clickedItemIndex = index;
    this.store.addSchedule("Month")
    this.store.addDate(value);
  }

}
