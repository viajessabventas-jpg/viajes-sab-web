<section id="nosotros" className="about">
  <div className="about-inner">
    <div>
      <p className="eyebrow">Nosotros</p>

      <h2>Más de 50 años creando experiencias de viaje</h2>

      <p>
        En Agencia de Viajes SAB creemos que viajar debe sentirse emocionante,
        seguro y acompañado desde el primer momento. Nuestra experiencia,
        atención personalizada y compromiso nos permiten crear soluciones
        aéreas y turísticas adaptadas a cada cliente.
      </p>

      <div className="list-grid two">
        <div className="list-item">
          <Star size={16} />
          <span>Más de 50 años de experiencia</span>
        </div>

        <div className="list-item">
          <Star size={16} />
          <span>Atención humana y personalizada</span>
        </div>

        <div className="list-item">
          <Star size={16} />
          <span>Soluciones aéreas y turísticas</span>
        </div>

        <div className="list-item">
          <Star size={16} />
          <span>Servicio honesto y confiable</span>
        </div>
      </div>

      <div className="cards-grid two">
        <Card>
          <CardContent>
            <p className="eyebrow">Misión</p>

            <h3>Viajes confiables y memorables</h3>

            <p>
              Crear experiencias de viaje confiables y memorables mediante
              soluciones aéreas y turísticas personalizadas, respaldadas por más
              de 50 años de experiencia, servicio humano y compromiso con
              nuestros clientes.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <p className="eyebrow">Visión</p>

            <h3>Liderar con confianza e innovación</h3>

            <p>
              Ser la agencia de viajes líder en confianza, servicio e innovación
              en Guatemala, manteniendo nuestra esencia de trabajo honesto y
              atención personalizada que nos ha distinguido por generaciones.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="hero-buttons">
        <Button asChild className="dark large">
          <a href={flightsUrl} target="_blank" rel="noreferrer">
            Pedir tarifa aérea
          </a>
        </Button>

        <Button asChild className="outline-light large">
          <a href={excursionsUrl} target="_blank" rel="noreferrer">
            Ver excursiones
          </a>
        </Button>
      </div>
    </div>

    <div className="about-image">
      <img src={content.aboutImage} alt="Viajeros" />

      <div className="about-badge">
        <p>+50 años</p>
        <span>creando experiencias de viaje</span>
      </div>
    </div>
  </div>
</section>
