const pool = require("../src/Infrastructures/database/postgres/pool");

const ThreadTableTestHelper = {
  async addThread({
    id = "thread-123",
    title = "title",
    body = "body of the thread",
    sender = "user-123",
    insertedAt = new Date(),
  }) {
    await pool.query({
      text: "INSERT INTO threads VALUES($1, $2, $3, $4, $5, $5)",
      values: [id, title, body, sender, insertedAt],
    });
  },

  async findThreadById(id) {
    const result = await pool.query({
      text: "SELECT * FROM threads WHERE id = $1",
      values: [id],
    });

    return result.rows;
  },

  async cleanTable() {
    await pool.query("DELETE FROM threads WHERE 1=1");
  },
};

module.exports = ThreadTableTestHelper;
