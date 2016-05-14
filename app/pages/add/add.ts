import {Page, NavController} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/add/add.html'
})
export class Add {
    serverGames: any;
    nav: NavController;
    constructor(nav: NavController) {
        this.nav = nav;
        var Firebase = require("firebase");
        this.serverGames = new Firebase('https://blazing-heat-2153.firebaseio.com/').child('games');
    }

    addGame(player1, player2, p1score, p2score) {
        this.serverGames.push({
            player1: player1,
            player2: player2,
            p1Score: p1score,
            p2Score: p2score
        });
        this.nav.pop();
    }
}