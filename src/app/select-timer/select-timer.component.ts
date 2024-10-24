import { Component, inject } from '@angular/core';
import { LocalDataStoreService } from '../Services/local-data-store.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { TypeFormatterPipe } from '../Pipes/array-formatter.pipe';
import { MailFormatterPipe } from '../Pipes/mail-formatter.pipe';
import { VehiclesPipe } from '../Pipes/vehicles.pipe';
import { CalenderComponent } from '../calender/calender.component';
import { Router } from '@angular/router';
import { ConfirmationMsgComponent } from '../confirmation-msg/confirmation-msg.component';
import { ScheduleReportComponent } from '../schedule-report/schedule-report.component';

@Component({
  selector: 'app-select-timer',
  standalone: true,
  imports: [CommonModule, FormsModule, TypeFormatterPipe, MailFormatterPipe, VehiclesPipe, CalenderComponent],
  templateUrl: './select-timer.component.html',
  styleUrl: './select-timer.component.css'
})
export class SelectTimerComponent {

  // Variable to hold functionality of modal
  private modalService = inject(NgbModal);
	activeModal = inject(NgbActiveModal);

  type: any[] = []
  vehicle: any[] = []
  mail: any[] = []

  // Clock based variables
  hr: number = 9
  min: number = 30
  meredian: boolean = true

  // Criteria selector
  skipWeekEnd: boolean = true
  timeSelection: string = ""
  customTime: string = ""

  week: string[] = ["Monday", "Tuesday", "Wednessday", "Thursday", "Friday", "Saturday", "Sunday"]
  weekEnd: string[] = ["Monday", "Tuesday", "Wednessday", "Thursday", "Friday"]

  selectedDay: string = ""

  constructor(private store: LocalDataStoreService, private rout: Router) {

    console.log(this.store.getVehicle());
    console.log(this.store.getType());
    console.log(this.store.getMail());

    this.type = this.store.getType();
    this.mail = this.store.getMail();
    this.vehicle = this.store.getVehicle();

  }

  // Adds minutes and Hours in the clock

  addTimer() {
    if (this.min < 59 && this.hr <= 12) {
      console.log("In the If block");
      this.min = this.min + 1;
    } else if (this.min === 59 && this.hr === 12) {
      console.log("In the Else If block");
      this.min = 0;
      this.hr = 1
    } else {
      console.log("In the Else block");
      this.min = 0;
      this.hr = this.hr + 1;
    }
  }
  // Removes minutes and Hours in the clock
  removeTimer() {
    if (this.hr > 1 && this.min > 0) {
      console.log("In the if block");
      this.min = this.min - 1;
    } else if (this.hr > 1 && this.min == 0) {
      console.log("In the else if block");
      this.min = 59;
      this.hr = this.hr - 1;
    } else if (this.hr == 1 && this.min == 0) {
      this.min = 59;
      this.hr = 12
    } else {
      this.min = this.min - 1
    }
  }

  get getTimeSelection(): any {
    return this.timeSelection
  }

  clickedItemIndex:number|null = null
  activeIndex: number | null = null;

  handleSelection(selection: string, index?:any, type?: string) {

    if (selection === "day" && type != undefined) {
      // alert(`${type} has been selected for notifications.`)
      this.customTime = "Day"
      this.selectedDay = type
      this.clickedItemIndex = index
    }
    if (selection === "TwoDay" && type != undefined) {
      // alert(`${type} has been selected for notifications.`)
      this.customTime = "TwoDay"
      this.selectedDay = type
      this.clickedItemIndex = index
    }
    if (selection === "CustomYear") {
      this.customTime = "CustomYear"
      this.activeIndex = this.activeIndex === index ? null : index;
    }
    if (selection === "CustomQua") {
      this.customTime = "CustomQua"
      this.activeIndex = this.activeIndex === index ? null : index;
    }
    if (selection === "FirstQua") {
      this.customTime = "FirstQua"
      this.activeIndex = this.activeIndex === index ? null : index;
    }
    if (selection === "LastQua") {
      this.customTime = "LastQua"
      this.activeIndex = this.activeIndex === index ? null : index;
    }
    if (selection === "FirstOfYear") {
      this.customTime = "FirstYear"
      this.activeIndex = this.activeIndex === index ? null : index;
    }
    if (selection === "LastOfYear") {
      this.customTime = "LastYear"
      this.activeIndex = this.activeIndex === index ? null : index;
    }

  }


  confirmation() {

    if (this.timeSelection != "Monthly") {
      this.store.addHr(this.hr);
      this.store.addMin(this.min)

      if (this.meredian)
        this.store.addMeredian("PM")
      else
        this.store.addMeredian("AM")

      this.store.addSchedule(this.customTime)

      this.store.addDay(this.selectedDay)
    }else{
      this.store.addHr(this.hr);
      this.store.addMin(this.min)

      if (this.meredian)
        this.store.addMeredian("PM")
      else
        this.store.addMeredian("AM")

      this.store.addDay(this.selectedDay)
    }

    this.modalService.open(ConfirmationMsgComponent, { size: 'lg', centered:true });
    this.activeModal.close('Close click')

  }

  cancel() {
    this.activeModal.close('Close click')
    this.modalService.open(ScheduleReportComponent);
  }

}
