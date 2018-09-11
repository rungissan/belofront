import browser from 'browser-detect';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding, OnDestroy, OnInit, Inject, HostListener, InjectionToken } from '@angular/core';
import { ActivationEnd, Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Store, select } from '@ngrx/store';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {
  ActionAuthLogin,
  ActionAuthLogout,
  AnimationsService,
  TitleService,
  selectAuth,
  routeAnimations,
  AppState
  } from '@app/core';
import { environment as env } from '@env/environment';

import {
  NIGHT_MODE_THEME,
  selectSettings,
  SettingsState,
  ActionSettingsPersist,
  ActionSettingsChangeLanguage,
  ActionSettingsChangeAnimationsPageDisabled
} from './settings';
import { WINDOW } from '@app/core/services/window.service';

export const DOCUMENT = new InjectionToken<Document>('DocumentToken');


@Component({
  selector: 'anms-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations]
})
export class AppComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();

  @HostBinding('class') componentCssClass;


  isProd = env.production;
  envName = env.envName;
  version = env.versions.app;
  year = new Date().getFullYear();
  logo = require('../assets/logo.png');
  languages = ['ru', 'en', 'de', 'sk', 'fr', 'es', 'pt-br'];
  navigation = [
    { link: 'about', label: 'anms.menu.about' },
    { link: 'features', label: 'anms.menu.features' },
    { link: 'examples', label: 'anms.menu.examples' },
    { link: 'contact', label: 'anms.menu.contact' }
  ];
  navigationSideMenu = [
    ...this.navigation,
    { link: 'settings', label: 'anms.menu.settings' }
  ];

  settings: SettingsState;
  isAuthenticated: boolean;
  navIsFixed: boolean;
  loading = true;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window: Window,
    public overlayContainer: OverlayContainer,
    private store: Store<AppState>,
    private router: Router,
    private titleService: TitleService,
    private animationService: AnimationsService,
    private translate: TranslateService
  ) {
    console.log(this.document);
}


  private static trackPageView(event: NavigationEnd) {
    (<any>window).ga('set', 'page', event.urlAfterRedirects);
    (<any>window).ga('send', 'pageview');
  }

  private static isIEorEdge() {
    return ['ie', 'edge'].includes(browser().name);
  }

  scrollToTop() {
    const top = this.document.getElementById('top');
     if (top !== null) {
      top.scrollIntoView({ behavior: 'smooth' });
    }

  }
  scroll = ($event) => {
    const number = $event.srcElement.scrollTop || 0;
    if (number > 500) {
      this.navIsFixed = true;
    } else if (this.navIsFixed && number < 10) {
      this.navIsFixed = false;
    }
  }

  ngOnInit(): void {
    this.translate.setDefaultLang('ru');
    this.subscribeToSettings();
    this.subscribeToIsAuthenticated();
    this.subscribeToRouterEvents();
    this.window.addEventListener('scroll', this.scroll, true);
  }


  ngOnDestroy(): void {
    this.window.removeEventListener('scroll', this.scroll, true);
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onLoginClick() {
    this.store.dispatch(new ActionAuthLogin());
  }

  onLogoutClick() {
    this.store.dispatch(new ActionAuthLogout());
  }

  onLanguageSelect({ value: language }) {
    this.store.dispatch(new ActionSettingsChangeLanguage({ language }));
    this.store.dispatch(new ActionSettingsPersist({ settings: this.settings }));
  }

  private subscribeToIsAuthenticated() {
    this.store
      .pipe(select(selectAuth), takeUntil(this.unsubscribe$))
      .subscribe(auth => (this.isAuthenticated = auth.isAuthenticated));
  }

  private subscribeToSettings() {
    if (AppComponent.isIEorEdge()) {
      this.store.dispatch(
        new ActionSettingsChangeAnimationsPageDisabled({
          pageAnimationsDisabled: true
        })
      );
    }
    this.store
      .pipe(select(selectSettings), takeUntil(this.unsubscribe$))
      .subscribe(settings => {
        this.settings = settings;
        this.setTheme(settings);
        this.setLanguage(settings);
        this.animationService.updateRouteAnimationType(
          settings.pageAnimations,
          settings.elementsAnimations
        );
      });
  }

  private setTheme(settings: SettingsState) {
    const { theme, autoNightMode } = settings;
    const hours = new Date().getHours();
    const effectiveTheme = (autoNightMode && (hours >= 20 || hours <= 6)
      ? NIGHT_MODE_THEME
      : theme
    ).toLowerCase();
    this.componentCssClass = effectiveTheme;
    const classList = this.overlayContainer.getContainerElement().classList;
    const toRemove = Array.from(classList).filter((item: string) =>
      item.includes('-theme')
    );
    if (toRemove.length) {
      classList.remove(...toRemove);
    }
    classList.add(effectiveTheme);
  }

  private setLanguage(settings: SettingsState) {
    const { language } = settings;
    if (language) {
      this.translate.use(language);
    }
  }

  private subscribeToRouterEvents() {
    this.router.events.pipe(takeUntil(this.unsubscribe$)).subscribe(event => {
      if (event instanceof ActivationEnd) {
        this.titleService.setTitle(event.snapshot);
      }

      if (event instanceof NavigationEnd) {
        AppComponent.trackPageView(event);
      }
    });
  }

}
