import {Injectable, NgZone} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {Role, User} from '../../main/users/models/user';
import * as firebase from 'firebase';
import {NotificationsService} from 'angular2-notifications';
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedUser: any;

  user$: Observable<User>;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    private notificationsService: NotificationsService
  ) {
    // Saving user data in localstorage when logged in and setting up null when logged out
    // this.afAuth.authState.subscribe(user => {
    //   if (user) {
    //     this.loggedUser = user;
    //     localStorage.setItem('user', JSON.stringify(this.loggedUser));
    //     JSON.parse(localStorage.getItem('user'));
    //   } else {
    //     localStorage.setItem('user', null);
    //     JSON.parse(localStorage.getItem('user'));
    //   }
    // }

    this.user$ = this.afAuth.user;

  }

  // Returns true when user is logged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false);
  }

  get getRole(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user.role;
  }

  // Sign in with email/password
  SignIn(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigateByUrl('');
        });
        // this.SetLoggedUser(result.user);
      }).catch((error) => {
        this.notificationsService
          .error('Error', error.message, {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true,
            preventLastDuplicates: true
          });
      });
  }

  SignUp(email, password, displayName, role) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        this.SendVerificationMail();
        this.SetLoggedUser(result.user);

        // set custom properties for the newly created user
        this.afs.collection('users').doc(result.user.uid).set({
          displayName,
          role
        }, {merge: true});

      }).catch((error) => {
        this.notificationsService
          .error('Error', error.message, {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true,
            preventLastDuplicates: true
          });
      });
  }

  SendVerificationMail() {
    return this.afAuth.currentUser.then(u => u.sendEmailVerification())
      .then(() => {
        this.router.navigateByUrl('auth/verify-email');
      });
  }

  ForgotPassword(passwordResetEmail) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        this.notificationsService
          .success('Password reset email sent, check your inbox.', '', {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true,
            preventLastDuplicates: true
          });
      }).catch((error) => {
        this.notificationsService
          .error('Error', error.message, {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true,
            preventLastDuplicates: true
          });
      });
  }

  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider()).then(() => {
      this.router.navigateByUrl('');
    });
  }

  AuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigateByUrl('');
        });
        // this.SetLoggedUser(result.user);
      }).catch((error) => {
        this.notificationsService
          .error('Error', error.message, {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true,
            preventLastDuplicates: true
          });
      });
  }

  // upsert user (doc) in users collection upon registering a new user.
  SetLoggedUser(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const loggedUser: Partial<User> = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      emailVerified: user.emailVerified,
      role: user.role
    };
    return userRef.set(loggedUser, {
      merge: true
    });
  }

  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigateByUrl('auth/login');
    });
  }

}
