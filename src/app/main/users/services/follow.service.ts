import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {defaultAlertSettings} from '../../../shared/alert.settings';
import {NotificationsService} from 'angular2-notifications';
import {map} from 'rxjs/operators';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  userToFollow;
  userToUnfollow;

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
  follow(followerId: string, followedId: string, followedUserName: string): void {

    // update followers
    this.afs.doc(`followers/${followedId}`).set({[followerId]: true}, {merge: true}).then(() => {
      // update following
      this.afs.doc(`following/${followerId}`).set({[followedId]: true}, {merge: true}).then(() => {
        this.followedUserNotif(followedUserName);
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
    return this.afs.collection('followers').doc(userId).valueChanges();
  }

  /**
   * @ngdoc function
   * @description Get all following from Firestore.
   * Error handling to be taken care of in the respective component
   * @private
   * @return observable
   */
  getFollowing(followerId: string) {
    return this.afs.doc(`following/${followerId}`).valueChanges();
  }

  /**
   * @ngdoc function
   * @description See if user Foo is following user Bar.
   * Error handling to be taken care of in the respective component
   * @private
   * @return observable
   */
  getFollowingForSpecificUser(followerId: string, followedId: string) {
    return this.afs.doc(`following/${followerId}`).valueChanges().pipe(
      map(data => {
        if (data) {
          return data[followedId];
        }
      })
    );
  }

  // Delete
  /**
   * @ngdoc function
   * @description unfollow a user
   * Error handling to be taken care of in the respective component
   * @private
   * @return void
   */
  unfollow(followerId: string, followedId: string, followedUserName: string): void {

    const followersRef = this.afs.doc(`followers/${followedId}`);
    const followingRef = this.afs.doc(`following/${followerId}`);

    // delete from followers
    followersRef.update({
      [followerId]: firebase.firestore.FieldValue.delete()
    })
      .then(() => {
        // delete from following
        followingRef.update({
          [followedId]: firebase.firestore.FieldValue.delete()
        })
          .then(() => {
            this.unfollowedUserNotif(followedUserName);
          }).catch((error) => {
          this.notificationsService
            .error('Error upon unfollowing a user', error.message, defaultAlertSettings);
        });
      }).catch((error) => {
      this.notificationsService
        .error('Error upon unfollowing a user', error.message, defaultAlertSettings);
    });
  }

  followedUserNotif(userName) {
    this.notificationsService
      .success(`Successfully followed ${userName}!`, '', defaultAlertSettings);
  }

  unfollowedUserNotif(userName) {
    this.notificationsService
      .success(`Successfully unfollowed ${userName}`, '', defaultAlertSettings);
  }

  // This is how it works in the RealTime Database world... (just for future ref)
  //   this.afs.doc(`followers/${followedId}/${followerId}`).delete().then(() => {
  //     this.afs.doc(`following/${followerId}/${followedId}`).delete().then(() => {
  //       this.notificationsService
  //         .success('Success!', '', defaultAlertSettings);
  //     }).catch((error) => {
  //       this.notificationsService
  //         .error('Error upon unfollowing a user', error.message, defaultAlertSettings);
  //     });
  //     this.notificationsService
  //       .success('Success!', '', defaultAlertSettings);
  //   }).catch((error) => {
  //     this.notificationsService
  //       .error('Error upon unfollowing a user', error.message, defaultAlertSettings);
  //   });
  // }

}
