import { Injectable } from '@angular/core';

// We MUST import both the firebase AND firestore like so
import * as firebase from 'firebase';
import 'firebase/firestore';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  private _db: any;

  constructor() {
    console.log('Hello DatabaseProvider Provider');
    // Initialise access to the firestore service
    this._db = firebase.firestore();
  }

  addDocument(
    collectionObj: string,
    dataObj: any
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      this._db.collection(collectionObj).add(dataObj)
        .then((obj: any) => {
          resolve(obj);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  /** geo
   * Creates a geopoint
   */
  geo(lat: number, lon: number) {
    return new firebase.firestore.GeoPoint(lat, lon);
  }

}
