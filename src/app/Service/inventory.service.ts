import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private inventoryUrl = 'assets/inventory.json';
  private inventory: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]); // Initialize with an empty array
  inventory$ = this.inventory.asObservable(); // Observable to subscribe to


  constructor(private http: HttpClient) {
    this.loadInventory(); // Load data on service initialization

  }

  // Load inventory from JSON or API
  private loadInventory(): void {
    this.http.get<any[]>(this.inventoryUrl).subscribe(data => {
      this.inventory.next(data); // Notify subscribers with the loaded data
    });
  }

  // Get all inventory items
  getInventory(): Observable<any[]> {
    return this.inventory$;
  }

  // Get a specific inventory item by ID
  getInventoryItem(id: number): Observable<any | undefined> {
    return this.inventory$.pipe(
      map(items => items.find(item => item.id === id))
    );
  }

   // Example to update an inventory item
   updateItem(updatedItem: any): void {
    const currentInventory = this.inventory.value;
    const index = currentInventory.findIndex(item => item.id === updatedItem.id);
    if (index !== -1) {
      currentInventory[index] = updatedItem;
      this.inventory.next([...currentInventory]); // Notify subscribers about the update
    }
  }

    // Add a new item to the inventory
    addItem(newItem: any): void {
      const currentInventory = this.inventory.value;
      const id = currentInventory.length > 0 ? Math.max(...currentInventory.map(item => item.id)) + 1 : 1;
      newItem.id = id; // Assign a new ID to the new item
      const updatedInventory = [...currentInventory, newItem]; // Create a new array with the new item added
      this.inventory.next(updatedInventory); // Update the BehaviorSubject to trigger subscribers
    }
  

}
