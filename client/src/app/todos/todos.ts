export interface Todos {
  _id: string;
  owner: string;
  status: TodoStatus;
  body: string;
  category: string;
  limit: number;
}

export type TodoStatus = 'complete' | 'incomplete';

