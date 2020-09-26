import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {User} from '../../models/user';
import {PostService} from '../../../posts/services/post.service';
import {Subscription} from 'rxjs';
import {FollowService} from '../../services/follow.service';

@Component({
  selector: 'app-user-slim',
  templateUrl: './user-slim.component.html',
  styleUrls: ['./user-slim.component.scss']
})
export class UserSlimComponent implements OnInit, OnDestroy {

  @Input() user: User;
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();

  usersPostsCountSub: Subscription;
  usersPostsCount = 0;

  constructor(private postService: PostService,
              private followService: FollowService) {
  }

  ngOnInit(): void {
    this.usersPostsCountSub = this.postService.getPostsForUser(this.user.uid)
      .subscribe(posts => this.usersPostsCount = posts.length);
  }

  onRemoveUser(user) {
    this.delete.emit(user);
  }

  ngOnDestroy() {
    if (this.usersPostsCountSub) {
      this.usersPostsCountSub.unsubscribe();
    }
  }
}
