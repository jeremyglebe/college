import { initializeApp } from "firebase/app";

// Configuration for firebase app
const firebaseConfig  = {
    apiKey: "AIzaSyDgXMBcZjIYvL6SUWTnTpXJJ2yW7kUMeqw",
    authDomain: "hex-army.firebaseapp.com",
    projectId: "hex-army",
    storageBucket: "hex-army.appspot.com",
    messagingSenderId: "614875998821",
    appId: "1:614875998821:web:8e46822215a4e41128b48c"
}
// Create a firebase app connection
const app = initializeApp(firebaseConfig);

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