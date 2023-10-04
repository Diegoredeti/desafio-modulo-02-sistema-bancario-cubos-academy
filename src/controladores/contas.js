const bancoDeDados = require("../bancodedados");


let numeroGeradoConta = 0

const listarContas = (req, res) => {
    const contas = bancoDeDados.contas;
    return res.json(contas);
}

const criarNovaConta = (req,res)=>{
    
    const { nome, email, cpf, data_nascimento, telefone, senha } = req.body
    
    if(!nome || !email || !cpf || !data_nascimento || !telefone || !senha){
        return res.status(400).json({mensagem:"Todos os campos devem ser preenchidos"});
    }
    const conta = JSON.stringify(++numeroGeradoConta)
    const usuario ={
        nome, email, cpf, data_nascimento, telefone
    }
    
    bancoDeDados.contas.push({conta,senha,usuario})

    return res.json({nome,email,cpf,data_nascimento, telefone, senha})
    
}

const atualizarUsuario = (req, res) => {
    const { numeroConta } = req.params;
    const dadosAtualizados = req.body;

    const contaIndex = bancoDeDados.contas.findIndex((conta) => conta.numero === numeroConta);

    if (contaIndex === -1) {
        return res.status(404).json({ mensagem: "Conta não encontrada" });
    }

    if (Object.keys(dadosAtualizados).length === 0) {
        return res.status(400).json({ mensagem: "Não foi informado nenhum campo para atualização" });
    }

    const cpfJaCadastrado = bancoDeDados.contas.some((conta, index) => {
        return index !== contaIndex && conta.usuario.cpf === dadosAtualizados.cpf;
    });

    if (dadosAtualizados.cpf && cpfJaCadastrado) {
        return res.status(400).json({ mensagem: "CPF já cadastrado em outra conta" });
    }

    const emailJaCadastrado = bancoDeDados.contas.some((conta, index) => {
        return index !== contaIndex && conta.usuario.email === dadosAtualizados.email;
    });

    if (dadosAtualizados.email && emailJaCadastrado) {
        return res.status(400).json({ mensagem: "E-mail já cadastrado em outra conta" });
    }

    bancoDeDados.contas[contaIndex].usuario = {
        ...bancoDeDados.contas[contaIndex].usuario,
        ...dadosAtualizados
    };

    return res.status(200).json({ mensagem: "Conta atualizada com sucesso" });
}

const excluirConta = (req, res) => {
    
    const numeroConta = req.params.numeroConta;

    const encontrarConta = bancoDeDados.contas.find(conta => conta.numero === numeroConta);

    if (!encontrarConta) {
        return res.status(404).json({ mensagem: "Conta não encontrada" });
    }

    if (encontrarConta.saldo > 0) {
        return res.status(403).json({ mensagem: "Não é permitido excluir uma conta com saldo positivo" });
    }

    contas = bancoDeDados.contas.filter(conta => conta.numero !== numeroConta);
               
        return res.status(200).json({ mensagem: "Conta excluída com sucesso" });
}






module.exports = {
    listarContas,
    atualizarUsuario,
    excluirConta,
    criarNovaConta
};