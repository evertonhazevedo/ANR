const Sequelize = require('sequelize');//Importanto Sequelize
const db = require('./db'); //Importando Banco
const tabelaFuncao = require('./funcao');//Importando tabela funcao
const tabelaDepartamento = require('./departamento');//Importando tabela departamento

const tabelaFuncionario = db.define('funcionario',{
    cd_funcionario:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    sobrenome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    cpf:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
}, {freezeTableName: true});

//Relacionamento  1-1
tabelaFuncionario.belongsTo(tabelaFuncao, {
    constraint: true,
    foreignKey: 'cd_funcao',
    allowNull: false
})

//Relacionamento  1-N
tabelaFuncao.hasMany(tabelaFuncionario, {
    foreignKey: 'cd_funcao'
})

//Relacionamento  1-1
tabelaFuncionario.belongsTo(tabelaDepartamento, {
    constraint: true,
    foreignKey: 'cd_departamento',
    allowNull: false
})

//Relacionamento  1-N
tabelaDepartamento.hasMany(tabelaFuncionario, {
    foreignKey: 'cd_departamento'
})

//Método para verificar se tabela já existe
tabelaFuncionario.sync({});

//Exportando entidade
module.exports = tabelaFuncionario