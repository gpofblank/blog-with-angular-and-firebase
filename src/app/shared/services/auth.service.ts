import {Injectable, NgZone} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from '../../main/users/models/user';
import * as firebase from 'firebase';
import {NotificationsService} from 'angular2-notifications';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public loggedUserFromDbAuth$: Observable<firebase.User>;
  public loggedUserFromDbUsers$: BehaviorSubject<User> = new BehaviorSubject<User>({} as User);
  loggedUser: User = {} as User;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    private notificationsService: NotificationsService
  ) {

    this.loggedUserFromDbAuth$ = new Observable<firebase.User>((subscriber) => {
      this.afAuth.onAuthStateChanged(subscriber);
    });

    // this.loggedUserFromDbUsers$.next({} as User);
    //
    const loggedUserFromDbUsersSub = this.loggedUserFromDbAuth$.subscribe(
      (user => {
        if (user) {
          this.afs.collection('users')
            .doc(user.uid)
            .ref.get()
            .then((u) => {
              console.log('dataaa ', u.data() as User);
              this.loggedUser = u.data() as User;
              this.loggedUserFromDbUsers$.next(this.loggedUser);
            });
        } else {
          this.loggedUser = null;
          this.loggedUserFromDbUsers$.next(null);
        }
      })
    );
    loggedUserFromDbUsersSub.unsubscribe();

    // this.afAuth.authState.subscribe(user => {

    // if (user) {
    //   // afs.collection('users').doc(user.uid).ref.get().then(
    //   //   (loggedUser) => this.loggedUser = loggedUser);
    //   // console.log(this.loggedUser);
    //   //
    //   // this.loggedUserFromDbAuth$.next(user);
    //   console.log('afAuth user -> ', user)
    //
    //   localStorage.setItem('user', JSON.stringify(this.loggedUser));
    //   JSON.parse(localStorage.getItem('user'));
    // } else {
    //   this.loggedUser = null;
    //   localStorage.setItem('user', null);
    //   JSON.parse(localStorage.getItem('user'));
    //   // this.loggedUser = {} as User;
    //   // this.loggedUserFromDbAuth$.next({} as User);
    // }
    // });
  }

// tslint:disable-next-line:variable-name
  _isLoggedIn: boolean;

  // Returns true when user is logged in and email is verified
  get isLoggedIn(): boolean {
    // // const user = JSON.parse(localStorage.getItem('user'));
    // // return (user !== null && user.emailVerified !== false);
    // let isLoggedIn = false;
    // // this.loggedUserFromDbAuth$.pipe(
    // //   map(user => {
    // //     return isLoggedIn = (user !== null && user.emailVerified !== false);
    // //   }));
    //
    // const isLoggedInSub = this.afAuth.authState.subscribe((user) => {
    //   isLoggedIn = !!user;
    // });
    // isLoggedInSub.unsubscribe();

    const tempIsLoggedInSub = this.afAuth.authState.subscribe(res => {
      this._isLoggedIn = !!(res.uid);
    });

    tempIsLoggedInSub.unsubscribe();

    console.log('from guard ->', this._isLoggedIn);
    return this._isLoggedIn;
  }

  get Role() {
    // const user = JSON.parse(localStorage.getItem('user'));
    // return user.role;
    return this.loggedUser.role;
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
        this.SetLoggedUser(result.user, displayName, role);
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

  // add user (doc) in users collection upon registering a new user.
  SetLoggedUser(user, displayName, role) {
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

  SignOut() {
    return this.afAuth.signOut().then(() => {
      // localStorage.removeItem('user');
      this.loggedUser = null;
      this.loggedUserFromDbUsers$.next(this.loggedUser);
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

}
