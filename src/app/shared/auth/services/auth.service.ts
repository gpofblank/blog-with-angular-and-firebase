import {Injectable, NgZone} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from '../../../main/users/models/user';
import * as firebase from 'firebase';
import {NotificationsService} from 'angular2-notifications';
import {BehaviorSubject} from 'rxjs';
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;

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
    private notificationsService: NotificationsService,
  ) {
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


  get loggedUser() {
    return this._loggedUser;
  }

  set loggedUser(user) {
    this._loggedUser = user;
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false);
  }

  // login -> Sign in with email/password
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

  // register
  SignUp(email, password, displayName, role) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        this.SendVerificationMail();
        this.addUser(result.user, displayName, role);
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

  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.loggedUserFromDbUsers$.next({} as User);
      this.router.navigateByUrl('auth/login');

      this.notificationsService
        .success('Have a good one!', 'Thanks for visiting Blog Guru', {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true,
          preventLastDuplicates: true
        });

    });
  }

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