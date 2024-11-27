import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";
// Importa a função `conectarAoBanco` do módulo `dbConfig.js`, que provavelmente estabelece a conexão com o banco de dados MongoDB.

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);
// Chama a função `conectarAoBanco` para obter a conexão com o banco de dados. A string de conexão é obtida da variável de ambiente `process.env.STRING_CONEXAO`. A palavra-chave `await` pausa a execução até que a conexão seja estabelecida.

export async function getTodosPosts() {
  // Define uma função assíncrona para obter todos os posts do banco de dados.

  const db = conexao.db("imersao-instabytes");
  // Obtém o banco de dados chamado "imersao-instabytes" a partir da conexão estabelecida.

  const colecao = db.collection("posts");
  // Obtém a coleção "posts" dentro do banco de dados.

  return colecao.find().toArray();
  // Executa a operação de busca em todos os documentos da coleção "posts" e retorna os resultados como um array.
}

export async function criarPost(novoPost) {
  const db = conexao.db("imersao-instabytes");
  // Obtém a conexão com o banco de dados

  const colecao = db.collection("posts");
  // Seleciona a coleção "posts"

  return colecao.insertOne(novoPost);
  // Insere o novo post na coleção e retorna o resultado da operação
}

export async function atualizarPost(id, novoPost) {
  const db = conexao.db("imersao-instabytes");
  // Obtém a conexão com o banco de dados

  const colecao = db.collection("posts");
  // Seleciona a coleção "posts"

  const objID = ObjectId.createFromHexString(id);

  return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost});
  // Insere o novo post na coleção e retorna o resultado da operação
}