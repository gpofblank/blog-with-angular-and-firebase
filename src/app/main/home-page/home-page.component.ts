import {Component, OnDestroy, OnInit} from '@angular/core';
import {Post} from '../posts/models/post';
import {PostService} from '../posts/services/post.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {
  allPosts: Post[];
  loading = true;
  getPostsSub: Subscription;

  constructor(private postService: PostService) {
    this.getPostsSub = this.postService.getPosts().subscribe((data) => {
      this.allPosts = data.map(p => {
        this.loading = false;
        return {...p.payload.doc.data()} as Post;
      });
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if (this.getPostsSub) {
      this.getPostsSub.unsubscribe();
    }
  }

}
