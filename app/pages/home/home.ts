import {Page, Platform, Alert, NavController} from 'ionic-angular';
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
    server: any;
    firebase: any;
    nav: any;

    constructor(platform: Platform, nav: NavController) {
        this.games = [];
        this.nav = nav;
        this.addPage = Add;
        this.platform = platform;
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            var parent = this;
            var config = {
              apiKey: "AIzaSyDTdCQ96RtfLa39NKgmwpwhnjrVKdJEKtw",
              authDomain: "blazing-heat-2153.firebaseapp.com",
              databaseURL: "https://blazing-heat-2153.firebaseio.com",
              storageBucket: "blazing-heat-2153.appspot.com",
            };
            this.firebase = require("firebase");
            firebase.initializeApp(config);
            this.server = firebase.database().ref();
            this.server.child('games').on('child_added', function (snapshot) {
                var message = snapshot.val();
                parent.games.push({
                    player1: message.player1,
                    player2: message.player2,
                    p1Score: message.p1Score,
                    p2Score: message.p2Score
                });
            });

            firebase.auth().onAuthStateChanged(function(user) {
              if (user) {
                parent.auth = true;
              } else {
                parent.auth = false;
              }
            });
        });
    }

    login() {
      var vm = this;
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then(function(result) {
        console.log(result);
        let prompt = Alert.create({
          title: "Introduce tu nombre",
          inputs: [
            {
              name: 'name',
              placeholder: 'Nombre'
            },
          ],
          buttons: [
            {
              text: 'Save',
              handler: data => {
                var user = firebase.auth().currentUser;
                user.updateProfile({
                  displayName: data.name
                });
                vm.server.child('users/' + result.user.uid).set({
                  name: data.name
                });
              }
            }
          ]
        });
        vm.nav.present(prompt);
      }).catch(function(error) {
        console.log("Login Failed!", error);
      });
    }
}

interface Game {
    player1: string;
    player2: string;
    p1Score: number;
    p2Score: number;
}
