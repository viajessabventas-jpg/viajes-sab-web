
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Plane, MapPin, Phone, Mail, MessageCircle, Camera, Edit3, Save, X, Menu, Star, Globe2, CalendarDays } from "lucide-react";
import "./App.css";

const Button = ({ children, className = "", asChild = false, ...props }) => {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      className: `btn ${className} ${children.props.className || ""}`,
      ...props,
    });
  }
  return <button className={`btn ${className}`} {...props}>{children}</button>;
};

const Card = ({ children, className = "" }) => <div className={`card ${className}`}>{children}</div>;
const CardContent = ({ children, className = "" }) => <div className={`card-content ${className}`}>{children}</div>;

const defaultContent = {
  agencyName: "Agencia de Viajes SAB",
  slogan: "Creamos experiencias de viaje inolvidables",
  heroTitle: "Tu pr√≥xima aventura empieza aqu√≠",
  heroText:
    "Organizamos excursiones, paquetes tur√≠sticos y tarifas a√©reas para que viajes con confianza, comodidad y respaldo profesional.",
  whatsappExcursions: "50238090660",
  whatsappFlights: "50257935366",
  excursionsMessage: "Hola, quiero cotizar excursiones o cruceros.",
  flightsMessage: "Hola, quiero cotizar tarifas de boletos de avi√≥n.",
  address: "Quetzaltenango, Guatemala y Guatemala, Guatemala",
  phone: "+502 3809-0660",
  email: "viajessab.ventas@gmail.com",
  logo: "/logo-viajes-sab.jpg",
  heroImage:
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
  aboutImage:
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80",
  sectionTitle: "Viaja f√°cil, seguro y a tu medida",
  sectionText:
    "Te acompa√±amos desde la idea inicial hasta tu regreso. Cotizamos rutas, hoteles, excursiones, traslados y boletos a√©reos con atenci√≥n personalizada.",
};

const defaultTours = [
  {
    title: "Excursiones locales",
    text: "Tours culturales, naturaleza, aventura y escapadas de fin de semana.",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Paquetes internacionales",
    text: "Destinos familiares, luna de miel, viajes grupales y experiencias premium.",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Tarifas a√©reas",
    text: "Cotizaci√≥n de vuelos nacionales e internacionales seg√∫n fecha y presupuesto.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1000&q=80",
  },
];

const featuredExcursion = {
  title: "El Sue√±o de √Åfrica",
  subtitle: "Safari en cami√≥n premium por Kenia, Tanzania y Zanz√≠bar",
  duration: "15 d√≠as",
  price: "Desde ‚Ç¨2,750 p/p",
  image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=80",
  highlights: [
    "Vuelos internacionales con Ethiopian Airlines desde Madrid",
    "Gu√≠a de habla hispana durante el recorrido",
    "Transporte en cami√≥n especialmente preparado para safari",
    "Safari en globo sobre la Reserva Nacional de Mas√°i Mara",
    "Hoteles seleccionados en Zanz√≠bar y Stone Town",
    "Traslados incluidos en Zanz√≠bar",
  ],
};

const localExcursions = [
  {
    title: "Tikal 3 d√≠as / 2 noches",
    badge: "Promoci√≥n local",
    price: "Desde US$358",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
    text: "Paquete a Tikal con vuelo Guatemala/Flores/Guatemala, 2 noches de hotel, tour compartido al Parque Nacional Tikal, admisi√≥n, gu√≠a ingl√©s/espa√±ol, almuerzo sin bebida y desayunos.",
    includes: [
      "Boleto a√©reo GUA/FRS/GUA con TAG",
      "2 noches de alojamiento en hotel a elecci√≥n",
      "Tour compartido al Parque Nacional Tikal",
      "2 desayunos por persona",
      "Traslados aeropuerto, Tikal, hotel y Mundo Maya",
    ],
    optionalTours: ["Cr√°ter Azul colectivo desde US$75", "Yaxh√° colectivo desde US$75"],
  },
];

const europeCircuits = [
  {
    title: "Alemania Rom√°ntica",
    duration: "7 d√≠as",
    price: "Desde ‚Ç¨1,410",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&q=80",
    cities: ["Frankfurt", "Heidelberg", "Selva Negra", "Neuschwanstein", "M√∫nich", "Nuremberg"],
    highlights: [
      "Ruta Rom√°ntica alemana",
      "Castillo de Heidelberg",
      "Castillo de Neuschwanstein",
      "Cena t√≠pica b√°vara en M√∫nich",
      "Granja en la Selva Negra con degustaci√≥n de quesos",
    ],
    description:
      "Circuito premium por Alemania con castillos, pueblos medievales, Selva Negra, M√∫nich y la Ruta Rom√°ntica.",
  },
];

const promos = [
  {
    title: "Gran Sale de Assist Card",
    subtitle: "Viaja seguro con descuento especial",
    discount: "40% de descuento",
    detail: "En todos los productos Assist Card. Promoci√≥n del 11 al 31 de mayo. Aplican restricciones.",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=900&q=80",
    cta: "Cotizar asistencia de viaje",
  },
];

function whatsappLink(number, message) {
  const clean = number.replace(/[^0-9]/g, "");
  return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;
}

export default function TravelAgencyWebsite() {
  const [content, setContent] = useState(defaultContent);
  const [draft, setDraft] = useState(defaultContent);
  const [editing, setEditing] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const excursionsUrl = useMemo(
    () => whatsappLink(content.whatsappExcursions, content.excursionsMessage),
    [content.whatsappExcursions, content.excursionsMessage]
  );

  const flightsUrl = useMemo(
    () => whatsappLink(content.whatsappFlights, content.flightsMessage),
    [content.whatsappFlights, content.flightsMessage]
  );

  const africaQuoteUrl = useMemo(
    () => whatsappLink(content.whatsappExcursions, `Hola, quiero cotizar la excursi√≥n ${featuredExcursion.title}.`),
    [content.whatsappExcursions]
  );

  const tikalQuoteUrl = useMemo(
    () => whatsappLink(content.whatsappExcursions, "Hola, quiero cotizar la excursi√≥n Tikal 3 d√≠as / 2 noches."),
    [content.whatsappExcursions]
  );

  const promoQuoteUrl = useMemo(
    () => whatsappLink(content.whatsappExcursions, "Hola, quiero cotizar la promoci√≥n de Assist Card con 40% de descuento."),
    [content.whatsappExcursions]
  );

  const updateDraft = (key, value) => setDraft((prev) => ({ ...prev, [key]: value }));

  const saveChanges = () => {
    setContent(draft);
    setEditing(false);
  };

  const cancelChanges = () => {
    setDraft(content);
    setEditing(false);
  };

  return (
    <div className="site">
      <header className="header">
        <div className="header-inner">
          <a href="#inicio" className="brand">
            <img src={content.logo} alt="Logo Agencia de Viajes SAB" className="logo" />
            <div>
              <p className="brand-name">{content.agencyName}</p>
              <p className="brand-subtitle">Agencia de viajes</p>
            </div>
          </a>

          <nav className="nav">
            <a href="#promos">Promos</a>
            <a href="#servicios">Servicios</a>
            <a href="#nosotros">Nosotros</a>
            <a href="#contacto">Contacto</a>
          </nav>

          <div className="header-actions">
            <Button asChild className="cyan">
              <a href={excursionsUrl} target="_blank" rel="noreferrer">
                <MessageCircle size={16} /> Excursiones
              </a>
            </Button>
            <Button className="outline" onClick={() => setEditing(true)}>
              <Edit3 size={16} /> Editar
            </Button>
          </div>

          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir men√∫">
            <Menu />
          </button>
        </div>
        {menuOpen && (
          <div className="mobile-menu">
            <a href="#promos" onClick={() => setMenuOpen(false)}>Promos</a>
            <a href="#servicios" onClick={() => setMenuOpen(false)}>Servicios</a>
            <a href="#nosotros" onClick={() => setMenuOpen(false)}>Nosotros</a>
            <a href="#contacto" onClick={() => setMenuOpen(false)}>Contacto</a>
            <a className="btn cyan" href={excursionsUrl} target="_blank" rel="noreferrer">WhatsApp excursiones</a>
            <button className="btn outline" onClick={() => setEditing(true)}>Editar contenido</button>
          </div>
        )}
      </header>

      <main id="inicio">
        <section className="hero">
          <div className="hero-bg">
            <img src={content.heroImage} alt="Destino tur√≠stico" />
            <div />
          </div>

          <div className="hero-inner">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div className="pill">
                <Globe2 size={16} /> {content.slogan}
              </div>
              <h1>{content.heroTitle}</h1>
              <p className="hero-text">{content.heroText}</p>
              <div className="hero-buttons">
                <Button asChild className="green large">
                  <a href={excursionsUrl} target="_blank" rel="noreferrer">
                    <MessageCircle size={20} /> Consultar excursiones
                  </a>
                </Button>
                <Button asChild className="outline large">
                  <a href={flightsUrl} target="_blank" rel="noreferrer">
                    <Plane size={20} /> Solicitar tarifas a√©reas
                  </a>
                </Button>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.15 }} className="hero-card-wrap">
              <Card className="glass">
                <CardContent>
                  <div className="feature-box">
                    <Star className="cyan-icon" />
                    <p className="feature-title">Atenci√≥n personalizada</p>
                    <p>Cotizamos tu viaje seg√∫n fechas, presupuesto y estilo.</p>
                  </div>
                  <div className="mini-grid">
                    <div className="mini-card cyan-card"><CalendarDays /> <p>Excursiones</p></div>
                    <div className="mini-card white-card"><Plane /> <p>Vuelos</p></div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        <section id="promos" className="section">
          <div className="section-head">
            <div>
              <p className="eyebrow red">Promociones</p>
              <h2>Ofertas activas para viajar mejor</h2>
              <p>Promociones especiales disponibles por tiempo limitado.</p>
            </div>
            <Button asChild className="red-btn large">
              <a href={promoQuoteUrl} target="_blank" rel="noreferrer"><MessageCircle /> Cotizar promo</a>
            </Button>
          </div>

          <div className="promo-grid">
            <Card className="promo-image-card">
              <img src={promos[0].image} alt={promos[0].title} />
            </Card>
            <Card className="promo-text-card">
              <CardContent>
                <p className="eyebrow">Assist Card</p>
                <h3>{promos[0].title}</h3>
                <p className="discount">{promos[0].discount}</p>
                <p>{promos[0].detail}</p>
                <div className="hero-buttons">
                  <Button asChild className="white-btn large">
                    <a href={promoQuoteUrl} target="_blank" rel="noreferrer"><MessageCircle /> {promos[0].cta}</a>
                  </Button>
                  <Button asChild className="outline large">
                    <a href="#contacto">Hablar con asesor</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="section">
          <div className="section-head">
            <div>
              <p className="eyebrow">Excursi√≥n destacada</p>
              <h2>{featuredExcursion.title}</h2>
              <p>{featuredExcursion.subtitle}</p>
            </div>
            <div className="badges">
              <span>{featuredExcursion.duration}</span>
              <span>{featuredExcursion.price}</span>
            </div>
          </div>

          <Card className="split-card">
            <div className="split-image">
              <img src={featuredExcursion.image} alt={featuredExcursion.title} />
            </div>
            <CardContent className="split-content">
              <p className="eyebrow">Safari premium</p>
              <h3>Kenia, Tanzania y Zanz√≠bar</h3>
              <p>Una aventura internacional con vuelos, gu√≠a en espa√±ol, safari, alojamientos seleccionados y experiencias memorables en √Åfrica.</p>
              <div className="list-grid">
                {featuredExcursion.highlights.map((item) => (
                  <div key={item} className="list-item"><Star size={16} /><span>{item}</span></div>
                ))}
              </div>
              <div className="hero-buttons">
                <Button asChild className="green large">
                  <a href={africaQuoteUrl} target="_blank" rel="noreferrer"><MessageCircle /> Cotizar esta excursi√≥n</a>
                </Button>
                <Button asChild className="outline large">
                  <a href="#contacto">Hablar con asesor</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="section">
          <div className="section-title">
            <p className="eyebrow">Excursiones locales</p>
            <h2>Guatemala lista para descubrir</h2>
            <p>Paquetes nacionales con vuelos, hoteles, tours y atenci√≥n personalizada desde Agencia de Viajes SAB.</p>
          </div>

          {localExcursions.map((tour) => (
            <Card key={tour.title} className="split-card">
              <div className="split-image">
                <img src={tour.image} alt={tour.title} />
                <div className="image-badges"><span>{tour.badge}</span><span>{tour.price}</span></div>
              </div>
              <CardContent className="split-content">
                <h3>{tour.title}</h3>
                <p>{tour.text}</p>
                <div className="list-grid two">
                  {tour.includes.map((item) => (
                    <div key={item} className="list-item"><Star size={16} /><span>{item}</span></div>
                  ))}
                </div>
                <div className="optional-box">
                  <p>Tours opcionales</p>
                  <div>
                    {tour.optionalTours.map((item) => <span key={item}>{item}</span>)}
                  </div>
                </div>
                <Button asChild className="green large">
                  <a href={tikalQuoteUrl} target="_blank" rel="noreferrer"><MessageCircle /> Cotizar Tikal por WhatsApp</a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="section">
          <div className="section-title">
            <p className="eyebrow">Europa</p>
            <h2>Circuitos por Alemania y Alpes</h2>
            <p>Escapadas europeas con ciudades hist√≥ricas, castillos y rutas panor√°micas.</p>
          </div>

          <div className="cards-grid">
            {europeCircuits.map((trip) => (
              <Card key={trip.title} className="tour-card">
                <div className="tour-image">
                  <img src={trip.image} alt={trip.title} />
                  <div className="image-badges"><span>{trip.duration}</span><span>{trip.price}</span></div>
                </div>
                <CardContent>
                  <p className="eyebrow">Europa Premium</p>
                  <h3>{trip.title}</h3>
                  <p>{trip.description}</p>
                  <div className="chips">{trip.cities.map((city) => <span key={city}>{city}</span>)}</div>
                  <div className="list-grid">
                    {trip.highlights.map((item) => <div key={item} className="list-item"><Star size={16} /><span>{item}</span></div>)}
                  </div>
                  <Button asChild className="green large">
                    <a href={excursionsUrl} target="_blank" rel="noreferrer"><MessageCircle /> Cotizar circuito Alemania</a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="servicios" className="section">
          <div className="section-title">
            <p className="eyebrow">Servicios</p>
            <h2>Todo para viajar sin complicaciones</h2>
          </div>
          <div className="cards-grid three">
            {defaultTours.map((tour) => (
              <Card key={tour.title} className="tour-card">
                <img src={tour.image} alt={tour.title} />
                <CardContent>
                  <h3>{tour.title}</h3>
                  <p>{tour.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="nosotros" className="about">
          <div className="about-inner">
            <div>
              <p className="eyebrow">Nosotros</p>
              <h2>{content.sectionTitle}</h2>
              <p>{content.sectionText}</p>
              <div className="hero-buttons">
                <Button asChild className="dark large"><a href={flightsUrl} target="_blank" rel="noreferrer">Pedir tarifa a√©rea</a></Button>
                <Button asChild className="outline-light large"><a href={excursionsUrl} target="_blank" rel="noreferrer">Ver excursiones</a></Button>
              </div>
            </div>
            <div className="about-image">
              <img src={content.aboutImage} alt="Viajeros" />
              <div className="about-badge"><p>+Experiencias</p><span>hechas a tu medida</span></div>
            </div>
          </div>
        </section>

        <section id="contacto" className="section">
          <div className="contact-grid">
            <div>
              <p className="eyebrow">Contacto</p>
              <h2>Hablemos de tu pr√≥ximo viaje</h2>
              <p>Escr√≠benos por WhatsApp para recibir atenci√≥n r√°pida.</p>
              <div className="contact-list">
                <div><MapPin /> {content.address}</div>
                <div><Phone /> {content.phone}</div>
                <div><Mail /> {content.email}</div>
              </div>
            </div>
            <Card>
              <CardContent className="contact-card">
                <Button asChild className="green full large"><a href={excursionsUrl} target="_blank" rel="noreferrer"><MessageCircle /> WhatsApp para excursiones/cruceros</a></Button>
                <Button asChild className="cyan full large"><a href={flightsUrl} target="_blank" rel="noreferrer"><Plane /> Solicitar tarifas a√©reas</a></Button>
                <div className="tip">Consejo: usa formato internacional sin espacios. Ejemplo Guatemala: 50238090660.</div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer>¬© {new Date().getFullYear()} {content.agencyName}. Todos los derechos reservados.</footer>

      {editing && (
        <div className="modal">
          <div className="modal-panel">
            <div className="modal-head">
              <div>
                <h2>Editar contenido</h2>
                <p>Cambia textos, fotos, direcci√≥n y WhatsApp.</p>
              </div>
              <button onClick={cancelChanges}><X /></button>
            </div>

            <div className="form-grid">
              {[
                ["agencyName", "Nombre de la agencia"],
                ["slogan", "Frase corta"],
                ["heroTitle", "T√≠tulo principal"],
                ["whatsappExcursions", "WhatsApp excursiones/cruceros"],
                ["whatsappFlights", "WhatsApp tarifas a√©reas"],
                ["phone", "Tel√©fono visible"],
                ["email", "Correo"],
                ["address", "Direcci√≥n"],
                ["heroImage", "URL foto principal"],
                ["aboutImage", "URL foto secci√≥n nosotros"],
                ["logo", "URL del logo"],
              ].map(([key, label]) => (
                <label key={key}>
                  {label}
                  <input value={draft[key]} onChange={(e) => updateDraft(key, e.target.value)} />
                </label>
              ))}
            </div>

            <div className="form-stack">
              {[
                ["heroText", "Texto principal"],
                ["sectionTitle", "T√≠tulo secci√≥n nosotros"],
                ["sectionText", "Texto secci√≥n nosotros"],
                ["excursionsMessage", "Mensaje de WhatsApp para excursiones"],
                ["flightsMessage", "Mensaje de WhatsApp para tarifas a√©reas"],
              ].map(([key, label]) => (
                <label key={key}>
                  {label}
                  <textarea value={draft[key]} onChange={(e) => updateDraft(key, e.target.value)} rows={3} />
                </label>
              ))}
            </div>

            <div className="modal-actions">
              <Button className="outline-light" onClick={cancelChanges}>Cancelar</Button>
              <Button className="dark" onClick={saveChanges}><Save size={16} /> Guardar cambios</Button>
            </div>

            <div className="edit-tip"><Camera /> Para cambiar fotos, pega una URL de imagen. En una versi√≥n profesional podemos conectar carga directa de im√°genes.</div>
          </div>
        </div>
      )}
    </div>
  );
}

