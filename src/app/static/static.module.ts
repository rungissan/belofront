import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';

import { StaticRoutingModule } from './static-routing.module';
// import { AboutComponent } from './about/about.component';
import { FeaturesComponent } from './features/features.component';
import { AboutModule } from '@app/static/about/about.module';

@NgModule({
  imports: [SharedModule, StaticRoutingModule, AboutModule],
  declarations: [FeaturesComponent]
})
export class StaticModule {}
