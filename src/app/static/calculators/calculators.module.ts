import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalculatorsRoutingModule } from '@app/static/calculators/calculators-routing.module';
import { CalculatorsComponent } from '@app/static/calculators/calculators.component';
import { CarComponent } from '@app/static/calculators/car/car.component';
import { TrackComponent } from '@app/static/calculators/track/track.component';
import { ElectroComponent } from '@app/static/calculators/electro/electro.component';
import { MotoComponent } from '@app/static/calculators/moto/moto.component';
import { SharedModule } from '@app/shared';
@NgModule({
  imports: [
    CommonModule,
    CalculatorsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    CalculatorsComponent,
    CarComponent,
    TrackComponent,
    ElectroComponent,
    MotoComponent
  ],
  exports: [CalculatorsComponent]
})
export class CalculatorsModule {}
