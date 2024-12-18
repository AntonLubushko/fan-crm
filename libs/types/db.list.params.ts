export type WhereClause = { id?: number; userId?: number };

export type Options<T = undefined, U = undefined> = {
  model?: T;
  include?: U extends undefined
    ? never
    : Array<{
        model: U;
      }>;
};
export type Conditions<T = undefined, U = undefined> = {
  where?: WhereClause;
  include?: [Options<T, U>];
};
