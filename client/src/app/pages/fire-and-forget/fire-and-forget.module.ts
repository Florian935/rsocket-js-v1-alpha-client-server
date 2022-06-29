import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FireAndForgetRoutingModule } from './fire-and-forget-routing.module';
import { FireAndForgetManagerComponent } from './components/fire-and-forget-manager.component';


@NgModule({
  declarations: [
    FireAndForgetManagerComponent
  ],
  imports: [
    CommonModule,
    FireAndForgetRoutingModule
  ]
})
export class FireAndForgetModule { }
