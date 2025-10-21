import { join } from "path";
import { env } from "./env";
import { PRODUCTION } from "./const";

export const PUBLIC_DIR =
  env["NODE_ENV"] === PRODUCTION
    ? "./public"
    : join(import.meta.dir, "../../", "public");
