exports.up = function (knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("id").primary();
      table.string("username").notNullable();
      table.string("password").notNullable();
      table.string("first_name").notNullable();
      table.string("last_name").notNullable();
    })
    .createTable("habits", (table) => {
      table.uuid("habit_id").primary();
      table.string("category").notNullable();
      table.string("name").notNullable();
      table.date("date").notNullable();
      table.boolean("done");
      table.uuid("user_id").references("id").inTable("users");
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable("habits").dropTable("users");
};
