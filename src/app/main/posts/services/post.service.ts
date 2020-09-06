import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
  }

  // add post (doc) in posts collection
  addPost(post) {
    this.afs.collection('posts')
      .doc(this.afs.createId())
      .set({
        post
      });
  }
}
