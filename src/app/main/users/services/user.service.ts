import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {BehaviorSubject} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {NotificationsService} from 'angular2-notifications';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private notificationsService: NotificationsService) {
  }

  /* in case info for the currently logged user is needed, feel free
  ** to subscribe to -> authService.loggedUserFromDbUsers$ or use local storage
  */

  // Create
  createUser(id, user): void {
    this.afs.collection('users')
      .doc(id)
      .set({
        ...user
      }).then(() => {
      this.notificationsService
        .success('Woohoo!', 'Successfully created a user!', {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true,
          preventLastDuplicates: true
        });
    }).catch((error) => {
      this.notificationsService
        .error('Error upon creating a user', error.message, {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true,
          preventLastDuplicates: true
        });
    });
  }

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

  /**
   * @ngdoc function
   * @description Gets all users from Firestore.
   * Error handling to be taken care of in the respective component
   * @private
   * @return promise
   */
  getAllUsersOnce() {
    return this.afs.collection('users').ref.get();
  }

  // Update

  // Delete
}
