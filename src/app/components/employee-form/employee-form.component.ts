import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { IndexedDbService } from '../../services/indexed-db.service';
import { Employee } from '../../models/employee.model';
import { Router } from '@angular/router';
// import { addDays, startOfWeek, getISOWeekday } from 'date-fns';
// import { addDays, getISODay } from 'date-fns';


@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  @Input() employee: Employee | null = null;
 
  employeeForm: FormGroup;
  roles: string[] = ['Product Designer', 'Flutter Developer', 'QA Tester', 'Product Owner'];

  

  constructor(private fb: FormBuilder, private dbService: IndexedDbService, private router: Router) {
    this.employeeForm = this.fb.group({
      employeeName: ['', Validators.required],
      position: ['', Validators.required],
      dateRange: this.fb.group({
        startDate: [null, Validators.required],
        endDate: [null, Validators.required]
      })
    //   // dateRange: ['', Validators.required]
    });

  //   this.employeeForm = this.fb.group({
  //     employeeName: ['', Validators.required],
  //     position: ['', Validators.required],
  //     dateRange: this.fb.group({
  //       startDate: [null, Validators.required],
  //       endDate: [null, Validators.required]
  //     }, { validators: this.dateRangeValidator })
  //   });
  }

  ngOnInit(): void {
    console.log(this.employeeForm,"lets see");
    if (this.employee) {
      this.employeeForm.patchValue(this.employee);
    }
  }


  // onSubmit() {
  //   // debugger;
  //   console.log(this.employeeForm.valid,"this.employeeForm.valid");
  //   if (this.employeeForm.valid) {
  //     const employeeData = this.employeeForm.value as Employee;
  //     console.log(employeeData,"employeeData");
  //     if (this.employee) {
  //       employeeData.id = this.employee.id;
  //       this.dbService.updateEmployee(employeeData);
  //     } else {
  //       this.dbService.addEmployee(employeeData);
  //        this.router.navigate(['employees']);

  //     }
  //   }
  // }

  // onSubmit() {
  //   if (this.employeeForm.valid) {
  //     const employeeData: Employee = {
  //       id: 0,  // ID will be auto-generated by IndexedDB
  //       employeeName: this.employeeForm.value.employeeName,
  //       position: this.employeeForm.value.position,
  //       startDate: this.employeeForm.value.dateRange.startDate,  // Accessing nested startDate
  //       endDate: this.employeeForm.value.dateRange.endDate,      // Accessing nested endDate
  //     };
      
  //     // Save employee data to IndexedDB
  //     this.dbService.addEmployee(employeeData).subscribe(() => {
  //       // After saving, maybe navigate or show success message
  //       this.router.navigate(['employees']); // Redirect to employees list after adding
  //     });
  //   } else {
  //     console.log('Form is invalid!');
  //   }
  // }

  onSubmit() {
    if (this.employeeForm.valid) {
      const employeeData: Employee = {
        id: 0,  // ID will be auto-generated by IndexedDB
        employeeName: this.employeeForm.get('employeeName')?.value,
        position: this.employeeForm.get('position')?.value,
        startDate: this.employeeForm.get('dateRange.startDate')?.value,
        endDate: this.employeeForm.get('dateRange.endDate')?.value,
      };
      console.log(employeeData, "before");
      this.dbService.addEmployee(employeeData).subscribe(()=>{console.log("success")});
      console.log(employeeData, "after");
      this.dbService.getEmployees().subscribe((data:any) => {
        if(data!=null && data!= undefined){
        let employees = data;
        console.log(employees,"form of ----->");
        this.router.navigate(['employees']);
     } });
    } 
    // else {
    // //   console.log('Form is invalid', this.employeeForm.errors);
    // }
  }
  
  

  // save(){
  //   console.log(this.employeeForm, "savedInfo");
  //   // this.onSubmit();
    
  //   // this.router.navigate(['employees']);

  // }
  cancel() {
    this.employeeForm.reset(); 
    console.log("ggg");
  }

  // dateRangeValidator(group: AbstractControl): ValidationErrors | null {
  //   const start = group.get('startDate')?.value;
  //   const end = group.get('endDate')?.value;
  //   if (!start || !end) {
  //     return { required: 'Start and End dates are required' };
  //   }
  //   if (end < start) {
  //     return { invalidRange: 'End date must be after start date' };
  //   }
  //   return null;
  // }
}
