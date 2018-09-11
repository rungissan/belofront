import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';

@Component({
  selector: 'app-calculators',
  templateUrl: './calculators.component.html',
  styleUrls: ['./calculators.component.scss']
})
export class CalculatorsComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  routeLinks: any[];
  activeLinkIndex = -1;

  constructor(private router: Router) {
    this.routeLinks = [
      {
        label: 'Car',
        link: 'calculators/car',
        index: 0
      },
      {
        label: 'Electro',
        link: 'calculators/electro',
        index: 1
      },
      {
        label: 'Moto',
        link: 'calculators/moto',
        index: 2
      },
      {
        label: 'Track',
        link: 'calculators/track',
        index: 3
      }
    ];
  }

  ngOnInit() {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.routeLinks.indexOf(this.routeLinks.find(tab => {
        const url = this.router.url.substr(this.router.url.lastIndexOf('/') + 1);
        console.log(url);
        console.log(tab.link);
        return tab.link === url;
      }));
    });
  }
  getActiveClass(indexOfRouteLink) {
    let tabsclass = 'mat-tab-link';
    if (this.activeLinkIndex === indexOfRouteLink) {
      tabsclass = 'mat-tab-link mat-tab-label-active';
    }

    return tabsclass;
  }

}
