import {Page, Platform} from 'ionic-angular';
import {Add} from '../add/add';

@Page({
  templateUrl: 'build/pages/home/home.html'
})
export class Home {
    homeRoot: any = Page;
    games: Array<Game>;
    addPage: any;
    platform: Platform;
    auth: any;
    serverGames: any;

    constructor(platform: Platform) {
        this.games = [];
        this.addPage = Add;
        this.platform = platform;
        this.initializeApp();    
    }

    initializeApp() {
        this.platform.ready().then(() => {
            var parent = this;
            var Firebase = require("firebase");
            this.serverGames = new Firebase('https://blazing-heat-2153.firebaseio.com/').child('games');

            this.serverGames.on('child_added', function (snapshot) {
                var message = snapshot.val();
                parent.games.push({
                    player1: message.player1,
                    player2: message.player2,
                    p1Score: message.p1Score,
                    p2Score: message.p2Score
                });
            });
            this.auth = this.serverGames.getAuth();
        });
    }

    login() {
        if (this.auth) {
            console.log("User " + this.auth.uid + " is logged in with " + this.auth.provider);
        } else {
            var vm = this;
            this.serverGames.authWithOAuthPopup("google", function (error, authData) {
                if (error) {
                    console.log("Login Failed!", error);
                } else {
                    console.log("Authenticated successfully with payload:", authData);
                    vm.auth = authData;
                }
            });
        }
    }
}

interface Game {
    player1: string;
    player2: string;
    p1Score: number;
    p2Score: number;
}
