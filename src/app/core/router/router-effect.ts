import { Action, Store } from '@ngrx/store';
import {
  NavigationExtras,
  Router,
  ActivationEnd,
  ChildActivationStart,
  ChildActivationEnd
} from '@angular/router';
import { Injectable, OnDestroy } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, tap, filter, takeUntil } from 'rxjs/operators';

// import * as actions from '../actions/auth.action';
import { Subject } from 'rxjs/internal/Subject';
import { Title } from '@angular/platform-browser';
// import { environment as env } from '../../../../environments/environment';
import { AppState } from '@app/core/core.state';

export class RouterGo implements Action {
  readonly type = '[Router] Go';

  constructor(
    public payload: {
      path: any[];
      queryParams?: object;
      extras?: NavigationExtras;
    }
  ) {}
}

export class RouteChange implements Action {
  readonly type = '[Router] Route Change';
  constructor(public payload: { params: any; path: string }) {}
}

@Injectable()
export class RouterEffects implements OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  appName = 'Autohub';

  constructor(
    private actions$: Actions,
    private router: Router,
    private store$: Store<AppState>,
    private titleService: Title
  ) {
    this.subscribeToAuthenticatedEvents();
    this.subscribeToRouterEvents();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  navigate$ = this.actions$.pipe(
    ofType('[Router] Go'),
    map((action: RouterGo) => action.payload),
    tap(
      ({ path }) => {
      //  `${this.redirect}?service=account&from=${this.domain}${path}`)
      }
        // (window.location.href = `${this.redirect}?service=account&from=${
        //   this.domain
        // }${path}`)
    )
  );

  private subscribeToAuthenticatedEvents() {
    // this.store$
    //   .select(getAuthLoaded)
    //   .pipe(takeUntil(this.unsubscribe$))
    //   .subscribe(auth => {
    //     if (auth) {
    //       return this.router.navigate(['admin']);
    //     } else {
    //       return auth;
    //     }
    //   });
  }

  private subscribeToRouterEvents() {
    this.router.events
      .pipe(
        filter(
          event =>
            event instanceof ActivationEnd ||
            event instanceof ChildActivationStart ||
            event instanceof ChildActivationEnd
        ),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(event => {
        if (event instanceof ActivationEnd) {
          this.setPageTitle(event);
        }
        if (event instanceof ChildActivationStart) {
    //      this.store$.dispatch(new actions.DoSpinnerShowAction());
        }
        if (event instanceof ChildActivationEnd) {
    //      this.store$.dispatch(new actions.DoSpinnerHideAction());
        }
      });
  }

  private setPageTitle(event: ActivationEnd) {
    const { title } = event.snapshot.data;
    this.titleService.setTitle(
      title ? `${title} - ${this.appName}` : this.appName
    );
  }
}
