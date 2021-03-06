import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { User } from '../../../class/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase
  ) { }

  create(email: string, password: string): Promise<void> {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((credential) => {
        const { user } = credential;
        // setting redirect
        const actionCodeSettings = {
          url: `http://localhost:4200/?newAccount=true&email=${user.email}`
        }
        // confirm mail send
        user.sendEmailVerification(actionCodeSettings);
        // set to realtimedb
        this.db.object(`/users/${user.uid}`).set(new User(user));
      });
  }

  update(values: { displayName?: string, photoURL?: string}): Promise<void> {
    return this.afAuth.currentUser.then((user: firebase.User | null) => {
      if(user) {
        user.updateProfile(values) // <- auth update
          .then(() => this.db.object(`/users/${user.uid}`).update(values)) // <- update realtime db
          .catch(error => console.log(error))
      }
    })
  }
}
