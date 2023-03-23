/*Importação das tabelas*/
const tabelaFuncionario = require('../migrations/funcionario');
const tabelaDepartamento = require('../migrations/departamento');

/*Função para excluir o funcionário*/
async function excluirUsuario(req, res) {

    //Recuperando dados do formulário vindo do client
    let dados = req.body;

    //Se o funcionário excluído for um gerente seta null no campo cd_gerente do departamento correspondente
    if (dados.funcao == 3) {

        await tabelaDepartamento.update({
            cd_gerente: null
        },
            {
                where: {
                    cd_departamento: dados.departamento
                }
            }
        );
    }

    //Se o funcionário excluído for um coordenador seta null no campo cd_coordenador do departamento correspondente
    if (dados.funcao == 4) {

        await tabelaDepartamento.update({
            cd_coordenador: null
        },
            {
                where: {
                    cd_departamento: dados.departamento
                }
            }
        );
    }

    //exclui o funcionário de acordo com o cd_funcionario
    await tabelaFuncionario.destroy({
        where: {
            cpf: dados.cpf
        }
    }).then(async function () {

        //Caso consiga excluir retorna sucesso
        return res.status(200).json({
            success: true
        });

    }).catch(async function (error) {

        //Caso não consiga excluir retorna sucesso
        return res.status(400).json({
            success: false,
            message: error.message
        });
    });
}

module.exports = excluirUsuario;