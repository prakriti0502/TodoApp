import { Component, OnInit, } from '@angular/core';
import {Todo} from '../../models/Todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos!: Todo[];
  dateInput!: Date;

  inputTodo:string = '';
  constructor() { }

  ngOnInit(): void {
    //getting todo list from local storage
    this.todos = JSON.parse(localStorage.getItem('todoList') || '[]');
  }

  toggleDone(id: number) {
    //click on the content of todo item to mark it as completed/not completed.
    this.todos.map((v)=>{
      if(v.id===id)
        v.completed = !v.completed;
      return v;
    })
    localStorage.setItem('todoList', JSON.stringify([...this.todos]));
  }

  deleteTodo(id: number) {
    //deletes Todos based on their id.
    this.todos = this.todos.filter((todo)=>{
      return todo.id !== id;
    });
    localStorage.setItem('todoList', JSON.stringify([...this.todos]));
  }


  addTodo() {
    let newTodo = {
      //to generate ids
      id: Math.floor(Math.random()*100),
      content: this.inputTodo,
      dueDate: this.dateInput,
      completed: false,
    };
    //adding new item to todo list.
    localStorage.setItem('todoList',JSON.stringify([...this.todos, newTodo]));
    this.todos = JSON.parse(localStorage.getItem('todoList') || '[]');
    //clearing input field
    this.inputTodo = '';
    //clearing date field
    this.dateInput = new Date;
  }

}
