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

  getTodos(filters?:
    {owner?: string; status?: string; category?: string; body?: string; limit?: number; orderBy?: string}): Observable<Todos[]> {

      let httpParams: HttpParams = new HttpParams();
    if(filters) {
      if (filters.owner) {
        httpParams = httpParams.set('owner', filters.owner);
      }
      if(filters.status) {
        httpParams = httpParams.set('status', filters.status);
      }
      if(filters.category) {
        httpParams = httpParams.set('category', filters.category);
      }
      if(filters.body) {
        httpParams = httpParams.set('body', filters.body);
      }
      if(filters.limit) {
        httpParams = httpParams.set('limit', filters.limit.toString());
      }
      if(filters.orderBy) {
        httpParams = httpParams.set('sort', filters.orderBy);
      }

      return this.httpClient.get<Todos[]>(this.todoUrl, {
        params: httpParams,
      });
    }
  }

  getTodoById(id: string): Observable<Todos> {
    return this.httpClient.get<Todos>(this.todoUrl + '/' + id);
  }


  filterTodos(todos: Todos[], filters: {owner?: string; category?: string; body?: string; orderBy?: string}): Todos[] {
    let filteredTodos = todos;

    //Filter by owner
    if (filters.owner) {
      filters.owner = filters.owner.toLowerCase();

      filteredTodos = filteredTodos.filter(todo => todo.owner.toLowerCase().indexOf(filters.owner) !== -1);
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

    //Sort todos by owner, category, or body
    if (filters.orderBy) {
      filters.orderBy = filters.orderBy.toLowerCase();

      filteredTodos = filteredTodos.filter(todo => todo.orderBy.toLowerCase().indexOf(filters.category) !== -1);
    }

    return filteredTodos;

  }

}

