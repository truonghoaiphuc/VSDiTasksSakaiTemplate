import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginModule } from './login/login.module';
import { UnauthorizedRoutingModule } from './unauthorized-routing.module';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

@NgModule({
    declarations: [
    PagenotfoundComponent
  ],
    imports: [CommonModule],
})
export class UnauthorizedModule {}
