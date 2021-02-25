import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Todos, TodoStatus } from './todos';
import { TodosService } from './todos.service';

@Component({
  selector: 'app-todo-profile',
  templateUrl: './todo-profile.component.html',
  styleUrls: ['./todo-profile.component.scss']
})
export class TodoProfileComponent implements OnInit {

  todos: Todos;
  id: string;

  constructor(private route: ActivatedRoute, private todosService: TodosService) { }

  ngOnInit(): void {
    // We subscribe to the parameter map here so we'll be notified whenever
    // that changes (i.e., when the URL changes) so this component will update
    // to display the newly requested user.
    this.route.paramMap.subscribe((pmap) => {
      this.id = pmap.get('id');
      this.todosService.getTodoById(this.id).subscribe(todo => this.todos = todo);
  });
}

}
