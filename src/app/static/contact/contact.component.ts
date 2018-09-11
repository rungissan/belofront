import { Component, OnDestroy, OnInit, AfterViewInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

// @ngrx
import { Store, select } from '@ngrx/store';

// rxjs
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

// actions
import { AuthenticateAction } from '@app/users/users.actions';

// reducers
import {
  getAuthenticationError,
  isAuthenticated,
  isAuthenticationLoading,
} from '@app/users/users.selectors';
import * as RouterActions from '@app/core/router/router-effect';
import { AppState } from '@app/core/core.state';
import { DOCUMENT } from '@angular/common';


declare var google: any;


/**
 * /users/sign-in
 * @class SignInComponent
 */
@Component({
  selector: 'anms-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnDestroy, OnInit, AfterViewInit {


  /**
   * The error if authentication fails.
   * @type {Observable<string>}
   */
  public error: Observable<string>;

  /**
   * True if the authentication is loading.
   * @type {boolean}
   */
  public loading: Observable<boolean>;

  /**
   * The authentication form.
   * @type {FormGroup}
   */
  public form: FormGroup;
  private unsubscribe$: Subject<void> = new Subject<void>();


  /**
   * @constructor
   * @param {FormBuilder} formBuilder
   * @param {Store<State>} store
   */
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) { }

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   * @method ngOnInit
   */
  public ngOnInit() {
    // set formGroup
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      request: ['', Validators.required]
    });

    // set error
    this.error = this.store.pipe(select(getAuthenticationError));

    // set loading
    this.loading = this.store.pipe(select(isAuthenticationLoading));

    // subscribe to success
    this.store.pipe(
      select(isAuthenticated),
      takeUntil(this.unsubscribe$),
      filter(authenticated => authenticated))
      .subscribe(() => {
        this.store.dispatch(new RouterActions.RouterGo({
          path: ['/users/my-account']
        }));
      });
  }

  /**
   *  Lifecycle hook that is called when a directive, pipe or service is destroyed.
   * @method ngOnDestroy
   */
  public ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  /**
   * Go to the home page.
   * @method home
   */
  public home() {
    this.store.dispatch(new RouterActions.RouterGo({
      path: ['/']
    }));
  }

  /**
   * To to the sign up page.
   * @method signUp
   */
  public signUp() {
    this.store.dispatch(new RouterActions.RouterGo({
      path: ['/users/sign-up']
    }));
  }

  /**
   * Submit the authentication form.
   * @method submit
   */
  public submit() {
    console.log(this.form);
    const firstName: string = this.form.get('firstName').value;
    const lastName: string = this.form.get('lastName').value;
    const email: string = this.form.get('email').value;
    const phone: string = this.form.get('phone').value;
    const request: string = this.form.get('request').value;

    // trim values
    firstName.trim();
    lastName.trim();
    email.trim();
    phone.trim();
    request.trim();

    // set payload
    const payload = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      request: request
    };

    // dispatch AuthenticationAction and pass in payload
   // this.store.dispatch(new SendContactAction(payload));
  }
  load = async (s) => {
    return new Promise(async r => {
      for (let i = 0; i < this.document.scripts.length; i++) {
        if (this.document.scripts[i].src === s) { return r(); }
      }
      const e = this.document.createElement('script');
      e.src = s;
      this.document.body.appendChild(e);
      e.onload = r;
    });
  }

   gmap = async (e) => {
    return new Promise(async r => {
      e.style.width = e.getAttribute('size');
      e.style.height = '400px';
      const latlng = e.getAttribute('latlng').split(',');
      // tslint:disable-next-line:max-line-length
      await this.load('https://maps.googleapis.com/maps/api/js?key=AIzaSyCPoPxOBu6vnNPF4EuDQsS-UYhhySu1uG4&hl=ru');
      const map = new google.maps.Map(e, {
        center: new google.maps.LatLng(latlng[0], latlng[1]),
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(latlng[0], latlng[1]),
        map: map,
        title: 'Autohub'
      });
      const contentString = '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<h1 id="firstHeading" class="firstHeading">Autohub</h1>' +
        '<div id="bodyContent">' +
        '<p><b>Autohub</b>, also referred to as <b>Belo Company</b>, is a large ' +
        '<span>+380678882727</span>  rock formation in the southern part of the ' +
        'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) ' +
        'Aboriginal people of the area. It has many springs, waterholes, ' +
        'rock caves and ancient paintings. Autohub is listed as a World ' +
        'Heritage Site.</p>' +
        '<p>Attribution: Ura, <a href="https://ura.org.ua">Ura Internet<\a>' +
        '</div>' +
        '</div>';

      const infowindow = new google.maps.InfoWindow({
        content: contentString
      });
      infowindow.open(map, marker);
      marker.addListener('click',  () => {
        infowindow.open(map, marker);
      });
      r(map);
    });
  }

  ngAfterViewInit() {
    (async () => {
      const controls = this.document.querySelectorAll('div[control=gmap]');
      for (let i = 0; i < controls.length; i++) {
        await this.gmap(controls[i]);
      }
    })();
    }

}
