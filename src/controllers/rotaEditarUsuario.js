/*Importação das tabelas*/
const tabelaFuncionario = require('../migrations/funcionario');
const tabelaDepartamento = require('../migrations/departamento');

/*Função para atualizar os dados do funcionário na tabela funcionário*/
async function atualizarfuncionario(dados, usuario) {

    //Atualizando tabela de funcionários
    await tabelaFuncionario.update({

        nome: dados.nome,
        sobrenome: dados.sobrenome,
        cd_funcao: dados.funcao,
        cd_departamento: dados.departamento

    },
        {
            where: {
                cd_funcionario: usuario.cd_funcionario
            }

        });
}

/** 
 * LEGENDA DE ERROS:
 * 1- Funcionário não encontrado!
 * 2- Não foi possível atualizar o departamento!
 * 3- Departamento já possui um gerente!
 * 4- Departamento já possui um coordenador!
 * 5- Não foi possível atualizar o funcionário!
  
 * Função para disparar o erro ocorrido **/
function disparaErro(res, codErro) {

    return res.status(400).json({
        success: false,
        erro: codErro
    });
}

/*Função principal para editar o funcionário*/
async function editarUsuario(req, res) {

    //Recuperando dados do formulário vindo do client
    let dados = req.body;

    //Verificando se o funcionário existe na tabela
    await tabelaFuncionario.findOne({

        where: {
            cpf: dados.cpf
        }

    }).then(async function (usuario) {


        //Caso o funcionário seja um gerente e vai mudar de departamento ou função
        if (usuario.cd_funcao == 3) {

            await tabelaDepartamento.update({
                cd_gerente: null
            },
                {
                    where: {
                        cd_departamento: usuario.cd_departamento
                    }
                }).then(function () {

                    //Chamando função para atualizar a tabela funcionario
                    if (atualizarfuncionario(dados, usuario)) {

                        //Caso consiga atualizar retorna sucesso
                        return res.status(200).json({
                            success: true
                        });

                    } else {

                        //Caso não consiga atualizar retorna erro
                        disparaErro(res, 5);

                    }

                }).catch(function (erro) {

                    //Caso não consiga atualizar retorna erro
                    disparaErro(res, 2);

                });

            //Caso o funcionário seja um coordenador e vai mudar de departamento ou função  
        } else if (usuario.cd_funcao == 4) {

            let results = null;

            if (dados.funcao == 3) {

                //Verifica se já existe um gerente cadastrado no departamento
                results = await tabelaDepartamento.findOne({
                    attributes: ['cd_gerente'],
                    where: {
                        cd_departamento: dados.departamento
                    }
                });
            }

            //Se results for nulo entra no if
            if (results == null || results.cd_gerente == null) {

                await tabelaDepartamento.update({
                    cd_coordenador: null,
                    cd_gerente: usuario.cd_funcionario
                },
                    {
                        where: {
                            cd_departamento: dados.departamento
                        }
                    }).then(function () {

                        //Chamando função para atualizar a tabela funcionario
                        if (atualizarfuncionario(dados, usuario)) {

                            //Caso consiga atualizar retorna sucesso
                            return res.status(200).json({
                                success: true
                            });

                        } else {

                            //Caso não consiga atualizar retorna erro
                            disparaErro(res, 5);
                        }
                    }).catch(function (erro) {

                        //Caso não consiga atualizar retorna erro
                        disparaErro(res, 2);

                    });
                //Se results não for nulo entra no else
            } else {

                //Caso já exista um gerente cadastrado retorna erro
                disparaErro(res, 3);

            }

            //Caso o funcionário não seja um gerente ou coordenador e vai ser um dos dois. Ex: Saiu de Analista para gerente 
        } else {

            //Caso a nova funçao seja gerente entra no if
            if (dados.funcao == 3) {

                //Verifica se já existe um gerente cadastrado no departamento
                const results = await tabelaDepartamento.findOne({
                    attributes: ['cd_gerente'],
                    where: {
                        cd_departamento: dados.departamento
                    }
                });
                console.log('resuultados:' + results);
                //Se results for nulo entra no if
                if (results.cd_gerente == null) {

                    //Atualizando o campo cd_gerente com o código do funcionário
                    await tabelaDepartamento.update({
                        cd_gerente: usuario.cd_funcionario
                    },
                        {
                            where: {
                                cd_departamento: dados.departamento
                            }

                        }).then(function () {

                            //Chamando função para atualizar a tabela funcionario
                            if (atualizarfuncionario(dados, usuario)) {

                                //Caso consiga atualizar retorna sucesso
                                return res.status(200).json({
                                    success: true
                                });

                            } else {

                                //Caso não consiga atualizar retorna erro
                                disparaErro(res, 5);

                            }

                        }).catch(function (erro) {

                            //Caso não consiga atualizar retorna erro
                            disparaErro(res, 2);

                        });

                    //Se results não for nulo entra no else
                } else {

                    //Caso já exista um gerente cadastrado retorna erro
                    disparaErro(res, 3);

                }

                //Caso a nova funçao seja coordenador entra no else
            } else if (dados.funcao == 4) {

                //Verifica se já existe um coordenador cadastrado no departamento
                const results = await tabelaDepartamento.findOne({
                    attributes: ['cd_coordenador'],
                    where: {
                        cd_departamento: usuario.cd_departamento
                    }
                });

                //Se results for nulo entra no if
                if (results.cd_coordenador == null) {

                    //Atualizando o campo cd_coordenador com o código do funcionário
                    await tabelaDepartamento.update({
                        cd_coordenador: usuario.cd_funcionario
                    },
                        {
                            where: {
                                cd_departamento: dados.departamento
                            }
                        }).then(function () {

                            //Chamando função para atualizar a tabela funcionario
                            if (atualizarfuncionario(dados, usuario)) {

                                //Caso consiga atualizar retorna sucesso
                                return res.status(200).json({
                                    success: true
                                });

                            } else {

                                //Caso não consiga atualizar retorna erro
                                disparaErro(res, 5);

                            }

                        }).catch(function (erro) {

                            //Caso não consiga atualizar retorna erro
                            disparaErro(res, 2);

                        });

                    //Se results não for nulo entra no else
                } else {

                    //Caso já exista um coordenador cadastrado retorna erro
                    disparaErro(res, 4);
                }
                //Caso o funcionário não seja um gerente ou coordenador e vai ser um dos dois. Ex: Saiu de Desenvolvedor para Analista 
            } else {

                //Chamando função para atualizar a tabela funcionario
                if (atualizarfuncionario(dados, usuario)) {

                    //Caso consiga atualizar retorna sucesso
                    return res.status(200).json({
                        success: true
                    });

                } else {

                    //Caso não consiga atualizar retorna erro
                    disparaErro(res, 5);

                }
            }
        }
    }).catch(function (erro) {
        disparaErro(res, 1);
    });
}

module.exports = editarUsuario;