import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vehicle } from '../entities/Vehilcle';

@Injectable({
  providedIn: 'root'
})
export class ApiHandlerService {

  constructor(private http:HttpClient){  }

  getAllVehicles(){
    return this.http.get<Vehicle[]>("VehicleData.json");
  }

}
