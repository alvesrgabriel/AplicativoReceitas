//import library
const Sequelize = require("sequelize");
//keys
const conexaoComBanco = new Sequelize("appreceitas", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

const receita = conexaoComBanco.define("receita", {
    nome: {
      type: Sequelize.STRING,
    },
    tempoPreparo: {
      type: Sequelize.TIME,
    },
    modoPreparo: {
      type: Sequelize.TEXT,
    },
    descricao: {
      type: Sequelize.TEXT,
    },
    ingredientes: {
      type: Sequelize.TEXT,
    },
});
//Aqui é pra rodar quando criar a coluna

//receita.sync({ force: true });

//INSERT

// receita.create({
//   nome: "Bolo de cenoura",
//   tempoPreparo: "00:40:00",
//   modoPreparo: "Misture os ingredientes e asse por 30 minutos",
//   descricao: "Um bolo saboroso feito com cenouras frescas.",
//   ingredientes: "2 Cenouras, sal, óleo e farinha de trigo"
// });

module.exports = receita;




