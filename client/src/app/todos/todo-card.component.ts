import { Component, OnInit, Input } from '@angular/core';
import { Todos, TodoStatus } from './todos';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss']
})
export class TodoCardComponent implements OnInit {

  @Input() todos: Todos;
  @Input() simple?: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
