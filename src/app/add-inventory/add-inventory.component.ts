import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventoryService } from '../Service/inventory.service';

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.css']
})
export class AddInventoryComponent {
  addInventoryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService
  ) {
    this.addInventoryForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(0)]],
      lastUpdated: [new Date().toISOString().split('T')[0], Validators.required]
    });
  }

  onSubmit(): void {
    if (this.addInventoryForm.valid) {
      // Add item to inventory using the inventory service
      this.inventoryService.addItem(this.addInventoryForm.value); // This should update the BehaviorSubject
      alert('New inventory item added successfully!'); // Show success alert

      // Reset the form
      this.addInventoryForm.reset({
        name: '',
        category: '',
        quantity: 0,
        lastUpdated: new Date().toISOString().split('T')[0]
      });
    } else {
      alert('Please fix the errors in the form.');
    }
  }
}
