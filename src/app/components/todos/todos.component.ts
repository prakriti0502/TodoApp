import { Component, OnInit, } from '@angular/core';
import {Todo} from '../../models/Todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos!: Todo[];

  inputTodo:string = '';
  constructor() { }

  ngOnInit(): void {
    this.todos = JSON.parse(localStorage.getItem('todoList') || '[]');
    console.log(this.todos);
  }

  toggleDone(id: number) {
    this.todos.map((v)=>{
      if(v.id===id)
        v.completed = !v.completed;
      return v;
    })
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter((todo)=>{
      return todo.id !== id;
    });
    localStorage.setItem('todoList', JSON.stringify([...this.todos]));
  }


  addTodo() {
    let newTodo = {
      id: Math.floor(Math.random()*100),
      content: this.inputTodo,
      completed: false,
    };
    localStorage.setItem('todoList',JSON.stringify([...this.todos, newTodo]));
    this.todos = JSON.parse(localStorage.getItem('todoList') || '[]');
    this.inputTodo = '';
  }

}
