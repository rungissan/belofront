import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarComponent } from '@app/static/calculators/car/car.component';
import { ElectroComponent } from '@app/static/calculators/electro/electro.component';
import { MotoComponent } from '@app/static/calculators/moto/moto.component';
import { TrackComponent } from '@app/static/calculators/track/track.component';
import { CalculatorsComponent } from '@app/static/calculators/calculators.component';
import { AboutComponent } from '@app/static/about/about.component';

const routes: Routes = [
  {
    path: 'about/calculators',
    component: CalculatorsComponent,
    children: [
      { path: 'car', component: CarComponent },
      { path: 'electro', component: ElectroComponent },
      { path: 'moto', component: MotoComponent },
      { path: 'track', component: TrackComponent },
      { path: '**', redirectTo: 'car', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalculatorsRoutingModule {}
