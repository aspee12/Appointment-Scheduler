import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminsRoutingModule } from './admins-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminsRoutingModule
  ]
})
export class AdminModule {
  id: number = 0;
  fullname: string = '';
  email: string = '';
  phone: string = '';
  isApprove: boolean = false;
}
