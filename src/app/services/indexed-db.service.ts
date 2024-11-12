import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Employee } from '../models/employee.model';  // We'll create this model next
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IndexedDbService {
  constructor(private dbService: NgxIndexedDBService, private http:HttpClient) {}
 

  addEmployee(employee: Employee) {
    return this.dbService.add('employees', employee);
  }
 
  getEmployees() {
    return this.dbService.getAll('employees');
  }


  updateEmployee(employee: Employee) {
    return this.dbService.update('employees', employee);
  }

  deleteEmployee(id: number) {
    return this.dbService.delete('employees', id);
  }
}
