import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';


import { AboutComponent } from './about.component';

import { AboutRoutingModule } from '@app/static/about/about-routing.module';
import { CalculatorsModule } from '@app/static/calculators/calculators.module';


@NgModule({
  imports: [SharedModule, AboutRoutingModule, CalculatorsModule],
  declarations: [AboutComponent]
})

export class AboutModule {}
