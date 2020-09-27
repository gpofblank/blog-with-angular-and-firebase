import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {FollowService} from '../../services/follow.service';
import {AuthService} from '../../../../core/auth/services/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

  @Input() user: User;
  @Input() currentUser: User;
  @Input() withFollowBadge: boolean;
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();
  loggedUser = {} as User;

  followerCount = 0;
  followingCount = 0;
  isFollowing: boolean;

  followersSub: Subscription;
  followingSub: Subscription;
  usersThatThisUserFollowsSub: Subscription;

  constructor(private userService: UserService,
              private followService: FollowService) {
    this.loggedUser = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit(): void {
    const userId = this.user.uid;
    const currentUserId = this.currentUser.uid;

    // checks if the currently logged in user is following this.user
    this.followingSub = this.followService.getFollowingForSpecificUser(currentUserId, userId)
      .subscribe(following => {
        this.isFollowing = !!following;
      });

    // retrieves the follower count for a user's profile
    this.followersSub = this.followService.getFollowers(userId)
      .subscribe(followers => {
        if (followers) {
          this.followerCount = Object.keys(followers).length;
        }
      });

    // retrieves the following count for a user's profile
    this.usersThatThisUserFollowsSub = this.followService.getFollowing(userId)
      .subscribe(usersThatThisUserFollows => {
        if (usersThatThisUserFollows) {
          this.followingCount = Object.keys(usersThatThisUserFollows).length;
        }
      });
  }

  onRemoveUser(user) {
    this.delete.emit(user);
  }

  ngOnDestroy() {
    if (this.followersSub) {
      this.followersSub.unsubscribe();
    }
    if (this.followingSub) {
      this.followingSub.unsubscribe();
    }
    if (this.usersThatThisUserFollowsSub) {
      this.usersThatThisUserFollowsSub.unsubscribe();
    }
  }

  toggleFollow() {
    const userId = this.user.uid;
    const userName = this.user.displayName;
    const currentUserId = this.currentUser.uid;

    if (this.isFollowing) {
      this.followService.unfollow(currentUserId, userId, userName);
    } else {
      this.followService.follow(currentUserId, userId, userName);
    }
  }

  // countFollowers(followers) {
  //   if (!followers.payload.data.length) {
  //     return 0;
  //   } else {
  //     return followers.payload.data.length;
  //   }
  // }
}

