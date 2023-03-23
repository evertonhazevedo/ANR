//Função para recuperar os dados do funcionário selcionado e jogar no formulário
function editarFuncionario(nome, sobrenome, cpf, funcao, departamento) {

    document.getElementById('nomeFuncionario').value = nome;
    document.getElementById('sobrenomeFuncionario').value = sobrenome;
    document.getElementById('cpfFuncionario').value = cpf;
    document.getElementById('funcaoFuncionario').value = funcao;
    document.getElementById('departamentoFuncionario').value = departamento;

}

//Função para chamar rota de edição do usuário
document.getElementById('btnEditarFuncionario')
    .addEventListener('click', function () {

        let nome = document.getElementById('nomeFuncionario').value;
        let sobrenome = document.getElementById('sobrenomeFuncionario').value;
        let cpf = document.getElementById('cpfFuncionario').value;
        let funcao = document.getElementById('funcaoFuncionario').value;
        let departamento = document.getElementById('departamentoFuncionario').value;

        const options = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nome,
                sobrenome,
                cpf,
                funcao,
                departamento
            })
        };

        fetch('http://localhost:5500/editar-usuario', options)
            .then(response => response.json())
            .then(async response => {

                //Caso retorne true os dados foram salvos com sucesso
                if (response.success == true) {

                    await Swal.fire('Dados atualizados com sucesso!', '', 'success');
                    location.reload();

                    //Caso retorne false os dados nao foram salvos   
                } else {

                    switch (response.erro) {
                        case 1:

                            await Swal.fire('Funcionário não encontrado!', '', 'error');

                            break;

                        case 2:

                            await Swal.fire('Não foi possível atualizar o departamento!', '', 'error');

                            break;

                        case 3:

                            await Swal.fire('Departamento já possui um gerente!', '', 'error');

                            break;

                        case 4:

                            await Swal.fire('Departamento já possui um coordenador!', '', 'error');

                            break;

                        default:

                            await Swal.fire('Não foi possível atualizar o funcionário!', '', 'error');

                            break;
                    }
                }
            })
            .catch(err => console.error(err));
    });
