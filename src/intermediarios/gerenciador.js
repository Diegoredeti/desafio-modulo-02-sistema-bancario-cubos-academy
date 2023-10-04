const { globalTestSenhaContaUser } = require("./intermediarios")

validaCriacaoUsuario =(req,res,next)=>{
    const {cpf,email} = req.body
    const testaEmailCPF = globalTestSenhaContaUser(req,res,cpf,email)
    
    if(testaEmailCPF.statusCode !== 403)
        next()
}

module.exports = {validaCriacaoUsuario}