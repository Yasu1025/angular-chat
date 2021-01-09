import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';

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

  // comments = COMMENTS;
  comments$: Observable<Comment[]>;
  commentsRef: AngularFireList<Comment>;
  currentUser = CURRENT_USER;
  comment = '';
  item$: Observable<any>;

  constructor(private db: AngularFireDatabase) {
    this.item$ = db.object('/item').valueChanges();
    this.commentsRef = db.list('/comments');
    this.comments$ = this.commentsRef.valueChanges();
  }

  addComment(comment: string): void {
    if(comment) {
      const newComment = new Comment(this.currentUser, comment);
      this.commentsRef.push(newComment);
      this.comment = '';
    }
  }
}
