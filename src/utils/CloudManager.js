import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, User } from "firebase/auth";

/** @type {import("@firebase/app").FirebaseAppSettings} */
const firebaseConfig = {
    apiKey: "AIzaSyDgXMBcZjIYvL6SUWTnTpXJJ2yW7kUMeqw",
    authDomain: "hex-army.firebaseapp.com",
    projectId: "hex-army",
    storageBucket: "hex-army.appspot.com",
    messagingSenderId: "614875998821",
    appId: "1:614875998821:web:8e46822215a4e41128b48c"
}
/** @type {FirebaseApp} Create a firebase app connection */
const APP = initializeApp(firebaseConfig);
/** @type {GoogleAuthProvider} */
const GOOGLE_AUTH = new GoogleAuthProvider();

/**
 * Singleton manager for cloud-based operations (serverless multiplayer)
 */
export class CloudManager extends Phaser.Events.EventEmitter {
    /** DO NOT CONSTRUCT THIS OBJECT DIRECTLY, USE CloudManager.get() */
    constructor() {
        super();
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
        const auth = getAuth();
        try {
            let result = await signInWithPopup(auth, GOOGLE_AUTH);
            // The signed-in user info.
            this.user = result.user;
            console.log("Logged in with Google! ", this.user);
            return this.user;
        }
        catch (error) {
            console.log("Login Failed: ", error);
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