
const connection = require('../database/connection');

module.exports = {
    async create(request, response){
        const { title, description, value } = request.body;

        //pega a id da ong pela cabecalho da requisição
        const ong_id = request.headers.authorization;

       const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id });
    },

    async index(request, response){

        //paginação
        //verifica na requisição se tem a var page. default 1
        const { page = 1 } = request.query;
        
        //conta total de registros
        const [count] = await connection('incidents').count();

        //retorna no cabeçalho da requisição o total de registros
        response.header('X-Total-Count', count['count(*)']);

        //faz o select
        const casos = await connection('incidents')
        .join('ongs','ongs.id', '=','incidents.ong_id')//(tabela do join, campo para comparar, condição, campo da tabela principal)
        .limit(5)//limita o select em 5
        .offset((page - 1) * 5) //calcular o indice dos registros.
        .select([
            'incidents.*',
            'ongs.name',
            'ongs.email',
            'ongs.whatsapp',
            'ongs.city',
            'ongs.uf'
        ]);


        return response.json(casos);
    },

    async delete(request, response){
        const { id } = request.params;

        //pega a id da ong pela cabecalho da requisição
        const ong_id = request.headers.authorization;

        //vamos buscar a id da ong registrada para o incident
        const incident = await connection('incidents')
        .where('id', id)
        .select('ong_id')
        .first();

        //vamos garantir que a ong que é a mesma que criou o incidente
        if( incident.ong_id != ong_id){
            //retorna status não autorizado na requisição http
            return response.status(401).json({ erro : 'Operação não permitida'});
        }

        await connection('incidents').where('id', id).delete();
        
        //retorna status de operação realizada com successo
        return response.status(204).send();

    }
};