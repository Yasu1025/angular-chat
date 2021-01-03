import { Component } from '@angular/core';

import { Comment } from './class/comment';
import { User } from './class/user';

// temporary Mock data
const CURRENT_USER: User = new User(1, 'Tom');
const ANOTHER_USER: User = new User(2, 'Brad');

const COMMENTS: Comment[] = [
  new Comment(ANOTHER_USER, 'Hello!!'),
  new Comment(ANOTHER_USER, 'How are you?'),
  new Comment(CURRENT_USER, 'Im good!!'),
  new Comment(ANOTHER_USER, 'HiHIHI!!'),
  new Comment(CURRENT_USER, 'Hello Hello Hello Hello Hello!!')
]

@Component({
  selector: 'ac-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  comments = COMMENTS;
  currentUser = CURRENT_USER;
}
