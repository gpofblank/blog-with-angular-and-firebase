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

  // in case info for the current user is needed, feel free to subscribe to -> authService.loggedUserFromDbUsers$

  // add user (doc) in users collection
  addUser(user, displayName, role) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const loggedUser: Partial<User> = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName,
      role
    };
    return userRef.set(loggedUser, {
      merge: true
    });
  }
}
