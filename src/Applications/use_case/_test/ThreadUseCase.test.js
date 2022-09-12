const ThreadUseCase = require("../ThreadUseCase");
const ThreadRepository = require("../../../Domains/threads/ThreadRepository");
const AddedThread = require("../../../Domains/threads/entities/AddedThread");
const AddThread = require("../../../Domains/threads/entities/AddThread");

describe("Thread UseCase", () => {
  describe("addThread function", () => {
    it("should orchestrating thr add thread action correctly", async () => {
      const useCasePayload = {
        userId: "user-id",
        title: "title",
        body: "this is body of thread",
      };

      const expectedResponse = new AddedThread({
        id: "thread-id",
        title: useCasePayload.title,
        sender: useCasePayload.userId,
      });

      const mockThreadRepository = new ThreadRepository();

      mockThreadRepository.addThread = jest
        .fn()
        .mockImplementation(() => Promise.resolve(expectedResponse));

      const threadUseCase = new ThreadUseCase({
        threadRepository: mockThreadRepository,
      });

      const addedThread = await threadUseCase.addThreadExec(useCasePayload);

      expect(addedThread).toStrictEqual(expectedResponse);
      expect(mockThreadRepository.addThread).toBeCalledWith(new AddThread({
        userId: useCasePayload.userId,
        title: useCasePayload.title,
        body: useCasePayload.body,
      }));
    });
  });
});
