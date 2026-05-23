function ProdutoCard({ produto }) {
  return (
    <div className="produto-card">
      <img
        src={produto.imagem}
        alt={produto.nome}
        className="produto-img"
      />

      <div className="produto-info">
        <h2>{produto.nome}</h2>

        <p>{produto.descricao}</p>

        <span className="produto-preco">
          R$ {produto.preco}
        </span>
      </div>
    </div>
  );
}

export default ProdutoCard;