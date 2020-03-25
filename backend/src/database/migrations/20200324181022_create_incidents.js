
//Criar a tabela incidents
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function(table){
        table.increments(); 

        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();
         
        table.string('ong_id').notNullable();

        //fazer a referencia de tabela estrangeira ongs
        table.foreign('ong_id').references('id').inTable('ongs');
     });
   };
   
   //caso de algo errado podemos deletar a tabela
   exports.down = function(knex) {
       return knex.schema.dropTable('incidents');
   };
   