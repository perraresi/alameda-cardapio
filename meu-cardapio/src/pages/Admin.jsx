import "./../styles/admin.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API_URL from "../services/api";

function Admin() {
  const [produtos, setProdutos] = useState([]);
  const [produtoEditando, setProdutoEditando] = useState(null);
  const [novoProduto, setNovoProduto] = useState(null);
  const [ordenacao, setOrdenacao] = useState("nome-az");
  const [categoriaFiltro, setCategoriaFiltro] = useState("TODAS");
  const [busca, setBusca] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [novaCategoria, setNovaCategoria] = useState("");
  const [modalCategoria, setModalCategoria] = useState(false);
  const [modalAdmins, setModalAdmins] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [novoAdmin, setNovoAdmin] = useState({
  nome: "",
  email: "",
  senha: "",
});

const adminUsuario = JSON.parse(
  localStorage.getItem("adminUsuario")
);

const isSuperAdmin = adminUsuario?.tipo === "superadmin";

  const navigate = useNavigate();

  useEffect(() => {
    const logado = localStorage.getItem("adminLogado");

    if (logado !== "true") {
      navigate("/admin");
    }
  }, [navigate]);

  useEffect(() => {
    fetch(`${API_URL}/produtos?admin=true`)
      .then((res) => res.json())
      .then((data) => setProdutos(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
  fetch(`${API_URL}/categorias`)
    .then((res) => res.json())
    .then((data) => setCategorias(data))
    .catch((err) => console.error(err));
}, []);

function getAuthHeaders() {
  const token = localStorage.getItem("adminToken");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

async function buscarAdmins() {
  try {
    const resposta = await fetch(`${API_URL}/admins`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    });

    const data = await resposta.json();

    setAdmins(data);
  } catch (error) {
    console.error(error);
    toast.error("Erro ao buscar admins");
  }
}

  async function salvarProduto() {
    try {
      await fetch(
        `${API_URL}/produtos/${produtoEditando.id}`,
        {
          method: "PUT",

headers: getAuthHeaders(),

          body: JSON.stringify(produtoEditando),
        }
      );

      toast.success("Produto atualizado!");

      const novosProdutos = produtos.map((produto) => {
        if (produto.id === produtoEditando.id) {
          return produtoEditando;
        }

        return produto;
      });

      setProdutos(novosProdutos);

      setProdutoEditando(null);
    } catch (error) {
      console.error(error);
    }
  }

  async function excluirProduto(produto) {
    const confirmar = confirm(
      `Tem certeza que deseja excluir "${produto.nome}"?`
    );

    if (!confirmar) return;

    try {
await fetch(`${API_URL}/produtos/${produto.id}`, {
  method: "DELETE",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
  },
});

      setProdutos(
        produtos.filter(
          (item) => item.id !== produto.id
        )
      );

      toast.success("Produto excluído!");
    } catch (error) {
      console.error(error);

      toast.error("Erro ao excluir produto");
    }
  }

  async function alternarDisponibilidade(produto) {
    const produtoAtualizado = {
      ...produto,
      disponivel: !produto.disponivel,
    };

    try {
      await fetch(
        `${API_URL}/produtos/${produto.id}`,
        {
          method: "PUT",

headers: getAuthHeaders(),

          body: JSON.stringify(produtoAtualizado),
        }
      );

      setProdutos(
        produtos.map((item) =>
          item.id === produto.id
            ? produtoAtualizado
            : item
        )
      );
    } catch (error) {
      console.error(error);

      toast.error("Erro ao alterar disponibilidade");
    }
  }

  async function adicionarProduto() {
    try {
      const resposta = await fetch(
        `${API_URL}/produtos`,
        {
          method: "POST",

headers: getAuthHeaders(),

          body: JSON.stringify(novoProduto),
        }
      );

      const data = await resposta.json();

      const produtoCriado = {
        ...novoProduto,
        id: data.id,
      };

      setProdutos([
        ...produtos,
        produtoCriado,
      ]);

      setNovoProduto(null);

      toast.success("Produto adicionado!");
    } catch (error) {
      console.error(error);
    }
  }

async function enviarImagem(arquivo, tipo) {
  if (!arquivo) return;

  const formData = new FormData();
  formData.append("imagem", arquivo);

  try {
    const resposta = await fetch(`${API_URL}/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
      body: formData,
    });

    const data = await resposta.json();

    if (!resposta.ok) {
      toast.error(data.erro || "Erro ao enviar imagem");
      return;
    }

    if (tipo === "novo") {
      setNovoProduto({
        ...novoProduto,
        imagem: data.url,
      });
    }

    if (tipo === "editar") {
      setProdutoEditando({
        ...produtoEditando,
        imagem: data.url,
      });
    }

    toast.success("Imagem enviada!");
  } catch (error) {
    console.error(error);
    toast.error("Erro ao enviar imagem");
  }
}

function sair() {
  localStorage.removeItem("adminLogado");
  localStorage.removeItem("adminToken");

  window.location.href = "/admin";
}

const categoriasAdmin = [
  "TODAS",
  ...categorias.map((categoria) => categoria.nome),
];

const produtosFiltradosBusca = produtos.filter((produto) => {
  const termo = busca.toLowerCase();

  return (
    produto.nome.toLowerCase().includes(termo) ||
    produto.categoria.toLowerCase().includes(termo) ||
    produto.descricao.toLowerCase().includes(termo)
  );
});

const produtosFiltradosAdmin =
  categoriaFiltro === "TODAS"
    ? produtosFiltradosBusca
    : produtosFiltradosBusca.filter(
        (produto) => produto.categoria === categoriaFiltro
      );


const produtosOrdenados = [...produtosFiltradosAdmin].sort((a, b) => {
  if (ordenacao === "nome-az") {
    return a.nome.localeCompare(b.nome, "pt-BR");
  }

  if (ordenacao === "nome-za") {
    return b.nome.localeCompare(a.nome, "pt-BR");
  }

  if (ordenacao === "preco-menor") {
    return Number(a.preco) - Number(b.preco);
  }

  if (ordenacao === "preco-maior") {
    return Number(b.preco) - Number(a.preco);
  }

  return 0;
});

async function adicionarCategoria() {
  if (!novaCategoria.trim()) {
    toast.error("Digite o nome da categoria");
    return;
  }

  try {
    const resposta = await fetch(`${API_URL}/categorias`, {
      method: "POST",
  
      headers: getAuthHeaders(),
      body: JSON.stringify({
        nome: novaCategoria,
      }),
    });

    const data = await resposta.json();

    const categoriaCriada = {
      id: data.id,
      nome: novaCategoria.toUpperCase(),
    };

    setCategorias([...categorias, categoriaCriada]);

    setNovaCategoria("");
    setModalCategoria(false);

    toast.success("Categoria adicionada!");
  } catch (error) {
    console.error(error);
    toast.error("Erro ao adicionar categoria");
  }
}

async function criarAdmin() {
  if (!novoAdmin.nome || !novoAdmin.email || !novoAdmin.senha) {
    toast.error("Preencha todos os campos");
    return;
  }

  try {
    const resposta = await fetch(`${API_URL}/admins`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(novoAdmin),
    });

    const data = await resposta.json();

    if (!resposta.ok) {
      toast.error(data.erro || "Erro ao criar admin");
      return;
    }

    setAdmins([
      ...admins,
      {
        id: data.id,
        nome: novoAdmin.nome,
        email: novoAdmin.email,
        ativo: 1,
      },
    ]);

    setNovoAdmin({
      nome: "",
      email: "",
      senha: "",
    });

    toast.success("Admin criado!");
  } catch (error) {
    console.error(error);
    toast.error("Erro ao criar admin");
  }
}

async function desativarAdmin(admin) {
  const confirmar = confirm(
    `Tem certeza que deseja desativar "${admin.nome}"?`
  );

  if (!confirmar) return;

  try {
    const resposta = await fetch(
      `${API_URL}/admins/${admin.id}/desativar`,
      {
        method: "PUT",
        headers: getAuthHeaders(),
      }
    );

    if (!resposta.ok) {
      toast.error("Erro ao desativar admin");
      return;
    }

    setAdmins(
      admins.map((item) =>
        item.id === admin.id
          ? {
              ...item,
              ativo: 0,
            }
          : item
      )
    );

    toast.success("Admin desativado!");
  } catch (error) {
    console.error(error);
    toast.error("Erro ao desativar admin");
  }
}

async function ativarAdmin(admin) {
  try {
    const resposta = await fetch(
      `${API_URL}/admins/${admin.id}/ativar`,
      {
        method: "PUT",
        headers: getAuthHeaders(),
      }
    );

    if (!resposta.ok) {
      toast.error("Erro ao ativar admin");
      return;
    }

    setAdmins(
      admins.map((item) =>
        item.id === admin.id
          ? { ...item, ativo: 1 }
          : item
      )
    );

    toast.success("Admin ativado!");
  } catch (error) {
    console.error(error);
    toast.error("Erro ao ativar admin");
  }
}

  return (
    <div className="admin-page">
      <div className="admin-painel">
        <div className="admin-header">
          <img
            src="/logo.png"
            alt="Alameda Kennedy"
            className="admin-logo"
          />

          <div>
            <h1>Painel Admin</h1>

            <p>
              Gerencie produtos, preços e
              disponibilidade.
            </p>
          </div>
        </div>

        <div className="admin-logado">
  Você está logado como{" "}
  <strong>
    {adminUsuario?.nome}
  </strong>
</div>

        <div className="admin-actions">
          <button
            className="admin-btn"
            onClick={() =>
              setNovoProduto({
                nome: "",
                descricao: "",
                preco: "",
                categoria: "COMBOS",
                imagem: "",
                disponivel: true,
              })
            }
          >
            Adicionar Produto
          </button>

<button
  className="admin-btn"
  onClick={() => setModalCategoria(true)}
>
  Adicionar Categoria
</button>

{isSuperAdmin && (
<button
  className="admin-btn"
  onClick={() => {
    setModalAdmins(true);
    buscarAdmins();
  }}
>
  Gerenciar Admins
</button>
)}
          <button
            className="admin-btn danger"
            onClick={sair}
          >
            Sair
          </button>
        </div>

<div className="admin-busca">
  <input
    type="text"
    placeholder="Buscar produto..."
    value={busca}
    onChange={(e) => setBusca(e.target.value)}
  />
</div>



<div className="admin-filtros">
  <div>
    <label>Categoria:</label>

    <select
      value={categoriaFiltro}
      onChange={(e) => setCategoriaFiltro(e.target.value)}
    >
      {categoriasAdmin.map((categoria) => (
        <option key={categoria} value={categoria}>
          {categoria}
        </option>
      ))}
    </select>
  </div>

  <div>
    <label>Ordenar por:</label>

    <select
      value={ordenacao}
      onChange={(e) => setOrdenacao(e.target.value)}
    >
      <option value="nome-az">Nome A-Z</option>
      <option value="nome-za">Nome Z-A</option>
      <option value="preco-menor">Menor preço</option>
      <option value="preco-maior">Maior preço</option>
    </select>
  </div>
</div>

        <div className="admin-lista">
          {produtosOrdenados.map(
            (produto) => (
              <div
                className="admin-produto"
                key={produto.id}
              >
                <div>
                  <h3>{produto.nome}</h3>

                  <p>
                    {produto.categoria}
                  </p>
                </div>

                <strong>
                  R${" "}
                  {Number(produto.preco)
                    .toFixed(2)
                    .replace(".", ",")}
                </strong>

                <div className="admin-botoes">
                  <button
                    className="editar-btn"
                    onClick={() =>
                      setProdutoEditando(
                        produto
                      )
                    }
                  >
                    Editar
                  </button>

                  <button
                    className={
                      produto.disponivel
                        ? "status-btn ativo"
                        : "status-btn inativo"
                    }
                    onClick={() =>
                      alternarDisponibilidade(
                        produto
                      )
                    }
                  >
                    {produto.disponivel
                      ? "Disponível"
                      : "Indisponível"}
                  </button>

                  <button
                    className="excluir-btn"
                    onClick={() =>
                      excluirProduto(produto)
                    }
                  >
                    Excluir
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </div>
      

{modalAdmins && (
  <div
    className="modal-overlay"
    onClick={() => setModalAdmins(false)}
  >
    <div
      className="modal-editar modal-admins"
      onClick={(e) => e.stopPropagation()}
    >
      <h2>Gerenciar Admins</h2>

      <input
        type="text"
        placeholder="Nome"
        value={novoAdmin.nome}
        onChange={(e) =>
          setNovoAdmin({
            ...novoAdmin,
            nome: e.target.value,
          })
        }
      />

      <input
        type="email"
        placeholder="E-mail"
        value={novoAdmin.email}
        onChange={(e) =>
          setNovoAdmin({
            ...novoAdmin,
            email: e.target.value,
          })
        }
      />

      <input
        type="password"
        placeholder="Senha"
        value={novoAdmin.senha}
        onChange={(e) =>
          setNovoAdmin({
            ...novoAdmin,
            senha: e.target.value,
          })
        }
      />

      <button onClick={criarAdmin}>
        Criar Admin
      </button>

      <div className="admins-lista">
        {admins.map((admin) => (
          <div className="admin-item" key={admin.id}>
            <div>
              <strong>{admin.nome}</strong>
              <p>{admin.email}</p>

              <span>
                {admin.ativo ? "Ativo" : "Inativo"}
              </span>
            </div>

            {admin.ativo ? (
              <button
                className="desativar-admin-btn"
                onClick={() => desativarAdmin(admin)}
              >
                Desativar
              </button>
            ) : (
              <button
                className="ativar-admin-btn"
                onClick={() => ativarAdmin(admin)}
              >
                Ativar
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        className="cancelar-btn"
        onClick={() => setModalAdmins(false)}
      >
        Fechar
      </button>
    </div>
  </div>
)}

      {produtoEditando && (
        <div
  className="modal-overlay"
  onClick={() => setProdutoEditando(null)}
>
          <div
  className="modal-editar"
  onClick={(e) => e.stopPropagation()}
>
            <h2>Editar Produto</h2>

            <input
              type="text"
              value={produtoEditando.nome}
              onChange={(e) =>
                setProdutoEditando({
                  ...produtoEditando,
                  nome: e.target.value,
                })
              }
            />

            <input
              type="number"
              value={produtoEditando.preco}
              onChange={(e) =>
                setProdutoEditando({
                  ...produtoEditando,
                  preco: e.target.value,
                })
              }
            />

            <select
  value={produtoEditando.categoria}
  onChange={(e) =>
    setProdutoEditando({
      ...produtoEditando,
      categoria: e.target.value,
    })
  }
>
  {categorias.map((categoria) => (
    <option
      key={categoria.id}
      value={categoria.nome}
    >
      {categoria.nome}
    </option>
  ))}
</select>

            <textarea
              value={
                produtoEditando.descricao
              }
              onChange={(e) =>
                setProdutoEditando({
                  ...produtoEditando,
                  descricao:
                    e.target.value,
                })
              }
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                enviarImagem(
                  e.target.files[0],
                  "editar"
                )
              }
            />

            {produtoEditando.imagem && (
              <img
                src={
                  produtoEditando.imagem
                }
                alt="Prévia"
                className="preview-img"
              />
            )}

            <button
              onClick={salvarProduto}
            >
              Salvar
            </button>

            <button
              className="cancelar-btn"
              onClick={() =>
                setProdutoEditando(null)
              }
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {modalCategoria && (
  <div
  className="modal-overlay"
  onClick={() => {
    setModalCategoria(false);
    setNovaCategoria("");
  }}
>
    <div
    className="modal-editar"
    onClick={(e) => e.stopPropagation()}
  >
      <h2>Adicionar Categoria</h2>

      <input
        type="text"
        placeholder="Nome da categoria"
        value={novaCategoria}
        onChange={(e) => setNovaCategoria(e.target.value)}
      />

      <button onClick={adicionarCategoria}>
        Salvar Categoria
      </button>

      <button
        className="cancelar-btn"
        onClick={() => {
          setModalCategoria(false);
          setNovaCategoria("");
        }}
      >
        Cancelar
      </button>
    </div>
  </div>
)}



      {novoProduto && (
<div
  className="modal-overlay"
  onClick={() => setNovoProduto(null)}
>
  <div
    className="modal-editar"
    onClick={(e) => e.stopPropagation()}
  >
            <h2>Adicionar Produto</h2>

            <input
              type="text"
              placeholder="Nome"
              value={novoProduto.nome}
              onChange={(e) =>
                setNovoProduto({
                  ...novoProduto,
                  nome: e.target.value,
                })
              }
            />

            <input
              type="number"
              placeholder="Preço"
              value={novoProduto.preco}
              onChange={(e) =>
                setNovoProduto({
                  ...novoProduto,
                  preco: e.target.value,
                })
              }
            />

            <select
              value={novoProduto.categoria}
              onChange={(e) =>
                setNovoProduto({
                  ...novoProduto,
                  categoria:
                    e.target.value,
                })
              }
            >
{categorias.map((categoria) => (
  <option
    key={categoria.id}
    value={categoria.nome}
  >
    {categoria.nome}
  </option>
))}
            </select>

            <textarea
              placeholder="Descrição"
              value={novoProduto.descricao}
              onChange={(e) =>
                setNovoProduto({
                  ...novoProduto,
                  descricao:
                    e.target.value,
                })
              }
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                enviarImagem(
                  e.target.files[0],
                  "novo"
                )
              }
            />

            {novoProduto.imagem && (
              <img
                src={novoProduto.imagem}
                alt="Prévia"
                className="preview-img"
              />
            )}

            <button
              onClick={adicionarProduto}
            >
              Salvar Produto
            </button>

            <button
              className="cancelar-btn"
              onClick={() =>
                setNovoProduto(null)
              }
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;