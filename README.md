# Sistema-Bancario
Esse projeto foi o desafio do modulo 2 da Cubos Academy que teve como objetivo construir uma RESTful API que permita:

- Listagem de contas bancárias
- Criar conta bancária
- Atualizar os dados do usuário da conta bancária
- Excluir uma conta bancária
- Depositar em uma conta bancária
- Sacar de uma conta bancária
- Transferir valores entre contas bancárias
- Consultar saldo da conta bancária
- Emitir extrato bancário

A API foi criada para que seja possível criar contas, mediante a senha principal do banco, atualizar dados do usuário, deletar e listar, seguindo o sistema CRUD.

Da parte de transações, foi criado funções para Depositar, Transferir, Sacar, Verificar Saldo e exibir extrado.

API está rodando com o arquivo "bancodedados.js" para guardar os dados, futuramente será implementado o banco de dados.

Para iniciar o projeto, rode o "npm run dev" para inicializar a aplicação e utilize o Insomnia para realizar as requisições HTTP para as rotas descritas no arquivo rotas.js
