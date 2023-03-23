/*Autenticação do Usuário*/
document.getElementById('btnEntrar')
    .addEventListener('click', async function () {

        //Pegando valores dos campos email e senha do formulário
        let funcao = document.getElementById('funcaoFuncionarioLogin').value;
        let departamento = document.getElementById('departamentoFuncionarioLogin').value;

        localStorage.setItem("funcao", funcao);
        localStorage.setItem("departamento", departamento);

        await Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            icon: 'success',
            title: 'Logado com sucesso'
        })

        //Redirecionando para a página de gerenciamento de usuário
        window.location.href = "/src/views/gerenciarUsuario.html";

    });