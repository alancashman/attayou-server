exports.up = function (knex) {
  return knex.schema.createTable("habits", (table) => {
    table.uuid("id").primary().notNullable();
    table.string("name").notNullable();
    table.json("history");
    table.string("description");
    table.integer("user_id").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("habits");
};
