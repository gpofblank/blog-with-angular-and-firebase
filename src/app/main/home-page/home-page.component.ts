import {Component, OnDestroy, OnInit} from '@angular/core';
import {Post} from '../posts/models/post';
import {PostService} from '../posts/services/post.service';
import {Subscription} from 'rxjs';
import {User} from '../users/models/user';
import {defaultAlertSettings} from '../../shared/alert.settings';
import {UserService} from '../users/services/user.service';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {
  allPosts: Post[];
  loading = true;
  getPostsSub: Subscription;

  constructor(private postService: PostService) {
    this.getPostsSub = this.postService.getPosts().subscribe((data) => {
      this.allPosts = data.map(p => {
        this.loading = false;
        return {...p.payload.doc.data()} as Post;
      });
      // setTimeout(() => {
      //   this.allPosts.forEach((p, i) => {
      //     this.userService.getUserById(p.createdBy)
      //       .then((doc) => {
      //         this.loading = false;
      //         if (doc.exists) {
      //           const user = doc.data() as User;
      //           this.allPosts[i] = {...p, createdBy: user.displayName};
      //         }
      //       }).catch((error) => {
      //       this.notificationsService
      //         .error('Error upon getting author', error.message, defaultAlertSettings);
      //     });
      //   });
      // }, 1000);
    });

  }

  ngOnInit(): void {
  }

  deletePost(post) {
    this.postService.deletePost(post.id);
  }

  ngOnDestroy() {
    if (this.getPostsSub) {
      this.getPostsSub.unsubscribe();
    }
  }

}
