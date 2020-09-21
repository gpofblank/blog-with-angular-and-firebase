import {Component, OnDestroy, OnInit} from '@angular/core';
import {animate, group, state, style, transition, trigger} from '@angular/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFirestore} from '@angular/fire/firestore';
import {UserService} from '../../../main/users/services/user.service';
import {Router} from '@angular/router';
import {NotificationsService} from 'angular2-notifications';
import {User} from '../../../main/users/models/user';
import {defaultAlertSettings} from '../../../shared/alert.settings';
import {Post} from '../../../main/posts/models/post';
import {BehaviorSubject, Subject, Subscription} from 'rxjs';
import {PostService} from '../../../main/posts/services/post.service';
import {debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';
import {liveSearch} from '../../../shared/live-search.operator';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  animations: [
    trigger('DivInOut', [
      state('in', style({height: '*', opacity: 0})),
      transition(':leave', [
        style({height: '*', opacity: 1}),

        group([
          animate(200, style({height: 0})),
          animate('200ms ease-in-out', style({'opacity': '0'}))
        ])

      ]),
      transition(':enter', [
        style({height: '0', opacity: 0}),

        group([
          animate(200, style({height: '*'})),
          animate('200ms ease-in-out', style({'opacity': '1'}))
        ])

      ])
    ])
  ]
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  private userNameSubject = new BehaviorSubject<string>('');
  readonly users$ = this.userNameSubject.pipe(
    // tap(userId => console.log('About to make an API call', userId)),
    liveSearch(userName => this.userService.getUserByDisplayNameValueChanges(userName)
    )
  );

  private postNameSubject = new BehaviorSubject<string>('');
  readonly posts$ = this.postNameSubject.pipe(
    // tap(postId => console.log('About to make an API call', postId)),
    liveSearch(postName => this.postService.getPostByDisplayNameValueChanges(postName))
  );

  constructor(private fb: FormBuilder,
              private afs: AngularFirestore,
              private userService: UserService,
              private router: Router,
              private notificationsService: NotificationsService,
              private postService: PostService) {
  }

  ngOnInit(): void {
  }

  searchUsers(userName: string) {
    this.userNameSubject.next(userName);
  }

  searchPosts(postName: string) {
    this.postNameSubject.next(postName);
  }

  ngOnDestroy() {
  }

  deletePost(post: Post) {
    this.postService.deletePost(post.id);
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user.uid);
  }
}
