//Escutando click do botão btnExcluirFuncionario
document.getElementById('btnExcluirFuncionario')
    .addEventListener('click', function () {

        //Recuperando valores do formulário
        let cpf = document.getElementById('cpfFuncionario').value;
        let funcao = document.getElementById('funcaoFuncionario').value;
        let departamento = document.getElementById('departamentoFuncionario').value;

        //Mensagem para confirmar se o usuario quer realmente excluir o funcionário
        Swal.fire({
            title: 'Você quer realmente excluir esse funcionário?',
            text: 'Após a confirmação não será mais possível recuperar seus dados.',
            showDenyButton: true,
            confirmButtonText: 'Excluir',
            denyButtonText: 'Cancelar',
        }).then(async (result) => {

            //Caso o usuario clica em excluir chama a rota para excluir o funcionário
            if (result.isConfirmed) {

                const options = {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({

                        cpf,
                        funcao,
                        departamento

                    })
                };

                fetch('http://localhost:5500/excluir-usuario', options)
                    .then(response => response.json())
                    .then(async response => {

                        if (response.success) {
                            await Swal.fire('Funcionário excluido com sucesso!', '', 'success');
                            location.reload();
                        } else {
                            Swal.fire('Não foi possível excluir o funcionário!', '', 'error');
                        }
                    })
                    .catch(err => console.error(err));

            } else {
                Swal.fire('Funcionário não excluido!', 'Obrigado por continuar conosco', 'info');
            }
        })
    });