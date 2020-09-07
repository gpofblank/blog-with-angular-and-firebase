import {Component, OnInit} from '@angular/core';
import {Post} from '../posts/models/post';
import {PostService} from '../posts/services/post.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  allPosts: Post[];

  constructor(private postService: PostService) {
    this.postService.getPosts().subscribe((data) => {
      this.allPosts = data.map(p => {
        return {...p.payload.doc.data()} as Post;
      });
    });
  }

  ngOnInit(): void {
  }

}
