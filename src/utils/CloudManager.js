import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// Configuration for firebase app
const firebaseConfig = {
    apiKey: "AIzaSyDgXMBcZjIYvL6SUWTnTpXJJ2yW7kUMeqw",
    authDomain: "hex-army.firebaseapp.com",
    projectId: "hex-army",
    storageBucket: "hex-army.appspot.com",
    messagingSenderId: "614875998821",
    appId: "1:614875998821:web:8e46822215a4e41128b48c"
}
// Create a firebase app connection
const APP = initializeApp(firebaseConfig);
// Google authentication provider
const GOOGLE_AUTH = new GoogleAuthProvider();

/**
 * Singleton manager for cloud-based operations (serverless multiplayer)
 */
export class CloudManager extends Phaser.Events.EventEmitter {
    /** DO NOT CONSTRUCT THIS OBJECT DIRECTLY, USE CloudManager.get() */
    constructor() {
        super();
        // User object of the currently logged in user
        this.user = {
            id: 'player'
        };
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

    async login() {
        const auth = getAuth();
        try {
            let result = await signInWithPopup(auth, GOOGLE_AUTH);
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log("Logged in with Google!");
        }
        catch (error) {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
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