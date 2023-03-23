/*Importação do banco*/
const dataBase = require('../migrations/db');

/*Função para listar todos os funcionários*/
async function buscarHierarquia(req, res) {

    //Recuperando todos os funcionários da mesma equipe
    const [results] = await dataBase.query(
        `SELECT a.cd_funcionario, a.nome, a.sobrenome, b.nm_funcao, a.cd_funcao
             FROM funcionario a INNER JOIN funcao b on a.cd_funcao = b.cd_funcao
             INNER JOIN departamento c on a.cd_departamento =  c.cd_departamento
             WHERE a.cd_departamento=` + req.params.departamento
    );

    if (results != '') {

        return res.status(200).json({
            success: true,
            equipe: results
        })

    } else {

        return res.status(400).json({
            success: false,
            message: 'Sem resultados'
        })

    }
}

module.exports = buscarHierarquia;