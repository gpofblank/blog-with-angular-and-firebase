import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../../shared/auth/services/auth.service';
import {PostService} from '../../services/post.service';
import {Post} from '../../models/post';
import {AngularFirestore} from '@angular/fire/firestore';
import {NotificationsService} from 'angular2-notifications';
import {defaultAlertSettings} from '../../../../shared/alert.settings';

@Component({
  selector: 'app-edit-post-page',
  templateUrl: './edit-post-page.component.html',
  styleUrls: ['./edit-post-page.component.scss']
})
export class EditPostPageComponent implements OnInit {

  editPostForm: FormGroup;
  submitted = false;
  post: Post = {} as Post;
  loading = true;

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private postService: PostService,
              private route: ActivatedRoute,
              private afs: AngularFirestore,
              private notificationsService: NotificationsService) {
    const id = this.route.snapshot.params.id;

    this.postService.getPostById(id).then((doc) => {
      if (doc.exists) {
        this.post = doc.data() as Post;
        this.editPostForm = this.fb.group({
          title: [this.post.title, [Validators.required]],
          content: [this.post.content, [Validators.required]]
        });
        this.loading = false;
      } else {
        this.notificationsService
          .error('No such post', '', defaultAlertSettings);
      }
    }).catch((error) => {
      this.notificationsService
        .error('Error upon getting a post', '', defaultAlertSettings);
    });

  }

  get title() {
    return this.editPostForm.get('title');
  }

  get content() {
    return this.editPostForm.get('content');
  }

  ngOnInit() {
  }

  submitForm() {
    this.submitted = true;

    if (this.editPostForm.valid) {
      const id = this.post.id;
      const changes = {
        title: this.title.value,
        content: this.content.value,
        updatedAt: new Date().toISOString(),
      };

      this.postService.updatePost(id, changes);
      this.router.navigateByUrl('main');
    }
  }

}
