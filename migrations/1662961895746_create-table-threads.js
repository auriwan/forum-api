/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable("threads", {
    id: {
      type: "varchar(50)",
      primaryKey: true,
    },
    title: {
      type: "varchar(255)",
      notNull: true,
    },
    body: {
      type: "TEXT",
      notNull: true,
    },
    sender: {
      type: "varchar(50)",
      notNull: true,
    },
    inserted_at: {
      type: "varchar(50)",
      notNull: true,
    },
    updated_at: {
      type: "varchar(50)",
      notNull: true,
    },
  });
  pgm.addConstraint(
    "threads",
    "fk_threads.sender_users.id",
    "FOREIGN KEY(sender) REFERENCES users(id) ON DELETE CASCADE"
  );
};

exports.down = (pgm) => {
  pgm.dropTable("threads");
};
