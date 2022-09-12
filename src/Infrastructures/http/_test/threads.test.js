const ServerTesHelper = require("../../../../tests/ServerTestHelper");
const ThreadTableTestHelper = require("../../../../tests/ThreadTableTestHelper");
const UsersTableTestHelper = require("../../../../tests/UsersTableTestHelper");
const container = require("../../container");
const pool = require("../../database/postgres/pool");
const createServer = require("../createServer");

describe("/threads endpoint", () => {
  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    await ThreadTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  describe("when POST /threads", () => {
    it("should response 201 and persisted thread", async () => {
      const payload = {
        title: "title",
        body: "body of the thread",
      };

      const server = await createServer(container);

      const accessToken = await ServerTesHelper.getAccessToken();

      const response = await server.inject({
        method: "POST",
        url: "/threads",
        payload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual("success");
      expect(responseJson.data.addedThread).toBeDefined();
    });

    it("should response 401 when auth invalid", async () => {
      const payload = {
        title: "title",
        body: "body of the thread",
      };

      const server = await createServer(container);
      const response = await server.inject({
        method: "POST",
        url: "/threads",
        payload,
        headers: {
          Authorization: `Bearer invalid token`,
        },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(401);
      expect(responseJson.error).toEqual("Unauthorized");
    });

    it("should response 400 when request not contain needed property", async () => {
      const payload = {
        title: "title",
      };

      const server = await createServer(container);

      const accessToken = await ServerTesHelper.getAccessToken();

      const response = await server.inject({
        method: "POST",
        url: "/threads",
        payload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual("harus mengisi title dan body");
    });

    it("should response 400 when request not meet data type specifiction", async () => {
      const payload = {
        title: "title",
        body: true,
      };

      const server = await createServer(container);

      const accessToken = await ServerTesHelper.getAccessToken();

      const response = await server.inject({
        method: "POST",
        url: "/threads",
        payload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual(
        "title dan body harus berupa string"
      );
    });
  });
});
