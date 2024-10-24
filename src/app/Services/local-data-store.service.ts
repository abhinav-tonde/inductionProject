import { Injectable } from '@angular/core';
import { Vehicle } from '../entities/Vehilcle';

@Injectable({
  providedIn: 'root'
})
export class LocalDataStoreService {

  type: any[] = []
  vehicle: Vehicle[] = []
  mail: any[] = []
  date: number = 0
  day: string = ""
  hr: number = 0
  min: number = 0
  meredian: string = ""
  schedule: string = ""

  constructor() { }

  getType() {
    return this.type;
  }

  getVehicle() {
    return this.vehicle;
  }

  getMail() {
    return this.mail;
  }

  getDate() {
    return this.date;
  }
  
  getDay() {
    return this.day;
  }

  getHr() {
    return this.hr;
  }

  getMin() {
    return this.min;
  }

  getMeredian() {
    return this.meredian;
  }

  getSchedule(){
    return this.schedule;
  }

  addHr(hr: number) {
    this.hr = hr
  }

  addMin(min: number) {
    this.min = min
  }

  addSchedule(schedule: string) {
    console.log(schedule +" has been added.");
    console.log(this.date);
    
    this.schedule = schedule
  }

  addMeredian(meredian: string) {
    this.meredian = meredian
  }

  addDay(day: string) {
    this.day = day
  }

  addDate(value: number) {
    this.date = value;
  }

  addMail(inputMail: any) {
    this.mail = inputMail
  }

  addVehicle(inputVehicle: any) {
    this.vehicle = inputVehicle
  }

  addType(inputType: any) {
    this.type = inputType
  }

}
