import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../models/user';

@Component({
  selector: 'app-user-slim',
  templateUrl: './user-slim.component.html',
  styleUrls: ['./user-slim.component.scss']
})
export class UserSlimComponent implements OnInit {

  @Input() user: User;
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onRemoveUser(user) {
    this.delete.emit(user);
  }
}
