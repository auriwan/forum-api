const ThreadTableTestHelper = require("../../../../tests/ThreadTableTestHelper");
const UsersTableTestHelper = require("../../../../tests/UsersTableTestHelper");
const AddedThread = require("../../../Domains/threads/entities/AddedThread");
const AddThread = require("../../../Domains/threads/entities/AddThread");
const pool = require("../../database/postgres/pool");
const ThreadRepositoryPostgres = require("../ThreadRepositoryPostgres");
const NotFoundError = require("../../../Commons/exceptions/NotFoundError");

describe("ThreadRepositoryPostgres", () => {
  beforeEach(async () => {
    await UsersTableTestHelper.addUser({});
  });

  afterEach(async () => {
    await ThreadTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });
  const fakeIdGenerator = () => "123";

  describe("addThread function", () => {
    it("should persist add thread and return addedd thread correctly", async () => {
      const addThread = new AddThread({
        userId: "user-123",
        title: "title",
        body: "body of the thread",
      });
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      await threadRepositoryPostgres.addThread(addThread);

      const thread = await ThreadTableTestHelper.findThreadById("thread-123");
      expect(thread).toHaveLength(1);
    });
    it("should return added thread correctly", async () => {
      const addThread = new AddThread({
        userId: "user-123",
        title: "title",
        body: "body of the thread",
      });
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(
        pool,
        fakeIdGenerator
      );
      const addedThread = await threadRepositoryPostgres.addThread(addThread);

      expect(addedThread).toStrictEqual(
        new AddedThread({
          id: "thread-123",
          title: addThread.title,
          sender: addThread.userId,
        })
      );
    });
  });

  describe("addThread Check", () => {
    const threadId = "thread-123";
    it("should throw NotFound error if id thread not found", async () => {
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      await expect(threadRepositoryPostgres.verifyId(threadId)).rejects.toThrow(
        NotFoundError
      );
    });

    it("should not throw NotFoundError if thread found", async () => {
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      await ThreadTableTestHelper.addThread({});

      await expect(
        threadRepositoryPostgres.verifyId(threadId)
      ).resolves.not.toThrow(NotFoundError);
    });
  });
});
