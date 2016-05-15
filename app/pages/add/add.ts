import {Page, NavController} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/add/add.html'
})
export class Add {
    server: any;
    nav: NavController;
    auth: any;
    users: Array<any>;
    player2: any;

    constructor(nav: NavController) {
        this.nav = nav;
        this.users = [];

        var Firebase = require("firebase");
        this.server = new Firebase('https://blazing-heat-2153.firebaseio.com/');
        this.auth = this.server.getAuth();

        this.initializeApp();
    }

    initializeApp() {
        var parent = this;
        this.server.child('users').on('child_added', function (snapshot) {
            var message = snapshot.val();
            parent.users.push(message.name);
        });
    }

    addGame(p1score, p2score) {
        this.server.child('games').push({
            player1: this.auth.google.displayName,
            player2: this.player2,
            p1Score: p1score,
            p2Score: p2score
        });
        this.nav.pop();
    }
}