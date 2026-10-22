import { User } from '../user.model.js';

export interface PageMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface CursorMeta {
  limit: number;
  nextCursor: number | null;
  hasNextPage: boolean;
}

export interface PaginatedUsers<M extends PageMeta | CursorMeta> {
  data: User[];
  meta: M;
}
