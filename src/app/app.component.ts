import { Component } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private dbService: NgxIndexedDBService) {
    // Example: Adding an item to the 'items' object store
  //   this.dbService.add('items', { name: 'John', age: 30 }).subscribe({
  //     next: (key) => console.log('Item added with key:', key),
  //     error: (error) => console.error('Error adding item:', error),
  //   });

  //   // Example: Getting all items from the 'items' object store
  //   this.dbService.getAll('items').subscribe({
  //     next: (items) => console.log('Items:', items),
  //     error: (error) => console.error('Error fetching items:', error),
  //   });
  }
}
