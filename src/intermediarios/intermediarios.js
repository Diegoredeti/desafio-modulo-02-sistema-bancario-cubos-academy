const bancodedados = require('../bancodedados');

const validarSenha = (req, res, next) => {
    const senhaRecebida = req.query.senha_banco;
 
    if (!senhaRecebida || senhaRecebida !== bancodedados.banco.senha) {
        return res.status(401).json({ mensagem: "Senha incorreta" });
    }
    next();
}

const globalTestSenhaContaUser=(req,res,cpf,email,conta,senha)=>{
    const buscaConta = bancodedados.contas.find(contas => contas.conta === conta)
    const buscaCPF = bancodedados.contas.find(contas => contas.usuario.cpf === cpf)
    const buscaEmail = bancodedados.contas.find(contas => contas.usuario.email === email)
    if(buscaCPF || buscaEmail){
        return res.status(403).json({mensagem:"Email ou CPF já cadastrados"});
    }
    if(conta){
        if(!buscaConta){
            return res.status(404).json({mensagem:"Conta não encontrada"});
        }
        if(buscaConta.senha !== senha){
            return res.status(403).json({mensagem:"Senha incorreta"});
        }
    }

    return res.status(200)
}

module.exports = {
    validarSenha,
    globalTestSenhaContaUser
};
