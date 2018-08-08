import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'HomePage';

  pages: Array<any>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    this.pages = [
      { title: 'Home', component: 'HomePage', img: 'assets/icon/favicon/apple-touch-icon.png' },
      { title: 'Lokkenisms', component: 'LokkenismsPage', img: 'assets/imgs/lokken.png' },
      { title: 'Foosball', link: 'http://foosey.futbol/#/redirect/wca-dev', img: 'assets/imgs/foosey.png' },
      { title: 'Cornhole', link: 'http://foosey.futbol/#/redirect/wca-cornhole', img: 'assets/imgs/foosey.png' }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // If there's a link go there
    if (page.link) {
      window.open(page.link);
    }

    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    else if (page.component) {
      this.nav.setRoot(page.component);
    }
  }
}
