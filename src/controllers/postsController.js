
import { getTodosPosts , criarPost, atualizarPost } from "../models/postsModels.js";
// Importa a função `getTodosPosts` do módulo `postsModels.js`, que provavelmente recupera todos os posts do banco de dados.
import fs from "fs"
// Importa a função `fs` do node.js.
import gerarDescricaoComGemini from "../services/geminiService.js";

export async function listarPosts(req, res) {
  // Define uma função assíncrona para listar os posts, recebendo a requisição (req) e a resposta (res) como parâmetros.

  const posts = await getTodosPosts();
  // Chama a função `getTodosPosts` para obter todos os posts e armazena o resultado na variável `posts`. A palavra-chave `await` pausa a execução até que a função `getTodosPosts` termine.

  res.status(200).json(posts);
  // Envia uma resposta HTTP com o código de status 200 (OK) e o conteúdo em formato JSON, que é o array de posts.
}

export async function postarNovoPost(req, res) {
  const novoPost = req.body;
  // Extrai os dados do novo post do corpo da requisição

  try {
    const postCriado = await criarPost(novoPost);
    // Chama a função criarPost para inserir o novo post no banco de dados
    res.status(200).json(postCriado);
    // Retorna o post criado com status 200 (sucesso)
  } catch (erro) {
    console.error(erro.message);
    // Loga a mensagem de erro no console
    res.status(500).json({"Erro":"Falha na requisição"});
    // Retorna um erro genérico ao cliente
  }
}

export async function uploadImagem(req, res) {
  const novoPost = {
    descricao: "",
    imgUrl: req.file.originalname,
    // Utiliza o nome original do arquivo como URL da imagem
    alt: ""
  };

  try {
    const postCriado = await criarPost(novoPost);
    const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
    // Gera um novo nome para o arquivo
    fs.renameSync(req.file.path, imagemAtualizada);
    // Renomeia o arquivo para o novo nome
    res.status(200).json(postCriado);
  } catch (erro) {
    console.error(erro.message);
    res.status(500).json({"Erro":"Falha na requisição"})
  }
}

export async function atualizarNovoPost(req, res) {
  const id = req.params.id;
  const urlImagem =`http://localhost:3000/${id}.png`

  try {
    const imgBuffer = fs.readFileSync(`uploads/${id}.png`)
    const descricao = await gerarDescricaoComGemini(imgBuffer)
    
    const post = {
      imgUrl: urlImagem,
      descricao: descricao,
      alt: req.body.alt
    }

    const postCriado = await atualizarPost(id, post);
    // Chama a função criarPost para inserir o novo post no banco de dados
    res.status(200).json(postCriado);
    // Retorna o post criado com status 200 (sucesso)
  } catch (erro) {
    console.error(erro.message);
    // Loga a mensagem de erro no console
    res.status(500).json({"Erro":"Falha na requisição"});
    // Retorna um erro genérico ao cliente
  }
}