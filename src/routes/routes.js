const express = require('express');
const router = express.Router();

/*Importação das funções executadas em cada rota*/
const cadastrarUsuario = require('../controllers/rotaCadastrarUsuario');
const listarUsuario = require('../controllers/rotaListarUsuarios');
const excluirUsuario = require('../controllers/rotaExcluirUsuario');
const editarUsuario = require('../controllers/rotaEditarUsuario');
const buscarHierarquia = require('../controllers/rotaBuscarHierarquia');

/*Rota que chamar a função cadastrarUsuario*/
router.post('/cad-usuario', cadastrarUsuario);

/*Rota que chamar a função listarUsuario*/
router.get('/listar-usuario/:funcao/:departamento', listarUsuario);

/*Rota que chamar a função excluirUsuario*/
router.delete('/excluir-usuario', excluirUsuario);

/*Rota que chamar a função editarUsuario*/
router.put('/editar-usuario', editarUsuario);

/*Rota que chamar a função buscarHierarquia*/
router.get('/buscar-hierarquia/:departamento', buscarHierarquia);

module.exports = router;