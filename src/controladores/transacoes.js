const bancoDeDados = require('../bancodedados');

const depositar = (req, res) => {
    const { numero_conta, valor } = req.body; 

    const conta = bancoDeDados.contas.find((conta) => conta.numero === numero_conta); 
    if (!conta) {
        return res.status(404).json({ mensagem: "Conta não encontrada" });
    }

    if (valor <= 0) {
        return res.status(400).json({ mensagem: "O valor do depósito deve ser maior que zero" });
    }

    conta.saldo += valor; 

    const registroDeposito = {
        data: new Date().toISOString(),
        numero_conta,
        valor
    };

    bancoDeDados.depositos.push(registroDeposito); 
    return res.status(200).json({ mensagem: "Depósito realizado com sucesso" });
};

const sacar = (req, res) => {
    
    const { numero_conta, valor, senha } = req.body;

    const conta = bancoDeDados.contas.find(conta => conta.numero === numero_conta);

    if (!conta) {
        return res.status(404).json({ mensagem: "Conta não encontrada" });
    }

    if (conta.usuario.senha !== senha) {
        return res.status(401).json({ mensagem: "Senha inválida"});
    }

    if (valor <= 0) {
        return res.status(404).json({ mensagem: "O valor do saque deve ser superior a R$ 0"});
    }

    if (valor > conta.saldo) {
        return res.status(404).json({ mensagem: "Saldo insuficiente"});
    }

    conta.saldo -= valor;

    const registrarSaque = {
        data: new Date().toISOString(),
        numero_conta,
        valor
    }

    bancoDeDados.saques.push(registrarSaque);

    return res.status(200).json({ mensagem: "Saque realizado com sucesso"});


};

const transferir = (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

    const contaOrigem = bancoDeDados.contas.find(conta => conta.numero === numero_conta_origem);
    const contaDestino = bancoDeDados.contas.find(conta => conta.numero === numero_conta_destino);

    if (!contaOrigem || !contaDestino) {
        return res.status(404).json({ mensagem: "Conta não encontrada"});
    }

    if (contaOrigem.usuario.senha !== senha) {
        return res.status(401).json({ mensagem: "Senha inválida"});
    }

    if (valor <= 0) {
        return res.status(400).json({ mensagem: "O valor da transferencia deve ser superior a R$ 0"});
    }

    if (valor > contaOrigem.saldo) {
        return res.status(400).json({ mensagem: "Saldo insuficiente"});
    }

    contaOrigem.saldo -= valor;
    contaDestino.saldo += valor;

    const registrarTransferencia = {
        data: new Date().toISOString(),
        numero_conta_origem,
        numero_conta_destino,
        valor
    }

    bancoDeDados.transferencias.push(registrarTransferencia);

    return res.status(200).json({ mensagem: "Transferência realizada com sucesso"});
};

const consultarSaldo = (req, res) => {

    const numero_conta = req.query.numero_conta;

    const conta = bancoDeDados.contas.find(conta => conta.numero === numero_conta);

    if (!conta) {
        return res.status(404).json({ mensagem: "Conta não encontrada"});
    }

    return res.status(200).json({ saldo: conta.saldo});
};

const extrato = (req, res) => {
    const { numero_conta, senha } = req.query; 

    const conta = bancoDeDados.contas.find((conta) => conta.numero === numero_conta); 

    if (!conta) {
        return res.status(404).json({ mensagem: "Conta não encontrada" });
    }

    if (conta.usuario.senha !== senha) {
        return res.status(400).json({ mensagem: "Senha incorreta" });
    }

    const extratoConta = {
        depositos: bancoDeDados.depositos.filter((deposito) => deposito.numero_conta === numero_conta),
        saques: bancoDeDados.saques.filter((saque) => saque.numero_conta === numero_conta),
        transferenciasEnviadas: bancoDeDados.transferencias.filter((transferencia) => transferencia.numero_conta_origem === numero_conta),
        transferenciasRecebidas: bancoDeDados.transferencias.filter((transferencia) => transferencia.numero_conta_destino === numero_conta)
    };

    return res.status(200).json(extratoConta);
};



module.exports = {
    depositar,
    sacar,
    transferir,
    consultarSaldo,
    extrato
}


