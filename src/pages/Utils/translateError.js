const erro = (error) => {
    const errorCode = error.code;
    if (errorCode === 'auth/weak-password') { alert('A senha deve possuir no mínimo 6 caracteres') }
    if (errorCode === 'auth/email-already-in-use') { alert('O e-mail informado já está em uso') }
    if (errorCode === 'auth/operation-not-allowed') { alert('Conta não ativada') }
    if (errorCode === 'auth/invalid-email') { alert('Email inválido') }
    if (errorCode === 'auth/user-disabled') { alert('Usuário desabilitado') }
    if (errorCode === 'auth/user-not-found') { alert('Usuário não encontrado') }
    if (errorCode === 'auth/wrong-password') { alert('Senha incorreta') }
}

export default erro
