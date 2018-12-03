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
import { EntryDataServiceProvider } from '../providers/entry-data-service/entry-data-service';
import { CurrentPage } from '../pages/current/current';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EntryDetailPage,
    ChartPage,
    TabsPage,
    CurrentPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EntryDetailPage,
    ChartPage,
    TabsPage,
    CurrentPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    EntryDataServiceProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
