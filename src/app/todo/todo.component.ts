import { Component, OnInit } from '@angular/core';
import { TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styles: [
  ]
})
export class TodoComponent implements OnInit{

  todos: any[] = [];
  constructor(private todoService: TodoService){

  }

  ngOnInit(): void {
    this.todoService.firestoreCollection.valueChanges({idField: 'id'}).subscribe(items => {
      this.todos = items.sort((a: any, b: any) => {
        // This sorts by completion
        if (a.isDone !== b.isDone) {
          return a.isDone ? 1 : -1; 
        }
  
        // This sorts by urgency
        return this.mapUrgencyToNumber(a.urgency) - this.mapUrgencyToNumber(b.urgency);
      });
    });
  }
  
  // Making urgency sortable
  private mapUrgencyToNumber(urgency: string): number {
    switch (urgency) {
      case '🔴': 
        return 1;
      case '🟡': 
        return 2;
      case '🟢': 
        return 3;
      default:
        return 4; // Unexpected values
    }
  }
  onClick(taskInput: HTMLInputElement, urgency: string): void {
    if(taskInput.value){
            this.todoService.addTodo({
            title: taskInput.value,
            isDone: false,
            urgency: urgency 
        });
        taskInput.value = "";
    }
}
//get isSadList(): boolean {
 // return this.todos.filter(item => item.urgency === '🔴' && !item.isDone).length >= 3;
//}

//Changing the To Do List name based on how many unfinished tasks there are

get listTitle(): string {
  const totalUnfinishedTasks = this.todos.filter(item => !item.isDone).length;
  const urgentUnfinishedTasks = this.todos.filter(item => !item.isDone && item.urgency === '🔴').length;

  if (urgentUnfinishedTasks >= 5) {
    return 'To Do List 🤬';
  } else if (urgentUnfinishedTasks >= 3) {
    return 'To Do List 😡';
  } else if (totalUnfinishedTasks >= 5) {
    return 'To Do List 😠';
  
  } else if (totalUnfinishedTasks >= 4) {
    return 'To Do List 🤨';
  } 
  else if (totalUnfinishedTasks >=3){
  return 'To Do List 🙂'
  }
  else if (totalUnfinishedTasks>1){
    return 'To Do List 😊'
  }
  else {
    return 'To Do List 🥰';
  }
}
  onStatusChange(id:string, newStatus:boolean){
    this.todoService.updateTodoStatus(id, newStatus)
  }

  onDelete(id:string){
    this.todoService.deleteToDo(id)
  }
}
