const AddedThread = require("../AddedThread");

describe("Added thread Entities", () => {
  it("should throw error when payload did not contain needed property", () => {
    const payload = {
      title: "title",
      sender: "user-id",
    };

    expect(() => new AddedThread(payload)).toThrowError(
      "ADDED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });
  it("should throw error when payload did not meet data type specification", () => {
    const payload = {
      id: 4343,
      title: 1223,
      sender: 1233,
    };
    expect(() => new AddedThread(payload)).toThrowError(
      "ADDED_THREAD.NOT_MEET_TYPE_SPECIFICATION"
    );
  });
  it("should creat addThread object correctly", () => {
    const payload = {
      id: "4343",
      title: "1223",
      sender: "1233",
    };
    const { id, title, sender } = new AddedThread(payload);

    expect(id).toEqual(payload.id);
    expect(title).toEqual(payload.title);
    expect(sender).toEqual(payload.sender);
  });
});
