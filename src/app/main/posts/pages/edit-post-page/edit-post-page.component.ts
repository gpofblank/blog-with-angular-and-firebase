import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../../shared/auth/services/auth.service';
import {PostService} from '../../services/post.service';
import {Post} from '../../models/post';
import {AngularFirestore} from '@angular/fire/firestore';
import {NotificationsService} from 'angular2-notifications';

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
          .error('No such post', '', {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true,
            preventLastDuplicates: true
          });
      }
    }).catch((error) => {
      this.notificationsService
        .error('Error upon getting a post', '', {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true,
          preventLastDuplicates: true
        });
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
      const loggedUser = this.authService.loggedUser;
      const id = this.post.id;
      const post = {
        id,
        title: this.title.value,
        content: this.content.value,
        createdAt: new Date(),
        createdBy: loggedUser.uid,
      };

      this.postService.updatePost(post);
      this.router.navigateByUrl('');
    }
  }

}
