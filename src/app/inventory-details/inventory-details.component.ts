import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryService } from '../Service/inventory.service';

@Component({
  selector: 'app-inventory-details',
  templateUrl: './inventory-details.component.html',
  styleUrls: ['./inventory-details.component.css']
})
export class InventoryDetailsComponent implements OnInit {
  item: any = {};
  isEditing = false;

  constructor(
    private route: ActivatedRoute,
    private inventoryService: InventoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.inventoryService.getInventoryItem(id).subscribe(item => {
      if (item) {
        this.item = { ...item }; // Clone to avoid direct mutations
      }
    });
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  saveChanges(): void {

    if (this.item) {
      this.inventoryService.updateItem(this.item); // Save the changes to the shared service
      this.isEditing = false; // Exit edit mode
      alert('Data saved successfully!'); // Display the alert
    }

  }

  cancelEdit(): void {
    this.isEditing = false;
  }
}
