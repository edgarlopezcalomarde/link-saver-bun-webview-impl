import { Elysia } from "elysia";
import { staticPlugin } from "@elysiajs/static";
import { join } from "path";
import { env, serverUrl } from "./lib/env";
import { listDirectories } from "./lib/read-dir";
import { PUBLIC_DIR } from "./lib/public-dir";

new Elysia()
  .use(staticPlugin({ assets: PUBLIC_DIR, prefix: "/" }))
  .get("*", () => Bun.file(join(PUBLIC_DIR, "index.html")))
  .listen(env["PORT"], async () => {
    await listDirectories(".")
    console.log(`Server is running on ${serverUrl}`);
  });
