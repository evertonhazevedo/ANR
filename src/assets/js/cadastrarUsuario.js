/*Cadastrar Usuário*/
document.getElementById('btnCadastrarFuncionario')
    .addEventListener('click', function () {

        let nome = document.getElementById('cadNomeFuncionario').value;
        let sobrenome = document.getElementById('cadSobrenomeFuncionario').value;
        let cpf = document.getElementById('cadCpfFuncionario').value;
        let cd_funcao = document.getElementById('cadFuncaoFuncionario').value;
        let cd_departamento = document.getElementById('cadDepartamentoFuncionario').value;

        //validando o campo nome e sobrenome
        if (nome == "" || nome == undefined || sobrenome == "" || sobrenome == undefined || cpf == "" || cpf == undefined) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Favor preencha todos os campos!'
            });

        } else {

            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nome,
                    sobrenome,
                    cpf,
                    cd_funcao,
                    cd_departamento
                })
            };

            fetch('http://localhost:5500/cad-usuario', options)
                .then(response => response.json())
                .then(async response => {

                    if (response.success == false) {

                        switch (response.erro) {
                            case 1:

                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'Funcionário já cadastrado!'
                                });

                                break;

                            case 2:

                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'Não possível cadastrar o funcionário!'
                                });

                                break;

                            case 3:


                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'Departamento já possui um gerente!'
                                });

                                break;

                            default:

                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'Departamento já possui um coordenador!'
                                });

                                break;
                        }

                    } else {

                        const Toast = Swal.mixin({
                            position: 'center',
                            showConfirmButton: true
                        })

                        await Toast.fire({
                            icon: 'success',
                            title: 'Funcionário cadastrado com sucesso!'
                        })

                        //Recarregando a página
                        location.reload();

                    }
                })
                .catch(err => console.error(err));
        }
    });