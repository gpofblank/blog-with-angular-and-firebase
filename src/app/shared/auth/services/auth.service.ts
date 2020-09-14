import {Injectable, NgZone} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from '../../../main/users/models/user';
import * as firebase from 'firebase';
import {NotificationsService} from 'angular2-notifications';
import {BehaviorSubject} from 'rxjs';
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
import {defaultAlertSettings} from '../../alert.settings';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public loggedUserFromDbUsers$: BehaviorSubject<User> = new BehaviorSubject<User>({} as User);
  private _loggedUser: User = {} as User;

  constructor(
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    private notificationsService: NotificationsService) {

    const loggedUserFromLocalStorage = JSON.parse(localStorage.getItem('user'));
    console.log('logged user ', loggedUserFromLocalStorage);

    if (loggedUserFromLocalStorage) {
      this.loggedUser = loggedUserFromLocalStorage;
      this.loggedUserFromDbUsers$.next(this.loggedUser);
    } else {
      this.afAuth.authState.subscribe(
        (user => {
          if (user) {
            this.afs.collection('users')
              .doc(user.uid)
              .ref.get()
              .then((u) => {
                console.log('dataaa ', u.data() as User);
                this.loggedUser = u.data() as User;
                this.loggedUserFromDbUsers$.next(this.loggedUser);
                localStorage.setItem('user', JSON.stringify(this.loggedUser));
                JSON.parse(localStorage.getItem('user'));
              });
          } else {
            this.loggedUser = {} as User;
            this.loggedUserFromDbUsers$.next({} as User);
            JSON.parse(localStorage.getItem('user'));
            localStorage.setItem('user', null);
          }
        })
      );
    }
  }

  get loggedUser() {
    return this._loggedUser;
  }

  set loggedUser(user) {
    this._loggedUser = user;
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null);
    // return (user !== null && user.emailVerified !== false);
  }

  /**
   * @ngdoc function
   * @description Logs in a user
   * @param email
   * @param password
   * @private
   * @return promise
   */
  SignIn(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigateByUrl('');
        });
        // this.SetLoggedUser(result.user);
      }).catch((error) => {
        this.notificationsService
          .error('Error', error.message, defaultAlertSettings);
      });
  }

  /**
   * @ngdoc function
   * @description Registers a user
   * @private
   * @param email
   * @param password
   * @param displayName
   * @param role
   * @return promise
   */
  SignUp(email, password, displayName, role) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        this.SendVerificationMail();
        this.addUser(result.user, displayName, role);
      }).catch((error) => {
        this.notificationsService
          .error('Error', error.message, defaultAlertSettings);
      });
  }

  /**
   * @ngdoc function
   * @description Sends a verification email.
   * @private
   * @return promise
   */
  SendVerificationMail() {
    return this.afAuth.currentUser.then(u => u.sendEmailVerification())
      .then(() => {
        this.router.navigateByUrl('auth/verify-email');
      });
  }

  /**
   * @ngdoc function
   * @description Sends a password reset email.
   * @private
   * @param passwordResetEmail
   * @return promise
   */
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        this.notificationsService
          .success('Password reset email sent, check your inbox.', '', defaultAlertSettings);
      }).catch((error) => {
        this.notificationsService
          .error('Error', error.message, defaultAlertSettings);
      });
  }

  /**
   * @ngdoc function
   * @description Google Authentication
   * @private
   * @return promise
   */
  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider()).then(() => {
      this.router.navigateByUrl('');
    });
  }

  /**
   * @ngdoc function
   * @description Authentication
   * @private
   * @return promise
   */
  AuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigateByUrl('');
        });
        // this.SetLoggedUser(result.user);
      }).catch((error) => {
        this.notificationsService
          .error('Error', error.message, defaultAlertSettings);
      });
  }

  /**
   * @ngdoc function
   * @description Signs a user out.
   * @private
   * @return promise
   */
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.loggedUserFromDbUsers$.next({} as User);
      this.router.navigateByUrl('auth/login');

      this.notificationsService
        .success('Have a good one!', 'Thanks for visiting Blog Guru', defaultAlertSettings);

    });
  }

  /**
   * @ngdoc function
   * @description Local use only!!!. Adds a user to Firestore.
   * @private
   * @return promise
   */
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
