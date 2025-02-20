import { execute_defaults } from "./utils/execute_defaults.ts";

export default await execute_defaults(
  import("./parsers/test.ts"),
  import("./utils/test.ts"),
);
