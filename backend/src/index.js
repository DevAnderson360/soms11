/**
 * Metodos HTTP
 * 
 * GET: Buscar uma informação do back-end
 * POST: Criar uma informação do back-end
 * PUT: Alterar uma informação no back-end
 * DELETE: Deletar uma informação no back-end
 */

 /**
  * 
  * Tipos de Parametros:
  * 
  * Query Params: Parãmetros nomeados enviados na rota após "?" (filtros, paginação)
  * Route Params: Parãmetros ultilizados para identificar recursos
  * Request Body: Corpo da requisição, ultilizado para criar ou alterar recursos
  */

  /**
   * Comunicação com o banco de dados: Vamos Usar o SLQLite
   * Driver: Voce digita diretamente a query (Ex. SELECT * FROM users)
   * Query Builder: ultiliza javaScript para gerar as consultas table('users').select('*')
   */

   /**
    * instalar knexjs + banco mysql3
    */
const express = require('express');

const cors = require('cors');

const routes = require('./routes');

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

app.listen(3333);