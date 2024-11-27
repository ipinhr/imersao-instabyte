import express from "express";
// Importa o framework Express para criar a aplicação web.

import multer from "multer";
// Importa o módulo Multer para lidar com o upload de arquivos.

import { listarPosts , postarNovoPost , uploadImagem , atualizarNovoPost} from "../controllers/postsController.js";
// Importa as funções para listar posts, criar novos posts e processar uploads de imagens do arquivo controllers/postsController.js.

import cors from "cors"

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
    // Define o diretório onde os arquivos serão salvos.
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
    // Define o nome do arquivo como o nome original enviado pelo cliente.
  }
})

const upload = multer({ dest: "./uploads" , storage})
// Configura o Multer para salvar os arquivos no diretório "uploads" e utiliza a configuração de armazenamento definida em "storage".

const routes = (app) => {
  // Define uma função que recebe a aplicação Express como parâmetro para configurar as rotas.

  app.use(express.json());
  // Habilita o middleware `express.json()` para analisar o corpo das requisições JSON.
  
  app.use(cors(corsOptions));

  app.get("/posts", listarPosts);
  // Define uma rota GET para a URL "/posts". Quando uma requisição GET é feita para essa URL, a função `listarPosts` é chamada para processar a requisição.
  
  app.post("/posts" , postarNovoPost);
  // Define uma rota para criar um novo post.
  
  app.post("/upload", upload.single("imagem"), uploadImagem);
  // Define uma rota para realizar o upload de arquivos.

  app.put("/upload/:id", atualizarNovoPost)
}

export default routes;
// Exporta a função `routes` para ser utilizada em outros módulos.