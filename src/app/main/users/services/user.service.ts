import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {NotificationsService} from 'angular2-notifications';
import {User} from '../models/user';
import {Observable} from 'rxjs';
import {defaultAlertSettings} from '../../../shared/alert.settings';

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
        .success('Woohoo!', 'Successfully created a user!', defaultAlertSettings);
    }).catch((error) => {
      this.notificationsService
        .error('Error upon creating a user', error.message, defaultAlertSettings);
    });
  }

  // Read
  /**
   * @ngdoc function
   * @description Gets all users from Firestore.
   * Error handling to be taken care of in the respective component
   * @private
   * @return observable
   */
  getUsers(): Observable<any> {
    return this.afs.collection('users').snapshotChanges();
  }

  /**
   * @ngdoc function
   * @description Gets all users from Firestore.
   * Error handling to be taken care of in the respective component
   * @private
   * @return observable
   */
  getUsersValueChanges(): Observable<any> {
    return this.afs.collection('users').valueChanges();
  }

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
   * @description Gets a specific user (by displayName) from Firestore.
   * Error handling to be taken care of in the respective component
   * @private
   * @return observable
   */
  getUserByDisplayNameValueChanges(userName) {
    return this.afs.collection('users', ref => ref
      .orderBy('displayName')
      .startAt(`%${userName}%`)
      .endAt(userName + '\uf8ff'))
      .valueChanges();
  }

  /**
   * @ngdoc function
   * @description Gets all users from Firestore.
   * Error handling to be taken care of in the respective component
   * @private
   * @return promise
   */
  getAllUsersOnce() {
    return this.afs.collection('users', ref => ref
      .orderBy('createdAt', 'desc')).ref.get();
  }

  // Update
  /**
   * @ngdoc function
   * @description Updates a user (by id) on Firestore.
   * @param id
   * @param changes
   * @private
   * @return void
   */
  updateUser(id, changes: Partial<User>): void {
    this.afs.doc('users/' + id).update(changes).then(() => {
      this.notificationsService
        .success('Woohoo!', 'User successfully updated!', defaultAlertSettings);
    }).catch((error) => {
      this.notificationsService
        .error('Error upon updating a user', error.message, defaultAlertSettings);
    });
  }

  // Delete
  /**
   * @ngdoc function
   * @description Deletes a user (by id) on Firestore.
   * @param userId
   * @private
   * @return void
   */
  deleteUser(userId: string) {
    this.afs.doc('users/' + userId).delete().then(() => {
      this.notificationsService
        .success('Woohoo!', 'User successfully deleted!', defaultAlertSettings);
    }).catch((error) => {
      this.notificationsService
        .error('Error upon deleting a user', error.message, defaultAlertSettings);
    });

  }
}
