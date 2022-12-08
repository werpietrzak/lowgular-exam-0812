import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {ProductsServiceModule} from "./services/products.service-module";
import {AdvancedListComponentModule} from "./components/advanced-list/advanced-list.component-module";
import {AdvancedListComponent} from "./components/advanced-list/advanced-list.component";

@NgModule({
  imports: [RouterModule.forRoot([{
    path: 'advanced-list', component: AdvancedListComponent
  }])],
  exports: [RouterModule, ProductsServiceModule, AdvancedListComponentModule]
})
export class AppRoutingModule { }
