import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';

const routes: Routes = [{ path: '', redirectTo: '/employees', pathMatch: 'full' }, // Default route
  { path: 'employees', component: EmployeeListComponent },    // Employee list
  { path: 'employees/add', component: EmployeeFormComponent }, // Add employee
  // { path: 'employees/:id', component: EmployeeDetailsComponent }, // Employee details with ID parameter
  // { path: '**', redirectTo: '/employees' } // Wildcard route to handle undefined 
  ];
// 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
