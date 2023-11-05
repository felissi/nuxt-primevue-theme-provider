type NumericObject = Record<string | number, any>;
type Flatten<
  T extends NumericObject,
  I extends string = "-",
> = NumericObject extends T
  ? NumericObject
  : {
      [K in keyof T]-?: (
        x: NonNullable<T[K]> extends infer V
          ? V extends NumericObject
            ? V extends readonly any[]
              ? Pick<T, K>
              : Flatten<V, I> extends infer FV
              ? {
                  [P in keyof FV as `${Extract<
                    K,
                    string | number
                  >}${I}${Extract<P, string | number>}`]: FV[P];
                }
              : never
            : Pick<T, K>
          : never,
      ) => void;
    } extends Record<keyof T, (y: infer O) => void>
  ? O extends infer U
    ? { [K in keyof O]: O[K] }
    : never
  : never;

type Prefixed<T extends NumericObject, P extends string | number> = {
  [K in keyof T as `${P}${K}`]: T[K];
};
type Verbose<T> = {
  [K in keyof T]: T[K];
} & {};
type PrefixedFlatten<
  T extends NumericObject,
  I extends string = never,
  P extends string = never,
> = P extends "" | never
  ? Flatten<T, I>
  : Verbose<Prefixed<Flatten<T, I>, `${P}${I}`>>;

export function flattenObject<
  T extends Record<string | number, any>,
  I extends string = "-",
  P extends string = "",
>(
  obj: T,
  { prefix = "", interfix = "-" }: { prefix?: P; interfix?: I } = {},
): PrefixedFlatten<T, I, P> {
  return Object.entries(obj).reduce(
    (acc, [key, value]) => {
      const prefixedKey = prefix ? `${prefix}${interfix}${key}` : key;
      const isObject = <T>(v: T): v is Record<any, any> =>
        typeof v === "object" && !Array.isArray(v);
      const flattened = isObject(value)
        ? flattenObject(value, { prefix: prefixedKey, interfix })
        : { [prefixedKey]: value }; // base case
      return { ...acc, ...flattened };
    },
    {} as PrefixedFlatten<T, I, P>,
  );
}
