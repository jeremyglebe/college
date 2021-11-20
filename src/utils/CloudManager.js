import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, User, signOut } from "firebase/auth";
import { getFirestore, collection, query, where, addDoc } from 'firebase/firestore';
import { CONFIGS } from '../Configs';

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
        /** @type {CollectionReference<DocumentData>} Collection containing all pending games */
        this.collectionGames = collection(this.db, 'Games');
        /** @type {Query<any>} Query which searches for pending games */
        this.queryPendingGames = query(this.collectionGames, where('pending', '==', true));
        /** Function which kills the listener for pending games (defined later with the listener itself) */
        this.stopPendingGamesListener = null;
        /** @type {User|null} object of the currently logged in user */
        this.user = {uid: "player"};
        /** @type {null} */
        this.docActiveGame = null;
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
     * @returns {Promise<User>} The firebase user object of the authenticated user
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
        try {
            if (this.user) {
                this.docActiveGame = await addDoc(this.collectionGames, {
                    owner: this.user.uid,
                    opponent: null,
                    pending: true,
                    map: JSON.stringify(CONFIGS.mapList[Math.floor(Math.random() * CONFIGS.mapList.length)])
                });
            }
            else {
                throw 'Cannot create game for unauthenticated user!';
            }
        }
        catch (e) {
            throw e;
        }
    }
}
/**
 * The instance of the singleton class. (CloudManager) Module level variable
 * and cannot be seen by other scripts.
 */
let instance = null;