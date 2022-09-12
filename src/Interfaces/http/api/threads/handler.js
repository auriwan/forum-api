const ThreadUseCase = require("../../../../Applications/use_case/ThreadUseCase");

class ThreadHandler {
  constructor(container) {
    this._container = container;

    this.postThreadHandler = this.postThreadHandler.bind(this);
  }

  async postThreadHandler(request, h) {
    const addThreadUseCase = this._container.getInstance(ThreadUseCase.name);
    const addedThread = await addThreadUseCase.addThreadExec({
      ...request.payload,
      userId: request.auth.credentials.id,
    });

    const response = h.response({
      status: "success",
      data: {
        addedThread,
      },
    });
    response.code(201);
    return response;
  }
}

module.exports = ThreadHandler;
