type ExpandRecursively<T> = T extends object
  ? T extends infer O
    ? { [K in keyof O]: ExpandRecursively<O[K]> }
    : never
  : T;

export type WithoutNull<T> = ExpandRecursively<{
  [K in keyof T]: Exclude<WithoutNull<T[K]>, null>;
}>;

export function objWithoutNullValues<T>(obj: T): WithoutNull<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => {
      // remove empty arrays
      if (Array.isArray(v)) return v.length;
      // remove empty values
      return !!v;
    })
  ) as WithoutNull<T>;
}
