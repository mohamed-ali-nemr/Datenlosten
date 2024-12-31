import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../Service/inventory.service';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css']
})
export class InventoryListComponent implements OnInit {
  // inventory: any[] = [];
  editingItemId: number | null = null;
  inventoryItems: any[] = []; // This will hold the inventory items
  filteredItems: any[] = [];
  searchQuery: string = ''; // For search input
  stockFilter: string = 'all'; // For stock status filter


  constructor(private inventoryService: InventoryService) { }

  ngOnInit(): void {
    // Subscribe to inventory$ to get updates when inventory changes
    this.inventoryService.inventory$.subscribe(items => {
      this.inventoryItems = items; // Update inventoryItems when inventory changes
      this.applyFilters(); // Apply filters when inventory changes

    });
  }

  startEditing(itemId: number): void {
    this.editingItemId = itemId;
  }

  saveChanges(item: any): void {
    this.inventoryService.updateItem(item);
    this.editingItemId = null;
  }

  cancelEdit(): void {
    this.editingItemId = null;
  }

   // Filter inventory based on search query and stock status
   applyFilters(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredItems = this.inventoryItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(query);
      const matchesStockStatus =
        this.stockFilter === 'all' ||
        (this.stockFilter === 'low' && item.quantity < 5) ||
        (this.stockFilter === 'in-stock' && item.quantity >= 5);

      return matchesSearch && matchesStockStatus;
    });
  }
}
