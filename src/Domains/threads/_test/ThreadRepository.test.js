const ThreadRepository = require("../ThreadRepository");

describe("ThreadRepository interface", () => {
  it("should return error when invoke abstract behaviour", async () => {
    const thread = new ThreadRepository();

    await expect(thread.addThread({})).rejects.toThrowError(
      "THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED"
    );
  });
});
