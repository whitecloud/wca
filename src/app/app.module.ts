import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LokkenismsPageModule } from '../pages/lokkenisms/lokkenisms.module';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LokkenismsProvider } from '../providers/lokkenisms/lokkenisms';

const firebase = {
  apiKey: "AIzaSyAGPFqemxMI-4NmiIJA4nQeDpEtBTR2EEE",
    authDomain: "whitecloud-456d0.firebaseapp.com",
    databaseURL: "https://whitecloud-456d0.firebaseio.com",
    projectId: "whitecloud-456d0",
    storageBucket: "whitecloud-456d0.appspot.com",
    messagingSenderId: "1033873087043"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    LokkenismsPageModule,
    AngularFireModule.initializeApp(firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LokkenismsProvider
  ]
})
export class AppModule {}
