function buscarHierarquia(codigoFuncionario, nomeDepartamento, departamento) {

    const options = { method: 'GET' };

    fetch('http://localhost:5500/buscar-hierarquia/' + departamento, options)
        .then(response => response.json())
        .then(async response => {

            // Dados para popular o container
            const equipe = response.equipe;

            //Recuperando divs que vao receber cada informação pelo id
            const listContainerHeading = document.getElementById('listheadingHierarquia');
            const listContainerEquipe = document.getElementById('listEquipe');
            const listContainerCoordenador = document.getElementById('listCoordenador');
            const listContainerGerente = document.getElementById('listGerente');
            const listContainerDiretor = document.getElementById('listDiretor');
            const containerLinhaHorizontal = document.getElementById('linhaHorizontal');
            containerLinhaHorizontal.innerHTML = '';

            //Varíaveis que vao receber as listas com os dados de cada funcionário da hierarquia
            let listHeading = `<h3 class="headings" id="headingHierarquia">Visão Organizacional - ` + nomeDepartamento + `</h3>`;
            let linhaHorizontal = `<hr style="background-color: lightseagreen; margin-left: 40px; margin-right: 40px;">`
            let criarLinhaHorizontal = 0;

            let listEquipe = '';
            let listCoordenador = '';
            let listGerente = '';
            let listDiretor = '';

            for (let i = 0; i < equipe.length; i++) {

                switch (equipe[i].cd_funcao) {

                    case 2:

                        if (equipe[i].cd_funcionario == codigoFuncionario) {

                            listDiretor += `<div class="">
                                                <div class="col-md-12 cardFuncionarios" id="cardDiretor" style="border: 2px solid #7F86FF;">
                                                    <p class="card-text funcoes">${equipe[i].nome} ${equipe[i].sobrenome} <br>(${equipe[i].nm_funcao})</p>
                                                </div>            
                                            </div>`;

                        } else {
                            listDiretor += `<div class="">
                                                <div class="col-md-12 cardFuncionarios" id="cardDiretor">
                                                    <p class="card-text funcoes">${equipe[i].nome} ${equipe[i].sobrenome} <br>(${equipe[i].nm_funcao})</p>
                                                </div>            
                                            </div>`;
                        }

                        break;

                    case 3:

                        if (equipe[i].cd_funcionario == codigoFuncionario) {

                            listGerente += `<div class="">
                                                <hr class="linhaVertical" style="background-color: lightseagreen;">    
                                                <div class="col-md-12 cardFuncionarios" id="cardGerente" style="border: 2px solid #7F86FF;">
                                                    <p class="card-text funcoes">${equipe[i].nome} ${equipe[i].sobrenome} <br>(${equipe[i].nm_funcao})</p>
                                                </div>            
                                            </div>`;

                        } else {

                            listGerente += `<div class="">
                                                <hr class="linhaVertical" style="background-color: lightseagreen;">    
                                                <div class="col-md-12 cardFuncionarios" id="cardGerente">
                                                    <p class="card-text funcoes">${equipe[i].nome} ${equipe[i].sobrenome} <br>(${equipe[i].nm_funcao})</p>
                                                </div>            
                                            </div>`;
                        }

                        break;

                    case 4:

                        if (equipe[i].cd_funcionario == codigoFuncionario) {

                            listCoordenador += `<div class="">
                                                    <hr class="linhaVertical" style="background-color: lightseagreen;">    
                                                    <div class="col-md-12 cardFuncionarios" id="cardCoordenador" style="border: 2px solid #7F86FF;">
                                                        <p class="card-text funcoes">${equipe[i].nome} ${equipe[i].sobrenome} <br>(${equipe[i].nm_funcao})</p>
                                                    </div>    
                                                    <hr class="linhaVertical" style="background-color: lightseagreen;">            
                                                </div>`;

                        } else {

                            listCoordenador += `<div class="">
                                                    <hr class="linhaVertical" style="background-color: lightseagreen;">    
                                                    <div class="col-md-12 cardFuncionarios" id="cardCoordenador">
                                                        <p class="card-text funcoes">${equipe[i].nome} ${equipe[i].sobrenome} <br>(${equipe[i].nm_funcao})</p>
                                                    </div>    
                                                    <hr class="linhaVertical" style="background-color: lightseagreen;">            
                                                </div>`;
                        }

                        break;

                    default:

                        if (criarLinhaHorizontal == 0) {
                            criarLinhaHorizontal = 1;
                        }

                        if (equipe[i].cd_funcionario == codigoFuncionario) {

                            listEquipe += `<div class="row divFuncionarios"> 
                                                <div class="col-md-12 cardFuncionarios" id="cardEquipe" style="border: 2px solid #7F86FF;">
                                                    <p class="card-text funcoes">${equipe[i].nome} ${equipe[i].sobrenome}</p>
                                                </div>            
                                            </div>`;

                        } else {
                            listEquipe += `<div class="row divFuncionarios"> 
                                            <div class="col-md-12 cardFuncionarios" id="cardEquipe">
                                                <p class="card-text funcoes">${equipe[i].nome} ${equipe[i].sobrenome}</p>
                                            </div>            
                                        </div>`;
                        }

                }

            }

            listContainerHeading.innerHTML = listHeading;
            listContainerDiretor.innerHTML = listDiretor;
            listContainerGerente.innerHTML = listGerente;
            listContainerCoordenador.innerHTML = listCoordenador;
            listContainerEquipe.innerHTML = listEquipe;

            if (criarLinhaHorizontal == 1) {

                criarLinhaHorizontal = 0;
                containerLinhaHorizontal.innerHTML = linhaHorizontal;

            }

        })
        .catch(err => console.error(err));
}