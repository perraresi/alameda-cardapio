import "./../styles/admin.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API_URL from "../services/api";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();

  async function fazerLogin(e) {
    e.preventDefault();

    try {
      const resposta = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          senha,
        }),
      });

      const data = await resposta.json();

      if (!resposta.ok) {
        toast.error(data.erro || "Usuário ou senha inválidos");
        return;
      }

      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminLogado", "true");
      localStorage.setItem(
  "adminUsuario",
  JSON.stringify(data.usuario)
);

      toast.success("Login realizado!");

      navigate("/admin/painel");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao fazer login");
    }
  }

  return (
    <div className="admin-page">
      <form className="admin-login-box" onSubmit={fazerLogin}>
        <img
          src="/logo.png"
          alt="Alameda Kennedy"
          className="admin-logo"
        />

        <h1>Painel Admin</h1>

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default AdminLogin;