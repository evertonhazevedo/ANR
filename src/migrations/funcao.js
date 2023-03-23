const Sequelize = require('sequelize'); //Importando o Sequelize
const db = require('./db'); //Importando Banco de dados

const tabelaFuncao = db.define('funcao',{
    cd_funcao:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nm_funcao:{
        type: Sequelize.STRING,
        allowNull: false
    }
}, {freezeTableName: true});

//Método para verificar se tabela já existe
tabelaFuncao.sync();

//Exportando entidade
module.exports = tabelaFuncao