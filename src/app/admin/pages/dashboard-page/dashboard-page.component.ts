import { Component, OnInit } from '@angular/core';
import {animate, group, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  animations: [
    trigger('DivInOut', [
      state('in', style({height: '*', opacity: 0})),
      transition(':leave', [
        style({height: '*', opacity: 1}),

        group([
          animate(200, style({height: 0})),
          animate('200ms ease-in-out', style({'opacity': '0'}))
        ])

      ]),
      transition(':enter', [
        style({height: '0', opacity: 0}),

        group([
          animate(200, style({height: '*'})),
          animate('200ms ease-in-out', style({'opacity': '1'}))
        ])

      ])
    ])
  ]
})
export class DashboardPageComponent implements OnInit {
  showLAUBody: boolean;
  showCUBody: boolean;
  showUUBody: boolean;
  showSAPBody: boolean;

  constructor() {
    this.showLAUBody = false;
    this.showCUBody = false;
    this.showUUBody = false;
    this.showSAPBody = false;

  }

  ngOnInit(): void {
  }

}
