import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      navigate('/');
    } else {
      alert('Credenciais inválidas');
    }
  };

  return (
    <div style={{ padding: '100px 20px', color: '#fff' }}>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} /><br/>
        <input placeholder="Senha" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} /><br/>
        <button type="submit">Entrar</button>
      </form>
      <p>Não tem uma conta? <Link to="/signup">Criar conta</Link></p>
    </div>
  );
}

export default SignIn;