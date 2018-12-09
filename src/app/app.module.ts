import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { EntryDetailPage } from '../pages/entry-detail/entry-detail';
import { ChartPage } from '../pages/chart/chart';
import { TabsPage } from '../pages/tabs/tabs';
import { SettingsPage } from '../pages/settings/settings';
import { CurrentPage } from '../pages/current/current';
import { NewLocationPage } from '../pages/new-location/new-location';
import { NewMoodPage } from '../pages/new-mood/new-mood';
import { LocationListPage } from "../pages/location-list/location-list";
import { LocationListNewPage } from "../pages/location-list-new/location-list-new";

import { EntryDataServiceProvider } from '../providers/entry-data-service/entry-data-service';
import { LocationDataServiceProvider } from '../providers/location-data-service/location-data-service';

import { HttpClientModule } from '@angular/common/http';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Geolocation } from '@ionic-native/geolocation';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EntryDetailPage,
    ChartPage,
    TabsPage,
    CurrentPage,
    NewMoodPage,
    NewLocationPage,
    SettingsPage,
    LocationListPage,
    LocationListNewPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EntryDetailPage,
    ChartPage,
    TabsPage,
    CurrentPage,
    NewMoodPage,
    NewLocationPage,
    SettingsPage,
    LocationListPage,
    LocationListNewPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    LocalNotifications,
    EntryDataServiceProvider,
    LocationDataServiceProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
