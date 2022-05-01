export const buildString = (obj) =>
  Object.entries(obj)
    .reduce((acc, [key, val]) => (val ? acc.concat([key]) : acc), [])
    .join(" ");
