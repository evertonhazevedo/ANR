const Sequelize = require('sequelize');//Importanto Sequelize
const db = require('./db'); //Importando Banco

const tabelaDepartamento = db.define('departamento',{
    cd_departamento:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nm_departamento:{
        type: Sequelize.STRING,
        allowNull: false
    },
    cd_gerente:{
        type: Sequelize.INTEGER,
        allowNull: true
    },
    cd_coordenador:{
        type: Sequelize.INTEGER,
        allowNull: true
    }
}, {freezeTableName: true});

//Método para verificar se tabela já existe
tabelaDepartamento.sync();

//Exportando entidade
module.exports = tabelaDepartamento