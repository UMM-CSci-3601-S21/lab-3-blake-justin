import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { getMatTooltipInvalidPositionError } from '@angular/material/tooltip';
import { environment } from 'src/environments/environment';
import { Todos, TodoStatus } from './todos';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  readonly todoUrl: string = environment.apiUrl + 'todos';

  constructor(private httpClient: HttpClient) { }

  getTodos(filters?: {owner?: string; status?: boolean; category?: string; body?: string}): Observable<Todos[]> {
    let httpParams: HttpParams = new HttpParams();
    if(filters) {
      if (filters.owner) {
        httpParams = httpParams.set('owner', filters.owner);
      }
      //if(filters.status) {
        //httpParams = httpParams.set('status', filters.status.toString);
      //}
      if(filters.category) {
        httpParams = httpParams.set('category', filters.category);
      }
      if(filters.body) {
        httpParams = httpParams.set('body', filters.body);
      }
      return this.httpClient.get<Todos[]>(this.todoUrl, {
        params: httpParams,
      });
    }
  }

  getTodoById(id: string): Observable<Todos> {
    return this.httpClient.get<Todos>(this.todoUrl + '/' + id);
  }

/*
  filterTodos(todos: Todos[], filters: {owner?: string; status?: boolean; category?: string; body?: string}): Todos[] {
    let filteredTodos = todos;

    //Filter by owner
    if (filters.owner) {
      filters.owner = filters.owner.toLowerCase();

      filteredTodos = filteredTodos.filter(todo => todo.owner.toLowerCase().indexOf(filters.owner) !== -1);
    }

    //Filter by status
    if (filters.status) {
      filters.status = filters.status.toLowerCase();

      filteredTodos = filteredTodos.filter(todo => todo.status.toLowerCase().indexOf(filters.status) !== -1);
    }

    //Filter by category
    if (filters.category) {
      filters.category = filters.category.toLowerCase();

      filteredTodos = filteredTodos.filter(todo => todo.category.toLowerCase().indexOf(filters.category) !== -1);
    }

    //Filter by body
    if (filters.body) {
      filters.body = filters.body.toLowerCase();

      filteredTodos = filteredTodos.filter(todo => todo.body.toLowerCase().indexOf(filters.body) !== -1);
    }

  }
  */

}

