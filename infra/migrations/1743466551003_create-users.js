exports.up = (pgm) => {
  pgm.createTable("users", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    // github reference => (39)
    username: {
      type: "varchar(30)",
      unique: true,
      notNull: true,
    },
    // max email length (254): https://stackoverflow.com/a/574698
    email: {
      type: "varchar(254)",
      unique: true,
      notNull: true,
    },
    // max bcrypt length (60): https://www.npmjs.com/package/bcrypt#hash-info
    password: {
      type: "varchar(60)",
      notNull: true,
    },
    created_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("timezone('utc', now())"),
    },
    updated_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("timezone('utc', now())"),
    },
  });
};

exports.down = false;
