export interface Paging {
  offset: number;
  limit: number;
}

export interface Query {
  query: string;
}

export type CommonQuery = Paging & Query;