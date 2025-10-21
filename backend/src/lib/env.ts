export function requireEnv(value: string) {
  const variable = process.env[value];
  if (!variable)
    throw new Error(`La variable ${variable} no ha sido inicializada.`);
  return variable;
}

export const env = {
    HOST: requireEnv("HOST"),
    NODE_ENV: requireEnv("NODE_ENV"),
    PORT: requireEnv("PORT"),
}

export const serverUrl = `http://${env["HOST"]}:${env["PORT"]}` 

