
//Criar a tabela ongs
exports.up = function(knex) {
 return knex.schema.createTable('ongs', function(table){
      table.string('id').primary();
      table.string('name').notNullable();
      table.string('email').notNullable();
      table.string('whatsapp').notNullable();
      table.string('city').notNullable();
      table.string('uf',2).notNullable();
  });
};

//caso de algo errado podemos deletar a tabela
exports.down = function(knex) {
    return knex.schema.dropTable('ongs');
};
