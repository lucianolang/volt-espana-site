import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  ArrowLeft,
  House,
  Sun,
  HandPointing,
  List,
  X,
  Plus,
  GlobeHemisphereWest,
} from "@phosphor-icons/react";
import { content, links } from "./content";

const assets = `${import.meta.env.BASE_URL}assets/`;
const navPages = ["ideas", "sobre-volt", "agenda", "participa"];
const route = () => {
  const [lang = "es", page = "inicio"] = location.hash
    .replace(/^#\/?/, "")
    .split("/");
  return {
    lang: lang === "en" ? "en" : "es",
    page: location.hash ? page : "inicio",
  };
};
const href = (lang, page) => `#/${lang}/${page}`;
const icons = { house: House, sun: Sun, hand: HandPointing };

function Link({
  to,
  children,
  className = "",
  external = false,
  arrow = true,
  ...props
}) {
  return (
    <a href={to} className={className} {...props}>
      {children}
      {arrow &&
        (external ? (
          <ArrowUpRight aria-hidden="true" size={23} />
        ) : (
          <ArrowRight aria-hidden="true" size={23} />
        ))}
    </a>
  );
}
function Brand({ lang }) {
  return (
    <a
      className="brand"
      href={href(lang, "inicio")}
      aria-label={`Volt España · ${content[lang].home}`}
    >
      <img src={`${assets}volt-logo.svg`} alt="Volt" width="230" height="96" />
      <span>España</span>
    </a>
  );
}
function PolicyIcon({ name, size = 58 }) {
  const Icon = icons[name];
  return (
    <Icon
      className="policy-icon"
      size={size}
      weight="fill"
      aria-hidden="true"
    />
  );
}

function Header({ lang, page, c }) {
  const [open, setOpen] = useState(false);
  const menuButton = useRef(null);
  useEffect(() => {
    setOpen(false);
  }, [lang, page]);
  useEffect(() => {
    const escape = (e) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [open]);
  return (
    <header className="header">
      <div className="header-inner wrap">
        <Brand lang={lang} />
        <button
          ref={menuButton}
          className="menu-toggle"
          aria-label={open ? c.close : c.menu}
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={27} /> : <List size={27} />}
        </button>
        <nav
          id="main-nav"
          className={open ? "nav is-open" : "nav"}
          onClick={(event) => {
            if (event.target.closest("a")) setOpen(false);
          }}
          aria-label={
            lang === "es" ? "Navegación principal" : "Main navigation"
          }
        >
          {navPages.map((p, i) => (
            <a
              key={p}
              href={href(lang, p)}
              aria-current={
                page === p ||
                (p === "ideas" &&
                  ["vivienda", "seguridad", "administracion"].includes(page))
                  ? "page"
                  : undefined
              }
            >
              {c.nav[i]}
            </a>
          ))}
          <div
            className="languages"
            aria-label={lang === "es" ? "Idioma" : "Language"}
          >
            <a
              href={href("es", page)}
              lang="es"
              aria-label="Español"
              aria-current={lang === "es" ? "true" : undefined}
            >
              ES
            </a>
            <a
              href={href("en", page)}
              lang="en"
              aria-label="English"
              aria-current={lang === "en" ? "true" : undefined}
            >
              EN
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
function PolicyGrid({ c, lang, compact = false }) {
  return (
    <div className={`policy-grid ${compact ? "compact" : ""}`}>
      {c.policies.map((p) => (
        <article key={p.id}>
          <PolicyIcon name={p.icon} />
          <h3>
            <a href={href(lang, p.id)}>{p.title}</a>
          </h3>
          <p>{p.short}</p>
          {!compact && (
            <Link className="text-link" to={href(lang, p.id)}>
              {c.read}
            </Link>
          )}
        </article>
      ))}
    </div>
  );
}
function FollowBand({ c }) {
  return (
    <section className="follow-band">
      <div className="wrap follow-inner">
        <h2>
          {c.followTitle[0]}
          <br />
          {c.followTitle[1]} <mark>{c.followTitle[2]}</mark>
        </h2>
        <div>
          <p>{c.followText}</p>
          <Link className="text-link light" to={links.newsletter} external>
            {c.updates}
          </Link>
        </div>
      </div>
    </section>
  );
}
function Event({ c, small = false }) {
  const ended = new Date() > new Date("2026-11-08T23:59:59+01:00");
  return (
    <article className={`event-row ${small ? "small" : ""}`}>
      <div className="event-date">
        <strong>
          07<span>–08</span>
        </strong>
        <span>NOV 2026</span>
      </div>
      <div className="event-info">
        <span className="tag">{ended ? c.past : c.members}</span>
        <h3>{c.assembly}</h3>
        <p>{c.location}</p>
        {!small && (
          <p className="small-copy">{ended ? c.pastNote : c.eventNote}</p>
        )}
        <Link to={links.assembly} external className="text-link">
          {c.eventAction}
        </Link>
      </div>
    </article>
  );
}
function Home({ c, lang }) {
  return (
    <>
      <section className="home-hero">
        <div className="wrap hero-inner">
          <div className="hero-copy">
            <h1 tabIndex={-1}>
              <span>
                <mark>{c.hero[0]}</mark>
              </span>
              <span>{c.hero[1]}</span>
              <span>{c.hero[2]}</span>
            </h1>
            <p className="hero-lead">
              {c.heroLead}
              <br />
              {c.heroSub}
            </p>
            <div className="hero-actions">
              <Link className="button lime" to={links.sign} external>
                {c.sign}
              </Link>
              <Link className="text-link light" to={href(lang, "vivienda")}>
                {c.learn}
              </Link>
            </div>
            <p className="hero-note">{c.heroNote}</p>
          </div>
          <img
            className="hero-art"
            src={`${assets}housing-collage.png`}
            alt=""
            width="1099"
            height="1431"
            fetchPriority="high"
          />
        </div>
      </section>
      <div className="manifesto-strip">{c.stripe}</div>
      <section className="home-ideas wrap">
        <p className="eyebrow">{c.eyebrow}</p>
        <h2>{c.ideasTitle}</h2>
        <PolicyGrid c={c} lang={lang} compact />
        <div className="center">
          <Link className="text-link" to={href(lang, "ideas")}>
            {c.explore}
          </Link>
        </div>
      </section>
      <FollowBand c={c} />
      <section className="home-beyond wrap">
        <div>
          <p className="eyebrow">{c.upcoming}</p>
          <h2>{lang === "es" ? "Nos vemos fuera." : "See you out there."}</h2>
          <Link to={href(lang, "agenda")} className="text-link">
            {c.nav[2]}
          </Link>
        </div>
        <Event c={c} small />
      </section>
      <section className="europe-band">
        <div className="wrap">
          <GlobeHemisphereWest size={60} weight="light" aria-hidden="true" />
          <h2>{c.aboutTitle}</h2>
          <Link to={href(lang, "sobre-volt")} className="text-link">
            {c.nav[1]}
          </Link>
        </div>
      </section>
    </>
  );
}
function PageIntro({ eyebrow, title, lead, children }) {
  return (
    <section className="page-intro">
      <div className="wrap">
        <p className="eyebrow">{eyebrow}</p>
        <h1 tabIndex={-1}>{title}</h1>
        {lead && <p className="page-lead">{lead}</p>}
        {children}
      </div>
    </section>
  );
}
function Ideas({ c, lang }) {
  return (
    <>
      <PageIntro eyebrow={c.eyebrow} title={c.ideasTitle} lead={c.ideaIntro} />
      <section className="wrap ideas-index">
        <PolicyGrid c={c} lang={lang} />
      </section>
      <section className="wider-band">
        <div className="wrap split">
          <h2>{c.wider}</h2>
          <div>
            <p>{c.widerText}</p>
            <Link
              className="text-link"
              to="https://voltespana.org/politicas"
              external
            >
              {c.widerAction}
            </Link>
          </div>
        </div>
      </section>
      <FollowBand c={c} />
    </>
  );
}
function Policy({ c, lang, page }) {
  const p = c.policies.find((x) => x.id === page);
  const source =
    page === "vivienda"
      ? links.housing
      : page === "administracion"
        ? links.digital
        : null;
  return (
    <>
      <section className={`policy-hero ${page}`}>
        <div className="wrap">
          <a className="back-link" href={href(lang, "ideas")}>
            <ArrowLeft size={19} />
            {c.back}
          </a>
          <div className="policy-hero-grid">
            <div>
              <p className="eyebrow">
                {p.number} / {p.label}
              </p>
              <h1 tabIndex={-1}>{p.headline}</h1>
              <p className="page-lead">{p.lead}</p>
              <span className="status-label">{c.draft}</span>
            </div>
            {page === "vivienda" ? (
              <img
                className="policy-art"
                src={`${assets}housing-collage.png`}
                alt=""
                width="1099"
                height="1431"
              />
            ) : (
              <PolicyIcon name={p.icon} size={190} />
            )}
          </div>
        </div>
      </section>
      <section className="wrap measures">
        <p className="eyebrow">{c.inPractice}</p>
        {p.measures.map(([title, text], i) => (
          <article className="measure-row" key={title}>
            <span className="measure-number">0{i + 1}</span>
            <h2>{title}</h2>
            <p>{text}</p>
          </article>
        ))}
      </section>
      <section className="benefit-band">
        <div className="wrap split">
          <p className="eyebrow">{c.benefit}</p>
          <h2>{p.benefit}</h2>
        </div>
      </section>
      {page === "vivienda" && (
        <section className="housing-action wrap">
          <p className="eyebrow">{c.heroNote}</p>
          <h2>{c.housingCall}</h2>
          <p>{c.housingCallText}</p>
          <div className="actions">
            <Link to={links.sign} className="button purple" external>
              {c.sign}
            </Link>
            <Link to={links.campaign} className="text-link" external>
              {c.campaignRead}
            </Link>
          </div>
          <p className="small-copy">{c.housingCallNote}</p>
        </section>
      )}
      <section className="wrap faqs">
        <h2>{lang === "es" ? "Las cosas, claras." : "Let’s make it clear."}</h2>
        {p.faqs.map(([q, a]) => (
          <details key={q}>
            <summary>
              {q}
              <Plus size={24} aria-hidden="true" />
            </summary>
            <p>{a}</p>
          </details>
        ))}
        {source && (
          <Link to={source} external className="text-link source-link">
            {c.source}
          </Link>
        )}
      </section>
      {page === "vivienda" ? (
        <section className="wider-band">
          <div className="wrap split">
            <h2>{c.housingFollow}</h2>
            <div>
              <p>{c.housingFollowText}</p>
              <Link className="text-link" to={href(lang, "participa")}>
                {c.nav[3]}
              </Link>
            </div>
          </div>
        </section>
      ) : (
        <FollowBand c={c} />
      )}
    </>
  );
}
function Participate({ c }) {
  return (
    <>
      <PageIntro
        eyebrow={c.nav[3]}
        title={c.participateTitle}
        lead={c.participateLead}
      />
      <section className="wrap participation">
        {c.steps.map(([n, title, text, cta], i) => (
          <article className="participation-row" key={n}>
            <span className="step-number">{n}</span>
            <div>
              <h2>{title}</h2>
              <p>{text}</p>
            </div>
            <Link
              to={[links.sign, links.newsletter, links.contact, links.join][i]}
              className={i === 0 ? "button purple" : "text-link"}
              external
            >
              {cta}
            </Link>
          </article>
        ))}
      </section>
      <section className="benefit-band">
        <div className="wrap split">
          <h2>{c.welcome}</h2>
          <p>{c.welcomeText}</p>
        </div>
      </section>
      <section className="wrap member-help">
        <h2>{c.already}</h2>
        <p>{c.alreadyText}</p>
        <div className="actions">
          <Link className="button purple" to={links.portal} external>
            {c.memberPortal}
          </Link>
          <Link className="text-link" to={links.contact} external>
            {c.alreadyAction}
          </Link>
        </div>
      </section>
    </>
  );
}
function Agenda({ c }) {
  return (
    <>
      <PageIntro eyebrow={c.nav[2]} title={c.agendaTitle} lead={c.agendaLead} />
      <section className="wrap agenda">
        <Event c={c} />
        <div className="open-event">
          <h2>{c.noOpen}</h2>
          <p>{c.noOpenText}</p>
          <div className="actions">
            <Link className="button purple" to={links.events} external>
              {c.allEvents}
            </Link>
            <Link className="text-link" to={links.contact} external>
              {c.askTeam}
            </Link>
          </div>
        </div>
      </section>
      <FollowBand c={c} />
    </>
  );
}
function About({ c, lang }) {
  return (
    <>
      <PageIntro eyebrow={c.nav[1]} title={c.aboutTitle} lead={c.aboutLead}>
        <Link to={href(lang, "participa")} className="button lime">
          {c.nav[3]}
        </Link>
      </PageIntro>
      <section className="wrap about-grid">
        {c.aboutBlocks.map(([title, text], i) => (
          <article key={title}>
            <span className="step-number">0{i + 1}</span>
            <h2>{title}</h2>
            <p>{text}</p>
          </article>
        ))}
      </section>
      <section className="europe-band">
        <div className="wrap about-links">
          <Link
            to="https://voltespana.org/personas"
            className="text-link"
            external
          >
            {c.people}
          </Link>
          <Link to="https://volteuropa.org" className="text-link" external>
            {c.europe}
          </Link>
          <Link to={links.contact} className="text-link" external>
            {c.contact}
          </Link>
        </div>
      </section>
      <FollowBand c={c} />
    </>
  );
}
function Preview({ c }) {
  return (
    <>
      <PageIntro eyebrow={c.privacy} title={c.previewTitle} />
      <section className="wrap preview-content">
        <p>{c.previewText}</p>
        <p>{c.previewSources}</p>
        <p>{c.footerNote}</p>
        <h2>{c.sources}</h2>
        <ul className="source-list">
          <li>
            <a href={links.housing}>Vivienda Made in Austria · Volt España</a>
          </li>
          <li>
            <a href={links.digital}>
              Digitalización Made in Estonia · Volt España
            </a>
          </li>
          <li>
            <a href={links.campaign}>{c.campaignRead} · Volt España</a>
          </li>
        </ul>
        <Link to="https://voltespana.org" className="button purple" external>
          {c.official}
        </Link>
      </section>
    </>
  );
}
function Footer({ c, lang }) {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div>
            <Brand lang={lang} />
            <p>{c.footerLine}</p>
          </div>
          <nav aria-label={lang === "es" ? "Enlaces del pie" : "Footer links"}>
            {navPages.map((p, i) => (
              <a key={p} href={href(lang, p)}>
                {c.nav[i]}
              </a>
            ))}
            <a href={links.contact}>{c.contact}</a>
            <a href={links.donate}>{c.donate}</a>
          </nav>
        </div>
        <div className="footer-bottom">
          <p>{c.preview}</p>
          <a href={href(lang, "preview")}>{c.privacy}</a>
          <a href="https://voltespana.org">{c.official}</a>
        </div>
      </div>
    </footer>
  );
}
export function App() {
  const [state, setState] = useState(route);
  const initial = useRef(true);
  const { lang, page } = state;
  const c = content[lang];
  useEffect(() => {
    const update = () => setState(route());
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
    const name =
      c.policies.find((p) => p.id === page)?.title ||
      c.nav[navPages.indexOf(page)] ||
      (page === "preview" ? c.privacy : c.home);
    document.title = `${name} · Volt España · Preview`;
    if (!initial.current) {
      window.scrollTo({ top: 0, behavior: "instant" });
      document.querySelector("h1")?.focus({ preventScroll: true });
    }
    initial.current = false;
  }, [lang, page, c]);
  let body;
  if (page === "inicio") body = <Home c={c} lang={lang} />;
  else if (page === "ideas") body = <Ideas c={c} lang={lang} />;
  else if (c.policies.some((p) => p.id === page))
    body = <Policy c={c} lang={lang} page={page} />;
  else if (page === "participa") body = <Participate c={c} />;
  else if (page === "agenda") body = <Agenda c={c} />;
  else if (page === "sobre-volt") body = <About c={c} lang={lang} />;
  else if (page === "preview") body = <Preview c={c} />;
  else
    body = (
      <PageIntro eyebrow="404" title={c.notFound}>
        <Link to={href(lang, "inicio")} className="button lime">
          {c.returnHome}
        </Link>
      </PageIntro>
    );
  return (
    <div className={`site lang-${lang}`}>
      <a
        className="skip-link"
        href="#main"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("main").focus();
        }}
      >
        {c.skip}
      </a>
      <Header lang={lang} page={page} c={c} />
      <main id="main" tabIndex={-1}>
        {body}
      </main>
      <Footer c={c} lang={lang} />
    </div>
  );
}
