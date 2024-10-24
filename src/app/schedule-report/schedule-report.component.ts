import { Component, inject } from '@angular/core';
import { ApiHandlerService } from '../Services/api-handler.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalDataStoreService } from '../Services/local-data-store.service';
import { Vehicle } from '../entities/Vehilcle';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SelectTimerComponent } from '../select-timer/select-timer.component';

@Component({
  selector: 'app-schedule-report',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './schedule-report.component.html',
  styleUrl: './schedule-report.component.css'
})
export class ScheduleReportComponent {

  // Variable to hold functionality of modal
	private modalService = inject(NgbModal);
	activeModal = inject(NgbActiveModal);



  isChecked = false; // Track checkbox state

  onCheckboxChange(item: any) {
    item.isChecked = !item.isChecked; // Toggle checkbox state
  }


  // Handle dynamic CSS for clicked option
  clickedItemIndex: number | null = null;

  onItemClick(index: number) {
    this.clickedItemIndex = index;
  }

  // variable to show add and cancel button to add new mailId.
  showAdd: boolean = true

  // Checkboxes and resp variable to handle it's data transfer.
  selectReportType: any[] = [
    { id: 1, type: "Fleet Wise Report" },
    { id: 2, type: "Vehicle Wise Report" },
    { id: 3, type: "Trip Wise Report" },
    { id: 4, type: "Driving Scorecard Report" },
  ]
  selectedReportOptions: any[] = []

  // Handle email id entry.
  givenMails: any[] = [];
  showInputField: boolean = false

  // Handles vehicle related selections
  vehiclesInfo: any | undefined
  selectedVehicleOption: string = "all"
  selectedVehicle: any[] = []

  emailHandler: FormGroup = new FormGroup({
    inputEmail: new FormControl("", Validators.email)
  })

  constructor(private serv: ApiHandlerService, private store: LocalDataStoreService) {

    this.serv.getAllVehicles().subscribe(
      data => {
        this.vehiclesInfo = data
      }, error => {
        alert("Vehicles info was not captured.")
        console.log(error);
      }
    )

  }

  // Getter Method to handle selected checkboxes of report generation.
  get getSelectedOption(): any {
    return this.selectReportType.filter(
      (elem, index) => this.selectedReportOptions[index]
    )
  }

  // Getter Method to capture content of email input field.
  get inputEmail(): any {
    console.log(this.emailHandler.get('inputEmail'))
    return this.emailHandler.get('inputEmail')
  }

  // Getter method to handle selected checkboxes of vehicles.
  get getSelectedVehicle(): Vehicle[] {

    let vehicleData: Vehicle[] = this.vehiclesInfo.vehicles.filter(
      (elem: any, index: number) => this.selectedVehicle[index]
    )

    return vehicleData;
  }

  // Getter method to ensure the status of next button
  get isNextActive():boolean{
    if(this.givenMails.length>0 && this.getSelectedOption.length>0)
      return true;
    else
      return false;
  }

  // Method to show email input based on all the conditions.
  addInputField() {
    if (this.showAdd == true && this.givenMails.length < 5) {
      this.showInputField = true
      this.showAdd = false
    } else if (this.showAdd === false) {
      this.showAdd = true
      this.showInputField = false
    } else {
      this.showAdd = true
      this.showInputField = false
      alert("Limit of maximum 5 mails has reached.")
    }
  }

  // Method to add email in the list if it's not empty and valid
  addEmail() {
    if (this.inputEmail.value != "" && this.inputEmail.errors == null) {
      this.givenMails.push(this.inputEmail.value)
      this.showAdd = true
      this.showInputField = false
      this.inputEmail.value = ""
    } else
      alert("Please enter valid email id.")
  }

  // Remove email after clicking over cross.
  removeEmail(i: string) {
    this.givenMails.splice(this.givenMails.findIndex(item => item === i), 1);
  }

  // Redirection of modal method.
  openAnotherModel() {
    if (this.isNextActive === true) {
      this.store.addMail(this.givenMails);
      this.store.addType(this.getSelectedOption);
      this.store.addVehicle(this.getSelectedVehicle)
      this.modalService.open(SelectTimerComponent, { windowClass: 'modal' });
      this.activeModal.close('Close click')
    } else if(this.getSelectedOption.length === 0 && this.givenMails.length > 0){      
      alert("Please keep type of report selected.")
    }else if(this.givenMails.length === 0 && this.getSelectedOption.length > 0){
      alert("Please provide valid email ids")
    }else{
      console.log(this.getSelectedOption.length);
      console.log(this.givenMails.length);
      
      alert("Please enter mail id and select type of report.")
    }

  }

}
