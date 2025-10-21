await Bun.build({
  outdir:"out",
  naming:"ff.[ext]",
  entrypoints: ["./src/index.ts", "./public/index.html"],
  compile: true,
  target:"bun",
  minify: true,
});
