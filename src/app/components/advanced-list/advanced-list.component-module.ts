import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { FlexModule } from '@angular/flex-layout/flex';
import { AdvancedListComponent } from './advanced-list.component';

@NgModule({
  imports: [MatListModule, CommonModule, FlexModule],
  declarations: [AdvancedListComponent],
  providers: [],
  exports: [AdvancedListComponent]
})
export class AdvancedListComponentModule {
}
