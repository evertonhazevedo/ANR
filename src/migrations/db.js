const Sequelize = require('sequelize');

const sequelize = new Sequelize('ANR', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate()
    .then(() => {
        console.log("Conexão com o banco de dados realizada com sucesso!");
    }).catch((error) => {
        console.log("Conexão com o banco de dados não foi realizada com sucesso! Erro: " + error);
    });

module.exports = sequelize;