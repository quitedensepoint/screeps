/* tslint:disable:no-expression-statement */

import { configuration } from "../src/config";

describe("Configuration", () => {
  it("should return an IConfiguration object", () => {
    const actualConfig = configuration();
    expect(actualConfig).toBeDefined();
  });
});
