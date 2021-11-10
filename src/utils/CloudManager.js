import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, User, signOut } from "firebase/auth";
import { getFirestore, collection } from 'firebase/firestore';

/** @type {import("@firebase/app").FirebaseAppSettings} */
const firebaseConfig = {
    apiKey: "AIzaSyDgXMBcZjIYvL6SUWTnTpXJJ2yW7kUMeqw",
    authDomain: "hex-army.firebaseapp.com",
    projectId: "hex-army",
    storageBucket: "hex-army.appspot.com",
    messagingSenderId: "614875998821",
    appId: "1:614875998821:web:8e46822215a4e41128b48c"
}

/**
 * Singleton manager for cloud-based operations (serverless multiplayer)
 */
export class CloudManager extends Phaser.Events.EventEmitter {
    /** DO NOT CONSTRUCT THIS OBJECT DIRECTLY, USE CloudManager.get() */
    constructor() {
        super();
        /** @type {FirebaseApp} Create a firebase app connection */
        this.app = initializeApp(firebaseConfig);
        /** @type {Auth} */
        this.auth = getAuth(this.app);
        /** @type {GoogleAuthProvider} */
        this.authProvider = new GoogleAuthProvider();
        /** @type {Firestore} The firestore instance (cloud database) */
        this.db = getFirestore(this.app);
        /** @type {User|null} object of the currently logged in user */
        this.user = null;
    }
    
    /**
     * @returns the single instance of the CloudManager, shared globally
     */
    static get() {
        //if an instance has not been made yet, create one
        if (instance == null) {
            instance = new CloudManager;
        }
        //as long as we have an instance, return it
        return instance;
    }

    /**
     * Tries to login with Google authentication
     * @returns {User} The firebase user object of the authenticated user
     */
    async login() {
        try {
            let result = await signInWithPopup(this.auth, this.authProvider);
            // The signed-in user info.
            this.user = result.user;
            console.log("Logged in with Google! ", this.user);
            return this.user;
        }
        catch (error) {
            console.log("Login Failed: ", error);
        }
    }

    /**
     * Signs a user out of their google account
     */
    async logout() {
        await signOut(this.auth);
        this.user = null;
    }

    /**
     * Add a new game to the database hosted by the logged in user. Does
     * nothing if no user is logged in.
     */
    async createGame() {
        if (this.user) {
            await this.games_collection.add({
                host: this.user.username,
                active: true,
                lobby: true,
                players: [
                    this.user.username
                ]
            });
        }
    }

    // async createGameState(game_state){

    // }

    // async onGameStateUpdate(game_state){

    // }

    // async readGameState(){

    // }

    // async updateGameState(game_state){

    // }


}
/**
 * The instance of the singleton class. (CloudManager) Module level variable
 * and cannot be seen by other scripts.
 */
let instance = null;