import "../styles/home.css";

function Home() {
  return (
    <div className="container">
      <div className="left-panel">
        <div className="logo-box">
          <img
            src="/logo.png"
            alt="Alameda Kennedy"
            className="logo"
          />
        </div>
      </div>

      <div className="right-panel">
        <div className="card">
          <h2>Cardápio</h2>

          <p>
            Confira nosso cardápio completo com bebidas,
            porções e lanches.
          </p>

          <a href="/cardapio">
            <button>Acessar</button>
          </a>
        </div>

        <div className="card">
          <h2>Eventos</h2>

          <p>
            Veja nossos próximos eventos e atrações.
          </p>

                    <a
            href="https://www.instagram.com/alamedakennedy"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button>Acessar</button>
          </a>
        </div>

        <div className="card">
          <h2>Instagram</h2>

          <p>
            Acompanhe promoções e novidades no Instagram.
          </p>

          <a
            href="https://www.instagram.com/alamedakennedy"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button>Acessar</button>
          </a>
        </div>
      </div>

      <a
        href="https://wa.me/5511951328226"
        className="whatsapp-button"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Abrir WhatsApp"
      >
        <span className="whatsapp-icon">☎</span>

        <span className="whatsapp-text">
          Reservas
        </span>
      </a>
    </div>
  );
}

export default Home;