export const clsx = (className: Array<string | false | undefined>) =>
  (className.reduce(
    (acc, current) => `${acc} ${current || ""}`
  ) as string).trim();
