import { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import ChatComponent from './components/ChatComponent.jsx';

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const chatRef = useRef(null);

  const handleOpenChat = () => {
    if (chatRef.current) {
      chatRef.current.toggleChat();
    }
  };
  // Dados dos slides do carrossel
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1621135802920-133df287f89c?ixlib=rb-4.0.1&auto=format&fit=crop&w=1600&h=400&q=80",
      title: "Consórcio de Veículos",
      subtitle: "Realize seu sonho do carro novo com planejamento e segurança"
    },
    {
      image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.1&auto=format&fit=crop&w=1600&h=400&q=80",
      title: "Taxas Zero de Juros",
      subtitle: "Adquira seu veículo sem pagar juros abusivos"
    },
    {
      image: "https://images.unsplash.com/photo-1563720223185-11003d516935?ixlib=rb-4.0.1&auto=format&fit=crop&w=1600&h=400&q=80",
      title: "Mais de 10.000 Clientes Satisfeitos",
      subtitle: "Junte-se à família que já realizou o sonho do carro próprio"
    }
  ];
  // Efeito do Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="homepage">
      <ChatComponent ref={chatRef} />

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top custom-navbar">
        <div className="container">
          <a className="navbar-brand fw-bold" href="#">
            <i className="fas fa-car me-2"></i>
            AutoConsórcio
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link active" href="#">Início</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#vantagens">Vantagens</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#como-funciona">Como Funciona</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#simulacao">Simulação</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contato">Contato</a>
              </li>
            </ul>

            <div className="d-flex ms-lg-3 mt-3 mt-lg-0">

              <button onClick={handleOpenChat} className="btn btn-primary btn-sm">
                <i className="fas fa-calculator me-1"></i>
                Simular
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div className='container-fluid'>

        {/* Hero Carousel */}
        <section className="hero-section">
          <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
              {slides.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  data-bs-target="#heroCarousel"
                  data-bs-slide-to={index}
                  className={index === currentSlide ? 'active' : ''}
                ></button>
              ))}
            </div>

            <div className="carousel-inner">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`carousel-item ${index === currentSlide ? 'active' : ''}`}
                  style={{ backgroundImage: `url(${slide.image})` }}
                >
                  <div className="carousel-overlay"></div>
                  <div className="container">
                    <div className="carousel-caption text-center">
                      <h1 className="display-4 fw-bold mb-3">{slide.title}</h1>
                      <p className="lead mb-4">{slide.subtitle}</p>
                      <div className="d-flex gap-3 justify-content-center flex-wrap">
                        <button onClick={handleOpenChat} className="btn btn-primary btn-lg px-4 py-2">
                          <i className="fa fa-commenting me-2"></i>
                          Fale com um de nossos consultores
                        </button>

                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Anterior</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Próximo</span>
            </button>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section py-5 bg-light">
          <div className="container">
            <div className="row g-4 text-center">
              <div className="col-6 col-md-3">
                <div className="stat-item">
                  <h3 className="display-6 fw-bold text-primary mb-2">10K+</h3>
                  <p className="text-muted mb-0">Clientes Satisfeitos</p>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="stat-item">
                  <h3 className="display-6 fw-bold text-primary mb-2">R$ 500M+</h3>
                  <p className="text-muted mb-0">Em Crédito Liberado</p>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="stat-item">
                  <h3 className="display-6 fw-bold text-primary mb-2">15+</h3>
                  <p className="text-muted mb-0">Anos no Mercado</p>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="stat-item">
                  <h3 className="display-6 fw-bold text-primary mb-2">98%</h3>
                  <p className="text-muted mb-0">Avaliação Positiva</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vantagens Section */}
        <section id="vantagens" className="advantages-section py-5">
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="display-5 fw-bold mb-3">Por que escolher nosso consórcio?</h2>
              <p className="lead text-muted">Descubra as vantagens de realizar seu sonho com a gente</p>
            </div>

            <div className="row g-4">
              <div className="col-md-6 col-lg-3">
                <div className="advantage-card text-center p-4 h-100">
                  <div className="advantage-icon bg-primary text-white rounded-circle mx-auto mb-3">
                    <i className="fas fa-percentage"></i>
                  </div>
                  <h5 className="fw-bold mb-3">Sem Juros</h5>
                  <p className="text-muted mb-0">Taxa zero de juros, você paga apenas o valor da carta de crédito</p>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="advantage-card text-center p-4 h-100">
                  <div className="advantage-icon bg-success text-white rounded-circle mx-auto mb-3">
                    <i className="fas fa-calendar-alt"></i>
                  </div>
                  <h5 className="fw-bold mb-3">Flexibilidade</h5>
                  <p className="text-muted mb-0">Parcelas que cabem no seu bolso com prazos de 12 a 84 meses</p>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="advantage-card text-center p-4 h-100">
                  <div className="advantage-icon bg-warning text-white rounded-circle mx-auto mb-3">
                    <i className="fas fa-shield-alt"></i>
                  </div>
                  <h5 className="fw-bold mb-3">Segurança</h5>
                  <p className="text-muted mb-0">Processo 100% regulado e acompanhado por especialistas</p>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="advantage-card text-center p-4 h-100">
                  <div className="advantage-icon bg-info text-white rounded-circle mx-auto mb-3">
                    <i className="fas fa-car-side"></i>
                  </div>
                  <h5 className="fw-bold mb-3">Qualquer Veículo</h5>
                  <p className="text-muted mb-0">Carros, motos, caminhões e até veículos pesados</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Como Funciona */}
        <section id="como-funciona" className="how-it-works py-5 bg-light">
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="display-5 fw-bold mb-3">Como funciona o consórcio?</h2>
              <p className="lead text-muted">4 passos simples para ter seu veículo</p>
            </div>

            <div className="row g-4">
              <div className="col-md-6 col-lg-3">
                <div className="step-card text-center p-4">
                  <div className="step-number bg-primary text-white rounded-circle mx-auto mb-3">1</div>
                  <h5 className="fw-bold mb-3">Escolha o Plano</h5>
                  <p className="text-muted mb-0">Selecione o valor e prazo que melhor se adapta às suas necessidades</p>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="step-card text-center p-4">
                  <div className="step-number bg-success text-white rounded-circle mx-auto mb-3">2</div>
                  <h5 className="fw-bold mb-3">Pague as Parcelas</h5>
                  <p className="text-muted mb-0">Faça o pagamento mensal das parcelas do grupo de consórcio</p>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="step-card text-center p-4">
                  <div className="step-number bg-warning text-white rounded-circle mx-auto mb-3">3</div>
                  <h5 className="fw-bold mb-3">Lance ou Espere</h5>
                  <p className="text-muted mb-0">Participe dos sorteios ou dê lance para ser contemplado</p>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="step-card text-center p-4">
                  <div className="step-number bg-info text-white rounded-circle mx-auto mb-3">4</div>
                  <h5 className="fw-bold mb-3">Retire seu Veículo</h5>
                  <p className="text-muted mb-0">Ao ser contemplado, use sua carta de crédito para adquirir o veículo</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="simulacao" className="cta-section py-5 text-white">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-8">
                <h2 className="display-6 fw-bold mb-3">Pronto para dar o primeiro passo?</h2>
                <p className="lead mb-0">Faça uma simulação sem compromisso e descubra o plano ideal para você</p>
              </div>
              <div className="col-lg-4 text-lg-end mt-4 mt-lg-0">
                <div className="d-flex flex-column flex-sm-row gap-3 justify-content-lg-end">
                  {/* <button className="btn btn-light btn-lg px-4">
                  <i className="fas fa-calculator me-2"></i>
                  Simular Agora
                </button> */}
                  <button onClick={handleOpenChat} className="btn btn-outline-light btn-lg px-4">
                    <i className="fa fa-commenting me-2"></i>
                    Fale com um Consultor
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer id="contato" className="footer-section py-5 bg-dark text-white">
          <div className="container">
            <div className="row g-4">
              <div className="col-lg-4">
                <h5 className="fw-bold mb-3">
                  <i className="fas fa-car me-2"></i>
                  AutoConsórcio
                </h5>
                <p className="text-muted">Realizando sonhos há mais de 15 anos com segurança e transparência.</p>
                <div className="social-links">
                  <a href="#" className="text-white me-3"><i className="fab fa-facebook"></i></a>
                  <a href="#" className="text-white me-3"><i className="fab fa-instagram"></i></a>
                  <a href="#" className="text-white me-3"><i className="fab fa-whatsapp"></i></a>
                  <a href="#" className="text-white"><i className="fab fa-linkedin"></i></a>
                </div>
              </div>

              <div className="col-lg-4">
                <h6 className="fw-bold mb-3">Contato</h6>
                <div className="contact-info">
                  <p className="mb-2">
                    <i className="fas fa-phone me-2"></i>
                    (11) 9999-9999
                  </p>
                  <p className="mb-2">
                    <i className="fas fa-envelope me-2"></i>
                    contato@autoconsorcio.com
                  </p>
                  <p className="mb-0">
                    <i className="fas fa-clock me-2"></i>
                    Seg à Sex: 9h às 18h | Sáb: 9h às 13h
                  </p>
                </div>
              </div>

              <div className="col-lg-4">
                <h6 className="fw-bold mb-3">Newsletter</h6>
                <p className="text-muted mb-3">Receba novidades e promoções exclusivas</p>
                <div className="input-group">
                  <input type="email" className="form-control" placeholder="Seu melhor e-mail" />
                  <button className="btn btn-primary">
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </div>
              </div>
            </div>

            <hr className="my-4" />

            <div className="row align-items-center">
              <div className="col-md-6">
                <p className="mb-0 text-muted">&copy; 2024 AutoConsórcio. Todos os direitos reservados.</p>
              </div>
              <div className="col-md-6 text-md-end">
                <a href="#" className="text-muted me-3">Política de Privacidade</a>
                <a href="#" className="text-muted">Termos de Uso</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>

  );
};
