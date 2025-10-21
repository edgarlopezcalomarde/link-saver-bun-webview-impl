import { Webview, SizeHint } from "webview-bun";

interface WebviewSize {
  width: number;
  height: number;
  hint: SizeHint;
}
interface WebviewConfig {
  title: string;
  url?: string;
  html?: string;
  size?: WebviewSize;
}

export function createInstanceOfWebview({
  title,
  url,
  html,
  size = { width: 1024, height: 768, hint: SizeHint.NONE },
}: WebviewConfig): Webview {
  if (!url && !html) {
    throw new Error(
      "Debe proveerse una 'url' o el 'html' para inicializar el Webview."
    );
  }

  if (url && html) {
    console.warn(
      "Se han provisto 'url' y 'html'. Se usará la URL y se ignorará el HTML."
    );
  }

  const webview = new Webview();


  webview.title = title;
  webview.size = size;

  if (url) {
    webview.navigate(url);
  } else if (html) {
    webview.setHTML(html);
  }

  return webview;
}

