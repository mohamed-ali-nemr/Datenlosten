import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { InventoryDetailsComponent } from './inventory-details/inventory-details.component';
import { AddInventoryComponent } from './add-inventory/add-inventory.component';

const routes: Routes = [
  { path: 'inventory', loadChildren: () => import('./inventory/inventory.module').then(m => m.InventoryModule) },
  { path: 'inventory/:id', component: InventoryDetailsComponent },
  { path: 'add-inventory', component: AddInventoryComponent },

  { path: '', redirectTo: '/inventory', pathMatch: 'full' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
