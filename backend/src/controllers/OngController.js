//server para criptografar e vamos usar para gerar numero de id para a ongs
const crypto = require('crypto');

//conexao com o banco de dados
const connection = require('../database/connection');

module.exports = {
    async create (request, response) {
        
        //pega as informações no body da requisição de uma só vez    
        //const data = request.body;

        //pega as informações no body da requisição usando desestruturação    
        const {name, email, whatsapp, city, uf} = request.body;

        const id = crypto.randomBytes(4).toString('HEX');

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        });

        return response.json({ id });
    },

    async index (request, response){
        const ongs = await connection('ongs').select('*');

        return response.json(ongs);
    },

    async delete(request, response){
        const { id } = request.params;

        await connection('ongs').where('id', id).delete();
        
        //retorna status de operação realizada com successo
        return response.status(204).send();
    }
    
};