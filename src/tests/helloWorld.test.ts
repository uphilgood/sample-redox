"use strict";

import * as Lab from "@hapi/lab";
import { expect } from "chai";
import { Server, ServerInjectOptions } from "@hapi/hapi";
import { init } from "../server";
import { IResponseObject } from "../types/types";

const { afterEach, beforeEach, describe, it } = (exports.lab = Lab.script());

const helloWorldInjectionOptions: ServerInjectOptions = {
  method: "get",
  url: "/hello",
};

const baseRouteInjectionOptions: ServerInjectOptions = {
  method: "get",
  url: "/",
};

let payload: IResponseObject<string>;

describe("GET /hello", () => {
  let server: Server;

  beforeEach(async () => {
    server = await init();
  });

  afterEach(async () => {
    await server.stop();
  });

  it("should respond with 200", async () => {
    const res: any = await server.inject(helloWorldInjectionOptions);
    expect(res.statusCode).to.equal(200);
    payload = res.result;
  });

  it("should respond with correct response object", async () => {
    expect(payload)
      .to.be.an("object")
      .to.have.any.keys("data", "status", "errors");
  });

  it("should respond with `Hello World!`", async () => {
    expect(payload.data).to.equal("Hello World!");
  });

  it("should have a status of SUCCESS", async () => {
    expect(payload.status).to.equal("SUCCESS");
  });

  it("should have errors of null", async () => {
    expect(payload.errors).to.equal(null);
  });
});

describe("GET /", () => {
  let server: Server;

  beforeEach(async () => {
    server = await init();
  });

  afterEach(async () => {
    await server.stop();
  });

  it("should respond with 404", async () => {
    const res: any = await server.inject(baseRouteInjectionOptions);
    return expect(res.statusCode).to.equal(404);
  });
});
