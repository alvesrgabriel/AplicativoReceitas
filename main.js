const express = require("express");
const rotas = express();
const cors = require("cors");
rotas.use(cors());
const receita = require ('./db.js');


//---ROTAS---//

   rotas.get("/", function (req, res) {
    res.send("Rota Principal!");
});

//inserir
   rotas.get("/receita/:nome/:tempoPreparo/:modoPreparo/:descricao/:ingredientes", async function (req, res) {
    const { nome, tempoPreparo, modoPreparo, descricao, ingredientes } = req.params;

    const novaReceita = await receita.create({ nome, tempoPreparo, modoPreparo, descricao, ingredientes }); //função que espera

    res.json({
        resposta: "Receita adicionada com sucesso!",
        receita: novaReceita,
    });
});

//mostrar
   rotas.get("/mostrar", async function (req, res) {
    try {
        const mostrarReceita = await receita.findAll(); // Busca todos os registros
        res.json(mostrarReceita); // Retorna os registros em formato JSON
    } catch (error) {
        res.status(500).json({ message: `Erro ao buscar receita: ${error}` }); // Retorna erro ao cliente
    }
  });

//deletar
   rotas.get("/deletar/:id", async function (req, res) {
    try{
      const { id } = req.params;
      const idNumber = parseInt(id, 10); //Converte id para número
  
      const deleted = await receita.destroy({
          where: { id: idNumber},
      });
  
      if (deleted) {
          res.json({ mensagem: "Receita deletada com sucesso!" });
      } else {
          res.status(404).json({ mensagem: "Receita não encontrada!" });
      }
    } catch (error) {
      res.status(500).json({ message: `Erro ao deletar receita: ${error}` }); // Retorna erro ao cliente
    }
  });

//editar
   rotas.get("/editar/:id/:nome/:tempoPreparo/:modoPreparo/:descricao/:ingredientes", async function (req, res) {
    try{
      const { id, nome, tempoPreparo, modoPreparo, descricao, ingredientes } = req.params;
      const idNumber = parseInt(id, 10); // Converte o ID para número
  
      const [updated] = await receita.update(
        { id, nome, tempoPreparo, modoPreparo, descricao, ingredientes },
        {
          where: { id: idNumber }, // Usa o ID numérico
        }
      );
  
      res.json({
        mensagem: "Receita atualizada com sucesso!",
      });
    } catch (error) {
      res.status(500).json({ message: `Erro ao editar receita: ${error}` }); // Retorna erro ao cliente
    }
  });


//Servidor//

   rotas.listen(3031, function () {
    console.log("Server is running on port 3031");
});