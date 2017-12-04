/* tslint:disable:no-expression-statement */

import { loop } from "../src/main";

describe("Main loop", () => {
  it("should return an IConfiguration object", () => {
    const gameLoop = loop();
    expect(gameLoop).toBeDefined();
  });
});
