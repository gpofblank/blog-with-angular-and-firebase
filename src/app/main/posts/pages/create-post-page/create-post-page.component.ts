import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../../core/auth/services/auth.service';
import {PostService} from '../../services/post.service';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-create-post-page',
  templateUrl: './create-post-page.component.html',
  styleUrls: ['./create-post-page.component.scss']
})
export class CreatePostPageComponent implements OnInit {

  createPostForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private postService: PostService,
              private afs: AngularFirestore) {
    this.createPostForm = this.fb.group({
      title: [null, [Validators.required]],
      content: [null, [Validators.required]],
    });
  }

  get title() {
    return this.createPostForm.get('title');
  }

  get content() {
    return this.createPostForm.get('content');
  }

  ngOnInit() {
  }

  submitForm() {
    this.submitted = true;

    if (this.createPostForm.valid) {
      const loggedUser = this.authService.loggedUser;
      const id = this.afs.createId();
      const post = {
        id,
        title: this.title.value,
        content: this.content.value,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: loggedUser.uid,
      };

      this.postService.createPost(id, post);
      this.router.navigateByUrl('');
    }
  }

}
