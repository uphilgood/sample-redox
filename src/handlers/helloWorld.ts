import { ResponseToolkit } from "@hapi/hapi";
import { IResponseObject } from "../types/types";

export const helloWorld = (
  _: any,
  h: ResponseToolkit
): IResponseObject<string> => ({
  data: "Hello World!",
  status: "SUCCESS",
  errors: null,
});
