export type PageRequest = { limit?: number; cursor?: string }
export type PageResult<T> = { items: T[]; nextCursor?: string; hasMore: boolean }
