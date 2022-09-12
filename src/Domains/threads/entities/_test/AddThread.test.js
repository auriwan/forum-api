const AddThread = require("../AddThread");

describe("AddThread Entities", () => {
  it("should throw error when payload did not contain needed property", () => {
    const payload = {
      title: "title",
    };

    expect(() => new AddThread(payload)).toThrowError(
      "ADD_THREAD.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when data payload did not meet data typespecification", () => {
    const payload = {
      title: 1213,
      body: 1234,
    };

    expect(() => new AddThread(payload)).toThrowError(
      "ADD_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should create addThread object corectly", () => {
    const payload = {
      userId: "user-123",
      title: "dicoding",
      body: "dev learning platform",
    };

    const { userId, title, body } = new AddThread(payload);

    expect(userId).toEqual(payload.userId);
    expect(title).toEqual(payload.title);
    expect(body).toEqual(payload.body);
  });
});
