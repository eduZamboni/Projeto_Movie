import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  Snackbar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Close } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useAuth } from "../contexts/AuthContext";

function Profile() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [email, setEmail] = useState(localStorage.getItem("userEmail") || "");
  const [birthDate, setBirthDate] = useState<Dayjs | null>(
    localStorage.getItem("birthDate") ? dayjs(localStorage.getItem("birthDate")) : null
  );
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [showChangePass, setShowChangePass] = useState(false);
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  if (!user) {
    return <p style={{color:'#fff', padding:'100px 20px'}}>Você precisa estar logado.</p>;
  }

  const handleSaveProfile = () => {
    if (!email) {
      alert("E-mail é obrigatório.");
      return;
    }

    localStorage.setItem("userEmail", email);
    if (birthDate) {
      localStorage.setItem("birthDate", birthDate.toISOString());
    }

    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleChangePassword = () => {
    if (newPass !== confirmPass) {
      alert("As senhas não são iguais.");
      return;
    }
    const stored = localStorage.getItem('users');
    let users = stored ? JSON.parse(stored) : [];
    const idx = users.findIndex(u => u.email === user.email);
    if (idx === -1) {
      alert("Usuário não encontrado.");
      return;
    }
    if (users[idx].password !== oldPass) {
      alert("Senha antiga incorreta.");
      return;
    }
    users[idx].password = newPass;
    localStorage.setItem('users', JSON.stringify(users));
    alert("Senha alterada com sucesso!");
    setShowChangePass(false);
  };

  return (
    <Container className="profile-page" maxWidth="sm" style={{padding:'100px 20px', color:'#fff'}}>
      <Typography variant="h4" component="h1" gutterBottom>
        Perfil do Usuário
      </Typography>
      <TextField
        label="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <DatePicker
        label="Data de Nascimento do Bebê"
        value={birthDate}
        onChange={(newValue) => setBirthDate(newValue)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSaveProfile}
        style={{ marginRight: "10px", marginTop: "20px" }}
      >
        Salvar
      </Button>
      <Button variant="outlined" onClick={() => navigate("/")}>
        Voltar para Home
      </Button>

      <Button variant="contained" color="secondary" onClick={() => setShowChangePass(true)} style={{ marginTop: "20px" }}>
        Alterar Senha
      </Button>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="Perfil salvo com sucesso!"
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
            <Close fontSize="small" />
          </IconButton>
        }
      />

      <Dialog open={showChangePass} onClose={() => setShowChangePass(false)}>
        <DialogTitle>Alterar Senha</DialogTitle>
        <DialogContent>
          <TextField
            label="Senha Antiga"
            type="password"
            value={oldPass}
            onChange={(e) => setOldPass(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Nova Senha"
            type="password"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Confirmar Nova Senha"
            type="password"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowChangePass(false)}>Cancelar</Button>
          <Button onClick={handleChangePassword} variant="contained" color="primary">Salvar</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Profile;