import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { getMatTooltipInvalidPositionError } from '@angular/material/tooltip';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  readonly todoUrl: string = environment.apiUrl + 'todos';

  //constructor(private httpClient: HttpClient) { }
}

