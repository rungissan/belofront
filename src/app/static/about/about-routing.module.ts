import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from '@app/static/about/about.component';
import { CalculatorsComponent } from '@app/static/calculators/calculators.component';

const routes: Routes = [
  {
    path: 'about',
    component: AboutComponent,
    children: [
      {
        path: 'calculators',
        loadChildren: 'app/static/calculators/calculators.module#CalculatorsModule',
      //  component: CalculatorsComponent,
        data: { title: 'anms.menu.about' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule {}
