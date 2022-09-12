class AddedThread {
  constructor(payload) {
    this._verifyPayload(payload);

    const { id, title, sender } = payload;

    this.id = id;
    this.title = title;
    this.sender = sender;
  }

  _verifyPayload({ id, title, sender }) {
    if (!id || !title || !sender) {
      throw new Error("ADDED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY");
    }
    if (
      typeof id !== "string" ||
      typeof title !== "string" ||
      typeof sender !== "string"
    ) {
      throw new Error("ADDED_THREAD.NOT_MEET_TYPE_SPECIFICATION");
    }
  }
}

module.exports = AddedThread;
