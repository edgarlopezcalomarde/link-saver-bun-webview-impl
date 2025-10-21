import { SizeHint } from "webview-bun";
import { env, serverUrl } from "./lib/env";
import { createInstanceOfWebview } from "./lib/webview";


const webview = createInstanceOfWebview({
  url: serverUrl,
  title: "MyApp Dev Mode",
  size: { width: 1200, height: 800, hint: SizeHint.NONE },
});

if (env["NODE_ENV"] === "production") {
  const worker = new Worker("./src/app.ts");
  worker.addEventListener("close", () => webview.destroy());
}

webview.run();


