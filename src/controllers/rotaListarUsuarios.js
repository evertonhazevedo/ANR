/*Importação do banco*/
const dataBase = require('../migrations/db');

/*Função para listar todos os funcionários*/
async function listarUsuario(req, res) {

    let funcao = parseInt(req.params.funcao);

    switch (funcao) {

        case 1:

            //Recuperando todos os funcionários caso o login seja feito como ADM
            const [resultsAdm] = await dataBase.query(
                `SELECT a.cd_funcionario, a.nome, a.sobrenome, a.cpf, b.nm_funcao, c.nm_departamento, b.cd_funcao, c.cd_departamento
                 FROM funcionario a INNER JOIN funcao b on a.cd_funcao = b.cd_funcao
                 INNER JOIN departamento c on a.cd_departamento = c.cd_departamento ORDER BY a.cd_funcionario asc`
            );

            return res.status(200).json({
                success: true,
                funcionarios: resultsAdm
            });

        case 2:
            //Recuperando todos os funcionários do departamento caso o login seja feito como Diretor
            const [resultsDiretor] = await dataBase.query(
                `SELECT a.cd_funcionario, a.nome, a.sobrenome, a.cpf, b.nm_funcao, c.nm_departamento, b.cd_funcao, c.cd_departamento
                 FROM funcionario a INNER JOIN funcao b on a.cd_funcao = b.cd_funcao
                 INNER JOIN departamento c on a.cd_departamento =  c.cd_departamento
                 WHERE a.cd_departamento= ` + req.params.departamento + ` ORDER BY a.cd_funcionario asc`
            );
            
            return res.status(200).json({
                success: true,
                funcionarios: resultsDiretor
            });

        case 3:
            //Recuperando todos os funcionários do departamento menos o diretor caso o login seja feito como Gerente
            const [resultsGerente]  = await dataBase.query(
                `SELECT a.cd_funcionario, a.nome, a.sobrenome, a.cpf, b.nm_funcao, c.nm_departamento, b.cd_funcao, c.cd_departamento
                 FROM funcionario a INNER JOIN funcao b on a.cd_funcao = b.cd_funcao
                 INNER JOIN departamento c on a.cd_departamento =  c.cd_departamento
                 WHERE a.cd_departamento= ` + req.params.departamento + ` AND a.cd_funcao not in(2) ORDER BY a.cd_funcionario asc`
            );

            return res.status(200).json({
                success: true,
                funcionarios: resultsGerente
            });

        case 4:
            //Recuperando todos os funcionários do departamento menos o diretor e o gerente caso o login seja feito como Coordenador
            const [resultsCoordenador]  = await dataBase.query(
                `SELECT a.cd_funcionario, a.nome, a.sobrenome, a.cpf, b.nm_funcao, c.nm_departamento, b.cd_funcao, c.cd_departamento
                 FROM funcionario a INNER JOIN funcao b on a.cd_funcao = b.cd_funcao
                 INNER JOIN departamento c on a.cd_departamento =  c.cd_departamento
                 WHERE a.cd_departamento= ` + req.params.departamento + ` AND a.cd_funcao not in(2, 3) ORDER BY a.cd_funcionario asc`
            );

            return res.status(200).json({
                success: true,
                funcionarios: resultsCoordenador
            });

        default:
            //Recuperando todos os analistas ou devs em questao caso o login seja feito como Analista ou dev
            let [results] = await dataBase.query(
                `SELECT a.cd_funcionario, a.nome, a.sobrenome, a.cpf, b.nm_funcao, c.nm_departamento, b.cd_funcao, c.cd_departamento
                 FROM funcionario a INNER JOIN funcao b on a.cd_funcao = b.cd_funcao
                 INNER JOIN departamento c on a.cd_departamento =  c.cd_departamento
                 WHERE a.cd_departamento= ` + req.params.departamento + ` AND a.cd_funcao not in(2, 3, 4) ORDER BY a.cd_funcionario asc`
            );

            return res.status(200).json({
                success: true,
                funcionarios: results
            });
    }

}

module.exports = listarUsuario;