import { useEffect, useState } from "react";

export default function HeroCarousel({ images }) {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % images.length);
    }, 4200);

    return () => window.clearInterval(intervalId);
  }, [images.length]);

  const nextSlide = () => {
    setActiveSlide((current) => (current + 1) % images.length);
  };

  const previousSlide = () => {
    setActiveSlide((current) => (current - 1 + images.length) % images.length);
  };

  return (
    <div className="hero-card">
      <img src={images[activeSlide]} alt="Equipe criativa em atividade" />
      <div className="hero-overlay" />

      <div className="hero-topbar">
        <span className="hero-chip">Experiencia em abas</span>

        <div className="hero-actions">
          <button type="button" onClick={previousSlide} aria-label="Imagem anterior">
            Prev
          </button>
          <button type="button" onClick={nextSlide} aria-label="Proxima imagem">
            Next
          </button>
        </div>
      </div>

      <div className="hero-copy">
        <p>Brand Safari Studio</p>
        <h1>Um site com cara de campanha, mas organizado como produto.</h1>
        <span>
          Em vez de uma landing extensa, cada frente importante vira uma aba com contexto, prova e acao.
        </span>
      </div>

      <div className="hero-dots" role="tablist" aria-label="Navegacao do hero">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            className={index === activeSlide ? "is-active" : ""}
            onClick={() => setActiveSlide(index)}
            aria-label={`Ir para imagem ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
