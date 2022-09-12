const ThreadTableTestHelper = require("../../../../tests/ThreadTableTestHelper");
const UsersTableTestHelper = require("../../../../tests/UsersTableTestHelper");
const AddedThread = require("../../../Domains/threads/entities/AddedThread");
const AddThread = require("../../../Domains/threads/entities/AddThread");
const pool = require("../../database/postgres/pool");
const ThreadRepositoryPostgres = require("../ThreadRepositoryPostgres");

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

  describe("addThread function", () => {
    const fakeIdGenerator = () => "123";
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
});
