export interface PaginationOptions {
    page?: number;
    limit?: number;
  }
  
  export interface PaginationResult<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }
  
  export const paginate = <T>(
    data: T[],
    total: number,
    { page = 1, limit = 10 }: PaginationOptions
  ): PaginationResult<T> => {
    const totalPages = Math.ceil(total / limit);
    return { data, total, page, limit, totalPages };
  };
  