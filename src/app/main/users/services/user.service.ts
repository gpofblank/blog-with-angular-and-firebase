import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {BehaviorSubject} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
  }

  // in case info for the currently logged user is needed, feel free to subscribe to -> authService.loggedUserFromDbUsers$

  // Create
  // addUser(user, displayName, role) {
  //   const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
  //   const loggedUser: Partial<User> = {
  //     uid: user.uid,
  //     email: user.email,
  //     emailVerified: user.emailVerified,
  //     displayName,
  //     role
  //   };
  //   return userRef.set(loggedUser, {
  //     merge: true
  //   });
  // }

  // Read
  /**
   * @ngdoc function
   * @description Gets a specific user (by id) from Firestore.
   * Error handling to be taken care of in the respective component
   * @private
   * @return promise
   */
  getUserById(id) {
    return this.afs.collection('users').ref.doc(id).get();
  }

  // Update

  // Delete
}
