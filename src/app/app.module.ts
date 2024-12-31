import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { InventoryDetailsComponent } from './inventory-details/inventory-details.component';
import { AddInventoryComponent } from './add-inventory/add-inventory.component';

@NgModule({
  declarations: [
    AppComponent,
    InventoryListComponent,
    InventoryDetailsComponent,
    AddInventoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, // Add FormsModule here
    ReactiveFormsModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
