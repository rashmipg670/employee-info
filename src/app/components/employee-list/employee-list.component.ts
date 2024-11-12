import { Component, OnInit } from '@angular/core';
import { IndexedDbService } from '../../services/indexed-db.service';
import { Employee } from '../../models/employee.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  // listName: any;

  constructor(private dbService: IndexedDbService , private router: Router) {}

  ngOnInit(): void {
    this.loadEmployees();
  }
  
  loadEmployees(): void {
    this.dbService.getEmployees().subscribe((data:any) => {
      this.employees = data;
      console.log(this.employees,"list of ----->");
    });
  }
  

  deleteEmployee(id: number) {
    // this.dbService.deleteEmployee(id).then(() => this.loadEmployees());
    this.dbService.deleteEmployee(id).subscribe(() => this.loadEmployees());
  }

  openAddEmployeeForm(){
    // Navigate to the employee list

this.router.navigate(['employees/add']);

  }
  editEmployee(employee: any): void {
    console.log('Edit employee:', employee);
  }

  
}
