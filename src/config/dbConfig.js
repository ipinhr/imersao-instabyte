import { MongoClient } from "mongodb";

// Importa o cliente MongoDB para realizar a conexão com o banco de dados.

export default async function conectarAoBanco(stringConexao) {
  // Define uma função assíncrona para conectar ao banco de dados,
  // recebendo a string de conexão como parâmetro.

  let mongoClient;
  // Declara uma variável para armazenar o cliente MongoDB.

  try {
    // Bloco try-catch para tratar possíveis erros durante a conexão.
    mongoClient = new MongoClient(stringConexao);
    // Cria uma nova instância do cliente MongoDB, passando a string de conexão.
    console.log("Conectando ao cluster do banco de dados...");
    // Imprime uma mensagem no console indicando que a conexão está sendo estabelecida.
    await mongoClient.connect();
    // Conecta ao banco de dados de forma assíncrona (await).
    console.log("Conectado ao MongoDB Atlas com sucesso!");
    // Imprime uma mensagem de sucesso após a conexão.

    return mongoClient;
    // Retorna o cliente MongoDB para que possa ser utilizado em outras partes do código.
  } catch (erro) {
    // Caso ocorra algum erro durante a conexão, o bloco catch é executado.
    console.error("Falha na conexão com o banco!", erro);
    // Imprime uma mensagem de erro no console, junto com o objeto de erro.
    process.exit();
    // Encerra a execução do processo, indicando que a aplicação não pode continuar sem a conexão com o banco de dados.
  }
}