/*Importação das tabelas*/
const tabelaFuncionario = require('../migrations/funcionario');
const tabelaDepartamento = require('../migrations/departamento');

/*Função para cadastrar o funcionário*/
async function cadastrarUsuario(req, res) {

    //Recupera os dados do formulário vindo do client
    let dados = req.body;

    // Verificando se funcionário já está cadastrado
    const funcionario = await tabelaFuncionario.findOne({
        attributes: ['cpf'],
        where: {
            cpf: dados.cpf
        }
    });

    //Caso já exista funcionário com o mesmo cpf impede o cadastro
    if (funcionario != null) {

        return res.status(400).json({
            success: false,
            message: "Usuário já cadastrado ",
            erro: 1
        });
        //Caso não exista funcionário com o mesmo cpf faz o cadastro
    } else {

        //Cria o funcionário na tabela de funcionários
        await tabelaFuncionario.create({

            nome: dados.nome,
            sobrenome: dados.sobrenome,
            cd_funcao: dados.cd_funcao,
            cd_departamento: dados.cd_departamento,
            cpf: dados.cpf

        }).then(async function (novoFuncionario) {

            //Caso o funcionário seja um gerente entra no if
            if (dados.cd_funcao == 3) {

                // Verificando se já existe gerente cadastrado no departamento
                const existeGerente = await tabelaDepartamento.findOne({
                    attributes: ['cd_gerente'],
                    where: {
                        cd_departamento: dados.cd_departamento
                    }
                });

                //Caso exista um gerente cadastrado no departamento entra
                if (existeGerente.cd_gerente != null) {

                    //Apaga o registro criado na tabela funcionários
                    await tabelaFuncionario.destroy({
                        where: {
                            cd_funcionario: novoFuncionario.cd_funcionario
                        }
                    })

                    //Retorna erro ocorrido
                    return res.status(400).json({
                        success: false,
                        message: "Departamento já possui um gerente ",
                        erro: 3
                    });

                } else {

                    //Recuperar o código do funcionário na tabela de funcionários pelo cpf
                    await tabelaFuncionario.findOne({

                        attributes: ['cd_funcionario'],
                        where: {
                            cpf: dados.cpf
                        }

                    }).then(async function (gerente) {

                        //Atualiza o campo cd_gerente na tabela de departamento de acordo com o departamento
                        await tabelaDepartamento.update({

                            cd_gerente: gerente.cd_funcionario

                        },
                            {
                                where: {
                                    cd_departamento: dados.cd_departamento
                                }

                            }).then(async function () {

                                //Caso atualize retorna sucesso
                                return res.status(200).json({
                                    success: true
                                });

                            }).catch(async function (error) {

                                //Caso não atualize retorna erro
                                return res.status(400).json({
                                    success: false,
                                    message: error.message
                                });
                            });

                    }).catch(async function (error) {

                        return res.status(400).json({
                            success: false,
                            message: error.message
                        });
                    });
                }
                //Caso o funcionário seja um coordenador entra no if
            } else if (dados.cd_funcao == 4) {

                // Verificando se já existe coordenador cadastrado no departamento
                const existeCoordenador = await tabelaDepartamento.findOne({
                    attributes: ['cd_coordenador'],
                    where: {
                        cd_departamento: dados.cd_departamento
                    }
                });

                //Caso exista um coordenador cadastrado no departamento entra
                if (existeCoordenador.cd_coordenador != null) {

                    //Apaga o registro criado na tabela funcionários
                    await tabelaFuncionario.destroy({
                        where: {
                            cd_funcionario: novoFuncionario.cd_funcionario
                        }
                    })

                    //Retorna erro ocorrido
                    return res.status(400).json({
                        success: false,
                        message: "Departamento já possui um coordenador ",
                        erro: 4
                    });

                } else {

                    //Recuperar o código do funcionário na tabela de funcionários pelo cpf
                    await tabelaFuncionario.findOne({

                        attributes: ['cd_funcionario'],
                        where: {
                            cpf: dados.cpf
                        }

                    }).then(async function (coordenador) {
                        //Atualiza o campo cd_coordenador na tabela de departamento de acordo com o departamento
                        await tabelaDepartamento.update({

                            cd_coordenador: coordenador.cd_funcionario

                        },
                            {
                                where: {
                                    cd_departamento: dados.cd_departamento
                                }

                            }).then(async function () {
                                //Caso atualize retorna sucesso
                                return res.status(200).json({
                                    success: true
                                });

                            }).catch(async function (error) {

                                //Caso não atualize retorna erro
                                return res.status(400).json({
                                    success: false,
                                    message: error.message
                                });
                            });

                    }).catch(async function (error) {

                        return res.status(400).json({
                            success: false,
                            message: error.message
                        });
                    });
                }
                //Caso não seja gerente ou coordenador finaliza o cadastro
            } else {

                return res.status(200).json({
                    success: true
                });
            }
            //Caso não consiga criar o registro na base retorna erro
        }).catch(async function (error) {

            return res.status(400).json({
                success: false,
                message: 'Não foi possível cadastrar o usuário ' + error.message,
                erro: 2
            });
        });
    }
}

module.exports = cadastrarUsuario;