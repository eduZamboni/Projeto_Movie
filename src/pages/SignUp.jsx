import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    const success = signup(email, password);
    if (success) {
      navigate('/');
    } else {
      alert('Usuário já existe');
    }
  };

  return (
    <div style={{ padding: '100px 20px', color: '#fff' }}>
      <h1>Criar Conta</h1>
      <form onSubmit={handleSignup}>
        <input placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} /><br/>
        <input placeholder="Senha" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} /><br/>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default SignUp;