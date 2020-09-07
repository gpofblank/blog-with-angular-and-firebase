import { Component, OnInit } from '@angular/core';
import {Post} from '../../models/post';
import {PostService} from '../../services/post.service';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../users/services/user.service';
import {NotificationsService} from 'angular2-notifications';
import {Observable} from 'rxjs';
import {User} from '../../../users/models/user';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts-page.component.html',
  styleUrls: ['./list-posts-page.component.scss']
})
export class ListPostsPageComponent implements OnInit {

  posts: Post[];
  author: string;

  constructor(private postService: PostService,
              private route: ActivatedRoute,
              private userService: UserService,
              private notificationsService: NotificationsService) {
  }

  ngOnInit() {

    const id = this.route.snapshot.params.id;

    this.postService.getPostsForUser(id).subscribe(posts => {
      this.posts = posts;
    });

    this.userService.getUserById(id).then((u) => {
      const user = u.data() as User;
      this.author = user.displayName;
    }).catch((error) => {
      this.notificationsService
        .error('Error upon getting a user', error.message, {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true,
          preventLastDuplicates: true
        });
    });

    // this.posts = this.posts.filter(p => p.id === id);


  }

}
