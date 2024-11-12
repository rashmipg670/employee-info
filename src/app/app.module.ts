import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { NgxIndexedDBModule} from 'ngx-indexed-db';
import { CustomDateRangePickerComponent } from './custom-date-range-picker/custom-date-range-picker.component';
import { HttpClientModule } from '@angular/common/http';
// import { MatErrorModule } from '@angular/material/core'; 

// Define the database configurationimport { NgxIndexedDBModule } from 'ngx-indexed-db';

const dbConfig = {
  name: 'EmployeeDB',  // Database name
  version: 1,          // Database version
  objectStoresMeta: [
    {
      store: 'employees',  // Store name
      storeConfig: {
        keyPath: 'id',     // Primary key for the store (ID field)
        autoIncrement: true // Enable auto-increment for the ID field
      },
      storeSchema: [
        { 
          name: 'id', 
          keypath: 'id', 
          options: { unique: true },
          type: 'number'  // Specify the type of this field
        },
        { 
          name: 'employeeName', 
          keypath: 'employeeName', 
          options: { unique: false },
          type: 'string'  // Specify the type of this field
        },
        { 
          name: 'position', 
          keypath: 'position', 
          options: { unique: false },
          type: 'string'  // Specify the type of this field
        },
        { 
          name: 'startDate', 
          keypath: 'startDate', 
          options: { unique: false },
          type: 'string'  // Specify the type of this field
        },
        { 
          name: 'endDate', 
          keypath: 'endDate', 
          options: { unique: false },
          type: 'string'  // Specify the type of this field
        }
      ]
    }
  ]
};



@NgModule({
  declarations: [
    AppComponent,
    EmployeeFormComponent,
    EmployeeListComponent,
    CustomDateRangePickerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, 
    NgxIndexedDBModule.forRoot(dbConfig),
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatOptionModule,
    FormsModule,
    // MatErrorModule
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
