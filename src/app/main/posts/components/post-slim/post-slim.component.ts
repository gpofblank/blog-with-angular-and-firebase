import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Post} from '../../models/post';

@Component({
  selector: 'app-post-slim',
  templateUrl: './post-slim.component.html',
  styleUrls: ['./post-slim.component.scss']
})
export class PostSlimComponent implements OnInit {

  @Input() post: Post;
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onRemovePost(post) {
    this.delete.emit(post);
  }
}
