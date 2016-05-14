import {Page} from 'ionic-angular';
import {Add} from '../add/add';

@Page({
  templateUrl: 'build/pages/home/home.html'
})
export class Home {
    homeRoot: any = Page;
    games: Array<Game>;
    addPage: any;

    constructor() {
        this.games = [];
        this.addPage = Add;

        var parent = this;       
        var Firebase = require("firebase");

        var serverGames = new Firebase('https://blazing-heat-2153.firebaseio.com/').child('games');

        serverGames.on('child_added', function (snapshot) {
            var message = snapshot.val();
            parent.games.push({
                player1: message.player1,
                player2: message.player2,
                p1Score: message.p1Score,
                p2Score: message.p2Score
            });
        });

        var authData = serverGames.getAuth();
        if (authData) {
            console.log("User " + authData.uid + " is logged in with " + authData.provider);
        } else {
            serverGames.authWithOAuthPopup("google", function (error, authData) {
                if (error) {
                    console.log("Login Failed!", error);
                } else {
                    console.log("Authenticated successfully with payload:", authData);
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
