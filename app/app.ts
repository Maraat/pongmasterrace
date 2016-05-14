import {App, IonicApp, Platform, MenuController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {Home} from './pages/home/home';


@App({
    templateUrl: 'build/app.html',
    config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
export class MyApp {
    app: App;
    platform: Platform;
    menu: MenuController;
    pages: any;
    rootPage: any;

    static get parameters() {
        return [[IonicApp], [Platform], [MenuController]];
    }

    constructor(app, platform, menu) {
        // set up our app
        this.app = app;
        this.platform = platform;
        this.menu = menu;
        this.initializeApp();

        // set our app's pages
        this.pages = [
            { title: 'Resultados', component: Home }
        ];

        // make HelloIonicPage the root (or first) page
        this.rootPage = Home;
    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
        });
    }

    openPage(page) {
        // close the menu when clicking a link from the menu
        this.menu.close();
        // navigate to the new page if it is not the current page
        let nav = this.app.getComponent('nav');
        nav.setRoot(page.component);
    }
}