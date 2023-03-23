const Sequelize = require('sequelize');//Importanto Sequelize
const db = require('../migrations/db'); //Importando Banco

//Importando Tabelas
const tabelaFuncao = require('../migrations/funcao');
const tabelaFuncionario = require('../migrations/funcionario');
const tabelaDepartamento = require('../migrations/departamento');