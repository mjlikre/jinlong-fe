import * as R from "ramda";

export const classBuilder = (styles) => (item) =>
  concatClassNames(styles, (transformed) =>
    R.reject(
      R.isEmpty,
      R.keys(transformed).map((k) =>
        (
          typeof transformed[k] === "boolean"
            ? transformed[k]
            : transformed[k](item)
        )
          ? k
          : ""
      )
    ).join(" ")
  );

const concatClassNames = (styles, cb) =>
  cb(
    R.zipObj(
      R.keys(styles).reduce(
        (acc, current, i) =>
          acc.push(
            current.startsWith("&") ? acc[i - 1] + current.slice(1) : current
          ) && acc,
        []
      ),
      R.props(R.keys(styles), styles)
    )
  );
