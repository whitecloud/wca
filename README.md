# WhiteCloud App
The in-house application for the WhiteCloud office. Someday, this app might be really snazzy. Right now, just add Lokkenisms™️ as you hear them from the Lokkenisms tab.
  
## Contribute

Feel free to build anything and add it to this app as you see fit. The spirit of this application is that it will encompass the unique culture at WhiteCloud (or Boise Relias) and will make our lives better or more fun. To get started:

- Clone the repo, make a branch for your feature, and run `npm install`
- Install the latest version of Ionic `npm install -g ionic@latest`
- Run `ionic serve` and build something awesome
- Create a PR so we can get some 👀 on it
- Profit?

## Deploy

This project is set up with Firebase hosting and cloud functions, and the deploy process is super slick. If you have tested what you built, or made such a minor change that it won't affect anything, just push it out. Continuous deployment, baby. In the future, we'll update this section to include iOS/Android deployment.

- Install the Firebase Tools `npm install -g firebase-tools`
- Run `firebase deploy` from the root of the project

## Future Plans

- Auth with Google or WCA email/password perhaps (we don't manage passwords, Firebase auth does for us)
- Deploy to App Store and Google Play so employees can easily install the app
- Add integrations or simply links to other apps such as Foosey and BITS
- RateMyBeer™️, a safe space to tell Randall how you really feel about his FunSchway beer choices
- Karaoke challenges perhaps? (talk to Justin and Adam)

## Stack

This application was built using Ionic 3 (which bundles Angular 4 with it), Google FireStore, and will use Cordova in the future for native iOS and Android deployment through the app store. If there's a nifty framework or language you'd like to try out, this is a good playground for it, but keeping it an Ionic/Angular/Cordova app for now will help us stay with one codebase we can all be familiar with.
