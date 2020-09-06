import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {NotificationsService} from 'angular2-notifications';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private notificationsService: NotificationsService) {
  }

  // add post (doc) in posts collection
  addPost(id, post) {
    this.afs.collection('posts')
      .doc(id)
      .set({
        post
      }).then(() => {
      this.notificationsService
        .success('Woohoo!', 'Successfully created a post!', {
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
}
