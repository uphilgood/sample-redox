import * as Joi from "@hapi/joi";
import { helloWorld } from './handlers/helloWorld';
import { IResultHTTPStatus} from './types/types';

const resultHTTPStatus: IResultHTTPStatus = {
  "200": {
    description: "Success",
    schema: Joi.object({
      status: Joi.string().example("SUCCESS"),
      data: Joi.string(),
      errors: Joi.object().example({}),
    }),
  },
  "400": {
    description: "Bad Request",
  },
  "404": {
    description: "Result not found",
  },
  "405": {
    description: "Method not allowed",
  },
  "500": {
    description: "Internal Server Error",
  },
};

export const Routes = [
  {
    method: "GET",
    path: "/hello",
    options: {
      handler: helloWorld,
      description: "Hello World",
      notes: `Returns Hello World`,
      plugins: {
        "hapi-swagger": {
          responses: resultHTTPStatus,
        },
      },
      tags: ["api"],
      validate: {},
    },
  },
];

export default Routes;
