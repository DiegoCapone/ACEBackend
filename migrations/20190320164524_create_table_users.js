
exports.up = function (knex, Promise) {
  return knex.schema.createTable('cliente', table => {
    table.increments('id').primary()
    table.string('cnpj').notNull().unique()
    table.string('razaoSocial').notNull()
    table.string('contato').notNull()
    table.string('email').notNull()
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('cliente')
};

