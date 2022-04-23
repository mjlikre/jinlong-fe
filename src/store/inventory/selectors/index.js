import * as R from "ramda";

const basePath = ["inventory"];
export const baseSelector = R.pathOr({}, basePath);
