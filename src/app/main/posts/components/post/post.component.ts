import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Post} from '../../models/post';
import {UserService} from '../../../users/services/user.service';
import {NotificationsService} from 'angular2-notifications';
import {User} from '../../../users/models/user';
import {AuthService} from '../../../../core/auth/services/auth.service';
import {PostService} from '../../services/post.service';
import {defaultAlertSettings} from '../../../../shared/alert.settings';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() post: Post;
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();
  author: string;
  loggedUser = {} as User;

  constructor(private userService: UserService,
              private notificationsService: NotificationsService,
              private authService: AuthService,
              private postService: PostService) {
    this.loggedUser = this.authService.loggedUser;
  }

  ngOnInit(): void {
    this.userService.getUserById(this.post.createdBy)
      .then((doc) => {
        if (doc.exists) {
          const user = doc.data() as User;
          this.author = user.displayName;
        }
      }).catch((error) => {
      this.notificationsService
        .error('Error upon getting a user', error.message, defaultAlertSettings);
    });
  }

  onDeletePost(post) {
    this.delete.emit(post);
  }
}
