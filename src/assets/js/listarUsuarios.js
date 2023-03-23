const options = { method: 'GET' };

let funcao = localStorage.getItem('funcao');
let departamento = localStorage.getItem('departamento');

fetch('http://localhost:5500/listar-usuario/' + funcao + '/' + departamento, options)
    .then(response => response.json())
    .then(async response => {

        if(funcao != 1){
            document.getElementById('btnCadFuncionario').setAttribute('disabled', '');
        }

        //Caso não possua funcionários para visualizar apresenta erro e retorna para o index.
        if (response.funcionarios == '' && funcao != 1) {

            await Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Nenhum funcionário para visualização!'
            });

            //Redirecionando para a página de gerenciamento de usuário
            window.location.href = "/index.html";

        } else {

            // Dados para popular a tabela
            const funcionarios = [];

            // Percorrendo o objeto response.funcionarios e atribuindo um array dentro do array funcionarios
            for (let i = 0; i < response.funcionarios.length; i++) {

                funcionarios[i] = [response.funcionarios[i].cd_funcionario, response.funcionarios[i].nome, response.funcionarios[i].sobrenome,
                response.funcionarios[i].cpf, response.funcionarios[i].nm_funcao, response.funcionarios[i].nm_departamento, response.funcionarios[i].cd_funcao, response.funcionarios[i].cd_departamento]

            }

            // Função para criar uma Tag Ex: <tr>, <td>
            function criarTag(elemento) {
                return document.createElement(elemento);
            }

            // Criando a tabela
            let tabela = document.getElementById("tableGerenciarUsuario");
            let thead = criarTag("thead");
            let tbody = criarTag("tbody");

            let indicesTabela = ["Matricula", "Nome", "Sobrenome", "CPF", "Função", "Departamento", "", ""];
            let linhaHead = criarTag("tr");

            // Função para criar uma celula Ex <th> + o texto
            function criarCelula(tag, text) {
                tag = criarTag(tag);
                tag.textContent = text;
                return tag;
            }

            // Percorrendo o indice das tabelas e atribuindo a tag <thead>
            for (let j = 0; j < indicesTabela.length; j++) {
                let th = criarCelula("th", indicesTabela[j]);
                linhaHead.appendChild(th);
            }
            thead.appendChild(linhaHead);

            // Percorrendo os dados e atribuindo as colunas e adicionando em cada linha
            for (let j = 0, linhaBody = ''; j < funcionarios.length; j++) {

                linhaBody = criarTag("tr");
                if (j % 2 != 0) {
                    linhaBody.setAttribute("class", "table-active");
                }

                for (let i = 0, cel = ''; i < funcionarios[j].length - 2; i++) {
                    cel = criarCelula("td", funcionarios[j][i]);
                    linhaBody.appendChild(cel);
                }

                let tagSpanGerenciarUsuario = criarTag("img");
                tagSpanGerenciarUsuario.setAttribute('src', "https://cdn-icons-png.flaticon.com/24/2521/2521856.png");
                tagSpanGerenciarUsuario.setAttribute('id', "btnGerenciarUsuario");

                // Criando o botão Gerenciar Usuário
                let btnGerenciarUsuario = document.createElement('button');
                btnGerenciarUsuario.type = 'button';
                btnGerenciarUsuario.innerHTML = 'Editar';
                btnGerenciarUsuario.appendChild(tagSpanGerenciarUsuario);
                btnGerenciarUsuario.className = 'btn btn-dark botoes';
                btnGerenciarUsuario.setAttribute('data-toggle', 'modal');
                btnGerenciarUsuario.setAttribute('data-target', '#formGerenciarFuncionario');
                btnGerenciarUsuario.setAttribute('onclick', "editarFuncionario(" + "'" + funcionarios[j][1] + "'," + "'" + funcionarios[j][2] + "'," + "'" + funcionarios[j][3] + "'," + "'" + funcionarios[j][6] + "'," + "'" + funcionarios[j][7] + "'" + ")");

                //Criando mais uma celula no final da linha e adicionando o Gerenciar Usuário
                let gerenciarUsuario = linhaBody.insertCell();
                gerenciarUsuario.appendChild(btnGerenciarUsuario);
                tbody.appendChild(linhaBody);

                let tagSpanBuscarHierarquia = criarTag("img");
                tagSpanBuscarHierarquia.setAttribute('src', "https://cdn-icons-png.flaticon.com/24/162/162705.png");
                tagSpanBuscarHierarquia.setAttribute('id', "btnBuscarHierarquia");

                // Criando o botão Buscar Hierarquia
                let btnBuscarHierarquia = document.createElement('button');
                btnBuscarHierarquia.type = 'button';
                btnBuscarHierarquia.innerHTML = 'Hierarquia';
                btnBuscarHierarquia.appendChild(tagSpanBuscarHierarquia);
                btnBuscarHierarquia.className = 'btn btn-info botoes';
                btnBuscarHierarquia.setAttribute('data-toggle', 'modal');
                btnBuscarHierarquia.setAttribute('data-target', '#formBuscarHierarquia');
                btnBuscarHierarquia.setAttribute('onclick', "buscarHierarquia(" + "'" + funcionarios[j][0] + "'," + "'" + funcionarios[j][5] + "'," + "'" + funcionarios[j][7] + "')");

                //Criando mais uma celula no final da linha e adicionando Buscar Hierarquia
                let buscarHierarquia = linhaBody.insertCell();
                buscarHierarquia.appendChild(btnBuscarHierarquia);
                tbody.appendChild(linhaBody);
            }

            // Atribuindo as tags da tabela na tag <table>
            tabela.appendChild(thead);
            tabela.appendChild(tbody);


            // Pesquisa dinâmica
            document.getElementById("inputPesquisa").addEventListener("keyup", function () {

                let tbody = document.querySelector('tbody')
                let busca = document.getElementById("inputPesquisa").value.toLowerCase();

                // Percorrendo as linhas do body para encontrar um valor
                for (let i = 0; i < tbody.childNodes.length; i++) {

                    let achou = false;
                    let tr = tbody.childNodes[i];
                    let td = tr.childNodes;

                    // Percorrendo as colunas do body para encontrar um valor
                    for (let j = 0; j < 6; j++) {
                        let value = td[j].childNodes[0].nodeValue.toLowerCase();

                        if (value.indexOf(busca) >= 0) {
                            achou = true;
                        }
                    }

                    // Se encontrar, adicionar a classe "table-row" para exibir as linhas da pesquisa
                    if (achou) {
                        tr.style.display = "table-row";
                    }
                    // Se não encontrar, adicionar a classe "none" para esconder as linhas
                    else {
                        tr.style.display = "none";
                    }
                }
            })
        }
    })
    .catch(err => console.error(err));