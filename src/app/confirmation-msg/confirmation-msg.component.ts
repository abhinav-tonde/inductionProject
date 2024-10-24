import { Component, inject } from '@angular/core';
import { LocalDataStoreService } from '../Services/local-data-store.service';
import { CommonModule } from '@angular/common';
import { MailFormatterPipe } from '../Pipes/mail-formatter.pipe';
import { TypeFormatterPipe } from '../Pipes/array-formatter.pipe';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SelectTimerComponent } from '../select-timer/select-timer.component';

@Component({
  selector: 'app-confirmation-msg',
  standalone: true,
  imports: [CommonModule, MailFormatterPipe, TypeFormatterPipe],
  templateUrl: './confirmation-msg.component.html',
  styleUrl: './confirmation-msg.component.css'
})
export class ConfirmationMsgComponent {

  // Variable to hold functionality of modal
  private modalService = inject(NgbModal);
  activeModal = inject(NgbActiveModal);

  type: any[] = []
  mail: any[] = []
  day: any | undefined
  schedule: any | undefined
  hr: number | undefined
  min: number | undefined
  meredian: any | undefined
  date: any | undefined

  constructor(private store: LocalDataStoreService) {

    this.type = this.store.getType();
    this.mail = this.store.getMail();

    this.schedule = this.store.getSchedule();


    if (this.schedule === "Day") {
      this.schedule = "Every Week"
    } else if (this.schedule === "TwoDay") {
      this.schedule = "a Fortnight"
    } else if (this.schedule === "CustomYear") {
      this.schedule = "every Year"
    } else if (this.schedule === "CustomQua") {
      this.schedule = "every Quarter"
    } else if (this.schedule === "Month") {
      this.schedule = "every Month"
    } else if (this.schedule === "LastYear") {
      this.day = `31st December`
      this.schedule = `every Year`
    } else if (this.schedule === "FirstYear") {
      this.day = `1st January`
      this.schedule = `every Year`
    } else if (this.schedule === "FirstQua") {
      this.day = `1st Monday`
      this.schedule = `every Quarter`
    } else if (this.schedule === "LastQua") {
      this.day = `last Monday`
      this.schedule = `every Quarter`
    } else if (this.schedule === "Month") {
      this.schedule = `every Month`
    } else {
      console.log("Schedule not captured.")
    }

    if (this.day == undefined) {
      this.day = this.store.getDay();
      this.date = this.store.getDate();

      if (this.schedule === "Every Week") {
        this.day = `${this.day}s`
      } else if (this.schedule === "a Fortnight") {
        this.day = `First ${this.day}s`
      } else if (this.schedule === "every Month") {
        this.day = `date ${this.date}`
      } else if (this.schedule === "every Quarter") {
        
        if (this.date % 10 === 1)
          this.date = this.date + "st"
        else if (this.date % 10 === 2)
          this.date = this.date + "nd"
        else if (this.date % 10 === 3)
          this.date = this.date + "rd"
        else
          this.date = this.date + "th"

        this.day = `${this.date} of every First month`
      } else if (this.schedule === "every Year") {
        this.day = `${this.date} March`
      } else {
        console.log("Day and Date is not yet confirmed.");

      }
    }

    this.hr = this.store.getHr()
    this.min = this.store.getMin()
    this.meredian = this.store.getMeredian();

  }

  cancel() {
    this.activeModal.close('Close click')
    this.modalService.open(SelectTimerComponent);
  }

  confirm() {
    this.activeModal.close('Close click')
    alert("Process of scheduling the report is done.")
  }

}
