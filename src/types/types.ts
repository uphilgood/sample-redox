import { ObjectSchema } from "@hapi/joi";

export interface IResponseObject<T> {
  data: string | T;
  status: string;
  errors: string | object | T | null;
}

export interface IResultHTTPStatus {
  200: {
    description: string;
    schema: ObjectSchema<any>;
  };
  400: {
    description: string;
  };
  404: {
    description: string;
  };
  405: {
    description: string;
  };
  500: {
    description: string;
  };
}
