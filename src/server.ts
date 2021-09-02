import * as Hapi from "@hapi/hapi";
import * as HapiSwagger from "hapi-swagger";
import * as Inert from "@hapi/inert";
import * as Vision from "@hapi/vision";
import { Routes } from "./routes";
import { Server } from "@hapi/hapi";
import CONFIGS from "./util/config";

const PORT: number = parseInt(CONFIGS.PORT as string, 10);

const swaggerOptions: HapiSwagger.RegisterOptions = {
  info: {
    title: "API Documentation",
    version: CONFIGS.VERSION,
  },

  host: `${CONFIGS.HOST}`,
  basePath: `${CONFIGS.BASE_URL}`,
  documentationPath: "/documentation",
  swaggerUIPath: `${CONFIGS.BASE_URL}`,
  routesBasePath: "/",
  jsonPath: `${CONFIGS.BASE_URL}swagger.json`,
  jsonRoutePath: `${CONFIGS.BASE_URL}swagger.json`,
};

const plugins: Array<Hapi.ServerRegisterPluginObject<any>> = [
  {
    plugin: Inert,
  },
  {
    plugin: Vision,
  },
  {
    plugin: HapiSwagger,
    options: swaggerOptions,
  },
];

const server: Server = new Server({
  port: PORT || 3000,
  router: {
    stripTrailingSlash: true,
  },
});

server.route(Routes);

export const init = async () => {
  await server.initialize();
  return server;
};

export const start = async () => {
  await server.register(plugins);
  await server.start();

  console.log(`Server running at: ${server.info.uri}`);
  return server;
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});
