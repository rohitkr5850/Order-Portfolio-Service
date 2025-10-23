export const toISODate = (date: Date | string): string => {
    return new Date(date).toISOString();
  };
  
  export const nowUTC = (): string => new Date().toISOString();
  
  export const isExpired = (date: Date | string): boolean => {
    return new Date(date).getTime() < Date.now();
  };
  