/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("habit", (table) => {
      table.string("id").primary();
      table.string("name").notNullable();
      table.string("description");
    })
    .createTable("history", (table) => {
      table.string("id").primary();
      table.string("date").notNullable();
      table
        .string("habit_id")
        .references("habit.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("history").dropTable("habit");
};
