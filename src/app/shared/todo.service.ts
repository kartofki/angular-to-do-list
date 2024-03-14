import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore'
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  firestoreCollection: AngularFirestoreCollection;

  constructor(private firestore: AngularFirestore) { 
    this.firestoreCollection = firestore.collection('todoapp')
  }

  addTodo(todo: { title: string; isDone: boolean; urgency: string }) {
   
    this.firestoreCollection.add(todo);
}

  updateTodoStatus(id:string, newStatus:boolean){
    this.firestoreCollection.doc(id).update({isDone:newStatus})
  }

  deleteToDo(id:string){
    this.firestoreCollection.doc(id).delete();
  }
}
