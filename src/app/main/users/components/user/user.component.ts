import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {FollowService} from '../../services/follow.service';
import {AuthService} from '../../../../core/auth/services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

  @Input() user: User;
  @Input() currentUser: User;
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();
  loggedUser = {} as User;

  followerCount: number;
  isFollowing: boolean;
  followers;
  following;

  constructor(private userService: UserService,
              private followService: FollowService) {
    this.loggedUser = JSON.parse(localStorage.getItem('user'));
  }

  private static countFollowers(followers) {
    if (followers.$value === null) {
      return 0;
    } else {
      return followers.length;
    }
  }

  ngOnInit(): void {
    const userId = this.user.uid;
    const currentUserId = this.currentUser.uid;

    // checks if the currently logged in user is following this.user
    this.following = this.followService.getFollowing(currentUserId, userId)
      .subscribe(following => {

        this.isFollowing = !!following;

      });

    // retrieves the follower count for a user's profile
    this.followers = this.followService.getFollowers(userId)
      .subscribe(followers => {

        this.followerCount = UserComponent.countFollowers(followers);

      });
  }

  onRemoveUser(user) {
    this.delete.emit(user);
  }

  ngOnDestroy() {
    if (this.followers) {
      this.followers.unsubscribe();
    }
    if (this.following) {
      this.following.unsubscribe();
    }
  }

  toggleFollow() {
    const userId = this.user.uid;
    const currentUserId = this.currentUser.uid;

    if (this.isFollowing) {
      this.followService.unfollow(currentUserId, userId);
    } else {
      this.followService.follow(currentUserId, userId);
    }
  }
}

