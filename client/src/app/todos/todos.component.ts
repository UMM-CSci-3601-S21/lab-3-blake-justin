import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Todos, TodoStatus } from './todos';
import { TodosService } from './todos.service';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  public serverFilteredTodos: Todos[];
  public filteredTodos: Todos[];

  public todoOwner: string;
  public todoStatus: string;
  public todoBody: string;
  public todoCategory: string;
  public todoLimit: number;
  public todoOrderBy: string;
  snackBar: any;

  constructor(private todosService: TodosService, private route: ActivatedRoute) { }

  getTodosFromServer() {
    this.todosService.getTodos({
      owner: this.todoOwner,
      body: this.todoBody,
      category: this.todoCategory,
      status: this.todoStatus,
      limit: this.todoLimit,
      orderBy: this.todoOrderBy

    }).subscribe(returnedTodos => {
      this.serverFilteredTodos = returnedTodos;
      this.updateFilter();
    }, err => {
      // If there was an error getting the users, display
      // a message.
      this.snackBar.open(
        'Problem contacting the server – try again',
        'OK',
        // The message will disappear after 3 seconds.
        { duration: 3000 });
      // I (Nic) feel like we should throw an error here, but
      // I can't figure out how to test that at the moment,
      // so I'm going to leave it out. If someone knows
      // how to make this work that would be great.
      //
      // Now throw an error, which will show up in the browser
      // JavaScript console and allow us to examine the stack
      // trace.
      //
      // throw new Error('Failed to connect to the server: ' + err);
    });
  }
  updateFilter() {
    this.filteredTodos = this.todosService.filterTodos(
      this.serverFilteredTodos,
      { owner: this.todoOwner, body: this.todoBody, category: this.todoCategory, orderBy: this.todoOrderBy });
  }

  ngOnInit(): void {
    this.getTodosFromServer();
  }

}
