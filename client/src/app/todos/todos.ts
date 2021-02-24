export interface Todos {
  _id: string;
  owner: string;
  status: string;
  body: string;
  category: string;
}

export type TodoStatus = 'complete' | 'incomplete';

