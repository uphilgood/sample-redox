import * as Joi from "@hapi/joi";
import { appointments } from "./handlers/appointments";
import { getDestination, postDestination } from './handlers/destination';
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
    path: "/destination",
    options: {
      handler: getDestination,
      description: "Gets destination token",
      notes: `return destination token challenge`,
      plugins: {
        "hapi-swagger": {
          responses: resultHTTPStatus,
        },
      },
      tags: ["api"],
      validate: {},
    },
  },
  {
    method: "POST",
    path: "/destination",
    options: {
      handler: postDestination,
      description: "Hello World",
      notes: `Returns Hello World`,
      plugins: {
        "hapi-swagger": {
          responses: resultHTTPStatus,
        },
      },
      tags: ["api"],
      validate: {
        options: {
          allowUnknown: true,
        },
        payload: Joi.object(),
      },
    },
  },
  {
    method: "GET",
    path: "/appointments",
    options: {
      handler: appointments,
      description: "Gets destination token",
      notes: `return destination token challenge`,
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
