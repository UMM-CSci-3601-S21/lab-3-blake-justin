export interface Todos {
  _id: string;
  owner: string;
  status: TodoStatus;
  body: string;
  category: string;
}

export type TodoStatus = 'true' | 'false';

