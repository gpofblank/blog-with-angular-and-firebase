import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {defaultAlertSettings} from '../../../shared/alert.settings';
import {NotificationsService} from 'angular2-notifications';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  constructor(private afs: AngularFirestore,
              private notificationsService: NotificationsService) {
  }

  // Create/Update
  /**
   * @ngdoc function
   * @description Follow a user.
   * Error handling to be taken care of in the respective component
   * @private
   * @return void
   */
  follow(followerId: string, followedId: string): void {
    this.afs.doc('followers/' + followedId).update({[followerId]: true}).then(() => {
      this.afs.doc('followers/' + followedId).update({[followerId]: true}).then(() => {
        this.notificationsService
          .success('Success!', '', defaultAlertSettings);
      }).catch((error) => {
        this.notificationsService
          .error('Error upon following the specified user', error.message, defaultAlertSettings);
      });
    }).catch((error) => {
      this.notificationsService
        .error('Error upon following the specified user', error.message, defaultAlertSettings);
    });
  }

  // Read
  /**
   * @ngdoc function
   * @description Gets all followers from Firestore.
   * Error handling to be taken care of in the respective component
   * @private
   * @return observable
   */
  getFollowers(userId: string): Observable<any> {
    return this.afs.collection('followers').doc(userId).snapshotChanges();
  }

  /**
   * @ngdoc function
   * @description See if user Foo is following user Bar.
   * Error handling to be taken care of in the respective component
   * @private
   * @return observable
   */
  getFollowing(followerId: string, followedId: string): Observable<any> {
    return this.afs.collection('following', ref => ref.where(followerId, '==', followedId)).snapshotChanges();
  }

  // Delete
  /**
   * @ngdoc function
   * @description unfollow a user
   * Error handling to be taken care of in the respective component
   * @private
   * @return void
   */
  unfollow(followerId: string, followedId: string): void {
    this.afs.doc(`followers/${followedId}/${followerId}`).delete().then(() => {
      this.afs.doc(`following/${followerId}/${followedId}`).delete().then(() => {
        this.notificationsService
          .success('Success!', '', defaultAlertSettings);
      }).catch((error) => {
        this.notificationsService
          .error('Error upon unfollowing a user', error.message, defaultAlertSettings);
      });
      this.notificationsService
        .success('Success!', '', defaultAlertSettings);
    }).catch((error) => {
      this.notificationsService
        .error('Error upon unfollowing a user', error.message, defaultAlertSettings);
    });
  }

}
