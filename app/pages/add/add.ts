import {Page, NavController} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/add/add.html'
})
export class Add {
    server: any;
    nav: NavController;
    users: Array<any>;
    player2: any;
    firebase: any;
    user: string;

    constructor(nav: NavController) {
        this.nav = nav;
        this.users = [];

        this.initializeApp();
    }

    initializeApp() {
        var parent = this;
        var config = {
          apiKey: "AIzaSyDTdCQ96RtfLa39NKgmwpwhnjrVKdJEKtw",
          authDomain: "blazing-heat-2153.firebaseapp.com",
          databaseURL: "https://blazing-heat-2153.firebaseio.com",
          storageBucket: "blazing-heat-2153.appspot.com",
        };
        this.firebase = require("firebase");
        this.server = firebase.database().ref();
        this.user = firebase.auth().currentUser.displayName;

        this.server.child('users').on('child_added', function (snapshot) {
            var message = snapshot.val();
            parent.users.push(message.name);
        });

        this.player2 = 'Player2';
    }

    addGame(p1score, p2score) {
        this.server.child('games').push({
            player1: this.user,
            player2: this.player2,
            p1Score: p1score,
            p2Score: p2score
        });
        this.nav.pop();
    }
}
