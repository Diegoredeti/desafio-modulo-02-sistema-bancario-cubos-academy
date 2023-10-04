const express = require('express');
const { listarContas, atualizarUsuario, excluirConta, criarNovaConta } = require('./controladores/contas');
const { depositar, sacar, transferir, consultarSaldo, extrato } = require('./controladores/transacoes');
const { validarSenha } = require('./intermediarios/intermediarios');
const { validaCriacaoUsuario } = require('./intermediarios/gerenciador');



const rotas = express();

rotas.get('/contas', validarSenha, listarContas);
rotas.post('/contas', validaCriacaoUsuario,criarNovaConta );
rotas.put('/contas/:numeroConta/usuario', atualizarUsuario);
rotas.delete('/contas/:numeroConta', excluirConta);
rotas.post('/transacoes/depositar', depositar);
rotas.post('/transacoes/sacar', sacar);
rotas.post('/transacoes/transferir', transferir);
rotas.get('/transacoes/consultarSaldo', consultarSaldo);
rotas.get('/transacoes/extrato', extrato);




module.exports = rotas;
