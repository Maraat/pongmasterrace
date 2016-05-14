import {App, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {Home} from './pages/home/home';


@App({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
export class MyApp {
    rootPage: any = Home;
}
