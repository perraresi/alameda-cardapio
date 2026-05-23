import { useEffect, useState } from "react";
import "../styles/cardapio.css";
import API_URL from "../services/api";

function Cardapio() {
  const [produtos, setProdutos] = useState([]);
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");
  const [ordenacao, setOrdenacao] = useState("nome-az");
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/produtos`)
      .then((res) => res.json())
      .then((data) => setProdutos(data))
      .catch((err) => console.error(err));
  }, []);

  const ordemCategorias = [
    "COMBOS",
    "DESTILADOS - DOSES",
    "GARRAFAS",
    "CERVEJAS",
    "DRINKS",
    "NÃO ALCOÓLICOS",
  ];

  const categorias = [
    "Todos",
    ...ordemCategorias.filter((categoria) =>
      produtos.some((produto) => produto.categoria === categoria)
    ),
  ];

  const produtosFiltrados = (
    categoriaAtiva === "Todos"
      ? produtos
      : produtos.filter((produto) => produto.categoria === categoriaAtiva)
  ).sort((a, b) => {
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

  return (
    <main className="cardapio-page">
      <header className="cardapio-header">
        <div className="header-top">
          <a href="/" className="voltar-home">
            ←
          </a>

          <div className="header-logo-area">
            <img
              src="/logo.png"
              alt="Alameda Kennedy"
              className="header-logo"
            />

            <h1>Cardápio</h1>
          </div>
        </div>
      </header>

      <nav className="categorias-scroll">
        {categorias.map((categoria) => (
          <button
            key={categoria}
            className={
              categoriaAtiva === categoria
                ? "categoria-btn ativo"
                : "categoria-btn"
            }
            onClick={() => setCategoriaAtiva(categoria)}
          >
            {categoria}
          </button>
        ))}
      </nav>

      <div className="ordenacao-cardapio">
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

      <section className="produtos-lista">
        {produtosFiltrados.map((produto) => (
          <article
            className="produto-card"
            key={produto.id}
            onClick={() => setProdutoSelecionado(produto)}
          >
            <img
              src={produto.imagem}
              alt={produto.nome}
              className="produto-img"
            />

            <div className="produto-info">
              <div>
                <h2>{produto.nome}</h2>
                <p>{produto.descricao}</p>
              </div>

              <strong>
                R$ {Number(produto.preco).toFixed(2).replace(".", ",")}
              </strong>
            </div>
          </article>
        ))}
      </section>

      {produtoSelecionado && (
        <div
          className="produto-modal-overlay"
          onClick={() => setProdutoSelecionado(null)}
        >
          <div
            className="produto-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="produto-modal-fechar"
              onClick={() => setProdutoSelecionado(null)}
            >
              ✕
            </button>

            <img
              src={produtoSelecionado.imagem}
              alt={produtoSelecionado.nome}
              className="produto-modal-img"
            />

            <div className="produto-modal-info">
              <span className="produto-modal-categoria">
                {produtoSelecionado.categoria}
              </span>

              <h2>{produtoSelecionado.nome}</h2>

              <p>{produtoSelecionado.descricao}</p>

              <strong>
                R${" "}
                {Number(produtoSelecionado.preco)
                  .toFixed(2)
                  .replace(".", ",")}
              </strong>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Cardapio;