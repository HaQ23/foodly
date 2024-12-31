import { NgModule } from '@angular/core';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { NavigationModule } from 'src/app/shared/ui/navigation/navigation.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, MainRoutingModule, NavigationModule, SharedModule],
})
export class MainModule {}
