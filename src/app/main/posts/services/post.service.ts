import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {NotificationsService} from 'angular2-notifications';
import {Post} from '../models/post';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private notificationsService: NotificationsService) {
  }

  /**
   * @ngdoc function
   * @description Creates a post doc on Firestore.
   * @private
   * @param id and post
   * @return void
   */
  // Create
  createPost(id, post): void {
    this.afs.collection('posts')
      .doc(id)
      .set({
        ...post
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
        .error('Error upon creating a post', error.message, {
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
   * @description Gets all posts from Firestore.
   * Error handling to be taken care of in the respective component
   * @private
   * @return observable
   */
  getPosts(): Observable<any> {
    return this.afs.collection('posts').snapshotChanges();
  }

  /**
   * @ngdoc function
   * @description Gets a specific post (by id) from Firestore.
   * Error handling to be taken care of in the respective component
   * @private
   * @return promise
   */
  getPostById(id) {
    return this.afs.collection('posts').ref.doc(id).get();
  }

  // Update
  /**
   * @ngdoc function
   * @description Updates a post (by id) on Firestore.
   * @param post
   * @private
   * @return void
   */
  updatePost(post: Post): void {
    // delete post.id;
    this.afs.doc('posts/' + post.id).update(post);
  }

  // Delete
  /**
   * @ngdoc function
   * @description Deletes a post (by id) on Firestore.
   * @param postId
   * @private
   * @return void
   */
  deletePost(postId: string) {
    this.afs.doc('posts/' + postId).delete();
  }

}
