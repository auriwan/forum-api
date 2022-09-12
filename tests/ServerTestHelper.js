const hapiAuthJwt = require("@hapi/jwt");
const UsersTableTestHelper = require("./UsersTableTestHelper");

const ServerTesHelper = {
  async getAccessToken() {
    const userPayload = {
      id: "user-123",
      username: "dicoding",
    };

    await UsersTableTestHelper.addUser(userPayload);

    return hapiAuthJwt.token.generate(
      userPayload,
      process.env.ACCESS_TOKEN_KEY
    );
  },
};

module.exports = ServerTesHelper;
