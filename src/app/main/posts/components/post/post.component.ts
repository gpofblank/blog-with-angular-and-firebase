import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../../models/post';
import {UserService} from '../../../users/services/user.service';
import {Validators} from '@angular/forms';
import {NotificationsService} from 'angular2-notifications';
import {User} from '../../../users/models/user';
import {AuthService} from '../../../../shared/auth/services/auth.service';
import {PostService} from '../../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() post: Post;
  author: string;
  loggedUserRole = '';

  constructor(private userService: UserService,
              private notificationsService: NotificationsService,
              private authService: AuthService,
              private postService: PostService) {
    this.loggedUserRole = this.authService.loggedUser.role;
  }

  ngOnInit(): void {
    this.userService.getUserById(this.post.createdBy).then((doc) => {
      if (doc.exists) {
        const user = doc.data() as User;
        this.author = user.displayName;
      } else {
        // nothing as of now...

        // this.notificationsService
        //   .error('No such user', '', {
        //     timeOut: 3000,
        //     showProgressBar: true,
        //     pauseOnHover: true,
        //     clickToClose: true,
        //     preventLastDuplicates: true
        //   });
      }
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
  }

  deletePost() {
    this.postService.deletePost(this.post.id);
  }
}
