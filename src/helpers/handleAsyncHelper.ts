export const handleAsync = (fn: Function) => (req: any, res: any, next: any) => {
    return Promise.resolve(fn(req, res, next)).catch(next);
  };
  