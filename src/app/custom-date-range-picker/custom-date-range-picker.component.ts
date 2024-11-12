import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-custom-date-range-picker',
  templateUrl: './custom-date-range-picker.component.html',
  styleUrls: ['./custom-date-range-picker.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomDateRangePickerComponent),
      multi: true
    }
    ,
    // {
    //   provide: NG_VALIDATORS,
    //   useExisting: forwardRef(() => CustomDateRangePickerComponent),
    //   multi: true
    // }
  ]
})
export class CustomDateRangePickerComponent implements ControlValueAccessor {
  @Input() startDate: Date | null = null;
  @Input() endDate: Date | null = null;
  @Output() startDateChange = new EventEmitter<Date | null>();
  @Output() endDateChange = new EventEmitter<Date | null>();

  calendarOpen: boolean = false;
  selectedDate: Date | null = null;
  isSelectingStartDate = true; // Flag to switch between start and end date selection

  onChange = (value: any) => {};
  onTouched = () => {};

  // Write the selected date range to the form control
  writeValue(value: { startDate: Date | null, endDate: Date | null }): void {
    if (value) {
      this.startDate = value.startDate;
      this.endDate = value.endDate;
      this.selectedDate = value.startDate;
      this.propagateChange();
    }
  }

  // Register form control change handler
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // Register touched handler
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // Validation logic for both start and end date
  // validate(control: AbstractControl): ValidationErrors | null {
  //   const today = new Date();
  //   today.setHours(0, 0, 0, 0); // Set time to midnight for consistency
  //   if (this.startDate && this.startDate < today) {
  //     return { invalidDate: 'Start date cannot be in the past.' };
  //   }
  //   if (this.endDate && this.endDate < today) {
  //     return { invalidDate: 'End date cannot be in the past.' };
  //   }
  //   if (this.startDate && this.endDate && this.endDate < this.startDate) {
  //     return { invalidRange: 'End date must be later than start date.' };
  //   }
  //   return null;
  // }

  isStartDateInvalid(): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to midnight for consistency
    // Check if startDate exists and if it's before today, else return false
    return this.startDate !== null && this.startDate < today;
  }
  
  isEndDateInvalid(): boolean {
    // Check if endDate exists and if startDate exists, then check if endDate is before startDate
    return this.endDate !== null && this.startDate !== null && this.endDate < this.startDate;
  }
  

  // Toggle calendar visibility and set the selected date field (start or end)
  openCalendar(field: string) {
    this.isSelectingStartDate = (field === 'start');
    this.calendarOpen = true;
  }

  // Handle date selection
  onDateChange(event: Date) {
    if (this.isSelectingStartDate) {
      this.startDate = event;
      this.startDateChange.emit(this.startDate);
    } else {
      this.endDate = event;
      this.endDateChange.emit(this.endDate);
    }
    this.selectedDate = event;
    this.propagateChange();
  }

  // Quick select predefined dates
  setToday() {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to midnight
    this.startDate = today;
    this.endDate = today;
    this.selectedDate = today;
    this.propagateChange();
  }

  setNextMonday() {
    const date = new Date();
    const day = date.getDay();
    const nextMonday = new Date(date.setDate(date.getDate() + ((8 - day) % 7 || 7)));
    nextMonday.setHours(0, 0, 0, 0); // Set time to midnight
    this.startDate = nextMonday;
    this.endDate = nextMonday;
    this.selectedDate = nextMonday;
    this.propagateChange();
  }

  setNextTuesday() {
    const date = new Date();
    const day = date.getDay();
    const nextTuesday = new Date(date.setDate(date.getDate() + ((9 - day) % 7 || 7)));
    nextTuesday.setHours(0, 0, 0, 0); // Set time to midnight
    this.startDate = nextTuesday;
    this.endDate = nextTuesday;
    this.selectedDate = nextTuesday;
    this.propagateChange();
  }

  setOneWeekAhead() {
    const oneWeekAhead = new Date();
    oneWeekAhead.setDate(oneWeekAhead.getDate() + 7);
    oneWeekAhead.setHours(0, 0, 0, 0); // Set time to midnight
    this.startDate = oneWeekAhead;
    this.endDate = oneWeekAhead;
    this.selectedDate = oneWeekAhead;
    this.propagateChange();
  }

  // Save the date range and close the calendar
  save() {
    this.calendarOpen = false;
    this.propagateChange();
  }

  // Cancel the date selection and close the calendar
  cancel() {
    this.calendarOpen = false;
    this.startDate = null;
    this.endDate = null;
    this.selectedDate = null;
    this.startDateChange.emit(this.startDate);
    this.endDateChange.emit(this.endDate);
    this.propagateChange();
  }

  // Notify form control of value change
  private propagateChange() {
    this.onTouched();
    this.onChange({ startDate: this.startDate, endDate: this.endDate });
  }
}
