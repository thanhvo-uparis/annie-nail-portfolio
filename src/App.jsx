import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowDownRight, ArrowRight, Award, BriefcaseBusiness, CalendarHeart, ChevronLeft, ChevronRight, Download, FileText, Footprints, Gem, Hand, Heart, Mail, MapPin, Menu, Palette, Phone, Sparkles, X } from 'lucide-react'
import { gallery, services } from './data/portfolio'
import heroPhoto from '../assets/hero_photo.jpeg'
import portraitPhoto from '../assets/portrait/portrait-photo.jpeg'
import diplomaPageOne from '../assets/diplome/diplome-page-1.png'
import diplomaPageTwo from '../assets/diplome/diplome-page-2.png'

const reveal = { hidden: { opacity: 0, y: 26 }, visible: { opacity: 1, y: 0 } }
const serviceIcons = { hand: Hand, footprints: Footprints, sparkles: Sparkles, palette: Palette }
const diplomas = [diplomaPageOne, diplomaPageTwo]

function InstagramIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" /></svg>
}

function Reveal({ children, className = '', delay = 0 }) {
  return <motion.div className={className} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }} transition={{ duration: .65, delay }}>{children}</motion.div>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [filter, setFilter] = useState('Tout')
  const [selected, setSelected] = useState(null)
  const [touchStart, setTouchStart] = useState(null)
  const [diplomaIndex, setDiplomaIndex] = useState(0)
  const [diplomaOpen, setDiplomaOpen] = useState(false)
  const filters = ['Tout', 'Manucure', 'Pédicure', 'Gel & Résine', 'Nail art']
  const visibleWork = filter === 'Tout' ? gallery : gallery.filter((item) => item.category === filter)

  useEffect(() => {
    const handleKeyboard = (event) => {
      if (event.key === 'Escape') { setSelected(null); setDiplomaOpen(false) }
      if (diplomaOpen && event.key === 'ArrowLeft') setDiplomaIndex((index) => (index - 1 + diplomas.length) % diplomas.length)
      if (diplomaOpen && event.key === 'ArrowRight') setDiplomaIndex((index) => (index + 1) % diplomas.length)
      if (!diplomaOpen && event.key === 'ArrowLeft') showAdjacent(-1)
      if (!diplomaOpen && event.key === 'ArrowRight') showAdjacent(1)
    }
    window.addEventListener('keydown', handleKeyboard)
    return () => window.removeEventListener('keydown', handleKeyboard)
  }, [selected, diplomaOpen])

  const closeMenu = () => setMenuOpen(false)
  const showAdjacent = (direction) => {
    if (!selected) return
    const currentIndex = gallery.findIndex((item) => item.id === selected.id)
    setSelected(gallery[(currentIndex + direction + gallery.length) % gallery.length])
  }
  const handleTouchEnd = (event) => {
    if (touchStart === null) return
    const difference = event.changedTouches[0].clientX - touchStart
    if (Math.abs(difference) > 45) showAdjacent(difference > 0 ? -1 : 1)
    setTouchStart(null)
  }
  return <>
    <header className="site-header">
      <a className="brand" href="#accueil" aria-label="Annie Nail Artist"><span className="brand-logo">Annie</span><small>NAIL ARTIST</small></a>
      <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Ouvrir le menu">{menuOpen ? <X /> : <Menu />}</button>
      <nav className={menuOpen ? 'nav open' : 'nav'}>
        {[['Accueil', '#accueil'], ['À propos', '#apropos'], ['Prestations', '#expertises'], ['Galerie', '#realisations'], ['Expérience & Diplôme', '#parcours'], ['Me contacter', 'tel:+33765245548']].map(([name, link]) => <a key={name} href={link} onClick={closeMenu}>{name}</a>)}
        <a className="nav-cv" href="#contact" onClick={closeMenu}><Download size={16} /> Télécharger mon CV</a>
      </nav>
    </header>

    <main>
      <section id="accueil" className="hero">
        <div className="hero-glow glow-one" /><div className="hero-glow glow-two" />
        <motion.div className="hero-copy" initial="hidden" animate="visible" variants={reveal} transition={{ duration: .8 }}>
          <p className="eyebrow">PORTFOLIO · 2026</p>
          <h1>Annie <i>♡</i></h1>
          <p className="hero-role">Prothésiste ongulaire <em>&</em> Nail Artist</p>
          <p className="hero-text">plus de 5 ans d’expérience dans la beauté des mains et des pieds, la pose d’ongles et le nail art.</p>
          <div className="hero-actions"><a className="button button-primary" href="#realisations">Découvrir mes réalisations <ArrowRight size={18} /></a><a className="button button-secondary" href="tel:+33765245548"><Phone size={17} /> Me contacter</a></div>
        </motion.div>
        <motion.div className="hero-visual" initial={{ opacity: 0, scale: .94, y: 25 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: .85, delay: .12 }}>
          <div className="hero-photo"><img src={heroPhoto} alt="Création nail art rose d'Annie" /></div>
          <span className="floating-tag tag-top">Beauté des mains<br/><b>Pose d’ongles</b></span>
          <span className="floating-tag tag-bottom"><Sparkles size={14} /> Passion & précision</span>
          <span className="hero-doodle">♡</span>
        </motion.div>
      </section>

      <section className="credentials" aria-label="Informations clés">
        <div><Award /><p><strong>Diplômée</strong><span>Diplôme de prothésiste ongulaire</span></p></div>
        <div><BriefcaseBusiness /><p><strong>plus de 5 ans d’expérience</strong><span>Expertise et savoir-faire professionnel</span></p></div>
        <div><MapPin /><p><strong>Actuellement à Paris</strong><span>Rosalie Nail · Paris 13</span></p></div>
        <div><ArrowDownRight /><p><strong>Mobilité</strong><span>Installation prochaine à Annecy</span></p></div>
      </section>

      <section id="apropos" className="section about-section">
        <Reveal className="portrait-card"><div className="portrait-photo"><img src={portraitPhoto} alt="Portrait d'Annie" /></div><span className="portrait-heart">♡</span></Reveal>
        <Reveal className="about-copy" delay={.08}><p className="eyebrow">MON UNIVERS</p><h2>À propos <i>de moi</i></h2><p>Je m’appelle <b>Annie</b>, prothésiste ongulaire passionnée par l’univers de la beauté et du détail. J’aime créer des prestations soignées, durables et personnalisées, toujours à l’écoute des envies de chaque cliente.</p><ul className="check-list"><li><Award /> Diplômée — prothésiste ongulaire</li><li><BriefcaseBusiness /> Plus de 5 ans d’expérience</li><li><Gem /> Actuellement chez Rosalie Nail (Paris 13)</li><li><Heart /> En recherche d’une opportunité à Annecy</li></ul></Reveal>
        <Reveal className="about-note" delay={.16}><span>«</span><p>La beauté se joue dans les détails — une manucure doit révéler la personnalité de celle qui la porte.</p></Reveal>
      </section>

      <section id="expertises" className="section expertise-section">
        <Reveal className="section-heading"><p className="eyebrow">SAVOIR-FAIRE</p><h2>Mes <i>expertises</i></h2><p>Des gestes précis, des finitions impeccables et une attention portée à chaque détail.</p></Reveal>
        <div className="service-grid">{services.map((service, index) => { const Icon = serviceIcons[service.icon]; return <Reveal key={service.title} delay={index * .08}><article className="service-card"><div className="service-icon"><Icon /></div><h3>{service.title}</h3><p>{service.text}</p><ArrowRight className="service-arrow" size={18} /></article></Reveal> })}</div>
      </section>

      <section id="realisations" className="section gallery-section">
        <Reveal className="gallery-intro"><div><p className="eyebrow">PORTFOLIO</p><h2>Mes <i>réalisations</i></h2></div><p>Une sélection de créations réalisées avec passion.</p></Reveal>
        <Reveal className="filters">{filters.map((item) => <button key={item} className={filter === item ? 'active' : ''} onClick={() => setFilter(item)}>{item}</button>)}</Reveal>
        <motion.div layout className="gallery-grid"> <AnimatePresence mode="popLayout">{visibleWork.map((work) => <motion.button layout key={work.id} className="work-card" initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .96 }} transition={{ duration: .32 }} onClick={() => setSelected(work)}><img src={work.image} alt={work.title} /><span><b>{work.title}</b><small>{work.category}</small></span></motion.button>)}</AnimatePresence></motion.div>
        <Reveal className="social-proof"><p>Découvrez davantage de mes réalisations sur :</p><div><a href="https://www.treatwell.fr/salon/rosalie-nails/" target="_blank" rel="noreferrer" aria-label="Voir Annie sur Treatwell"><CalendarHeart /><span>Treatwell</span></a><a href="https://www.instagram.com/rosalie_nailsparis13" target="_blank" rel="noreferrer" aria-label="Voir Annie sur Instagram"><InstagramIcon /><span>Instagram</span></a></div></Reveal>
      </section>

      <section id="parcours" className="section journey-section">
        <Reveal className="section-heading"><p className="eyebrow">MON PARCOURS</p><h2>Expérience <i>& diplôme</i></h2></Reveal>
        <div className="timeline"><Reveal><article><span>2020 — Aujourd’hui</span><h3>Prothésiste ongulaire · Rosalie Nail</h3><p>Paris 13 · Accueil, conseil et réalisation de prestations complètes : manucure, pédicure, gel, résine et nail art.</p></article></Reveal><Reveal delay={.1}><article><span>2017 - Formation professionnelle</span><h3>Diplôme de prothésiste ongulaire</h3><p>Maîtrise des protocoles d’hygiène, techniques de pose et finitions professionnelles.</p></article></Reveal><Reveal delay={.2}><article><span>Mon prochain chapitre</span><h3>Une opportunité à Annecy</h3><p>Je souhaite rejoindre un salon qui partage mon exigence de qualité, afin de me rapprocher de ma famille.</p></article></Reveal></div>
        <Reveal className="diploma-showcase" delay={.12}><div className="diploma-copy"><p className="eyebrow">JUSTIFICATIF</p><h3>Mon diplôme professionnel</h3><p>Découvrez les deux pages de mon diplôme de prothésiste ongulaire.</p><button className="diploma-open" onClick={() => setDiplomaOpen(true)}><FileText size={18} /> Voir mon diplôme</button></div><div className="diploma-slider"><button onClick={() => setDiplomaIndex((index) => (index - 1 + diplomas.length) % diplomas.length)} aria-label="Page précédente"><ChevronLeft /></button><button className="diploma-preview" onClick={() => setDiplomaOpen(true)} aria-label="Agrandir le diplôme"><img src={diplomas[diplomaIndex]} alt="Aperçu du diplôme de prothésiste ongulaire" /></button><button onClick={() => setDiplomaIndex((index) => (index + 1) % diplomas.length)} aria-label="Page suivante"><ChevronRight /></button><div className="diploma-pagination"><span>{diplomaIndex + 1} / {diplomas.length}</span>{diplomas.map((_, index) => <button key={index} onClick={() => setDiplomaIndex(index)} className={index === diplomaIndex ? 'active' : ''} aria-label="Voir cette page" />)}</div></div></Reveal>
      </section>

      <section id="contact" className="contact-section"><div className="contact-orb" /><Reveal><p className="eyebrow">RECRUTEMENT · ANNECY</p><h2>Prête pour une nouvelle<br/><i>opportunité.</i></h2><p>Vous recherchez une prothésiste ongulaire expérimentée, attentive et passionnée ? Échangeons.</p><div className="contact-actions"><a className="button button-primary" href="tel:+33765245548"><Phone size={18} /> 07 65 24 55 48</a><a className="text-link" href="#" onClick={(event) => event.preventDefault()}><Download size={17} /> Télécharger mon CV</a></div></Reveal><div className="contact-location"><MapPin /><p><strong>Disponibilité à Annecy</strong><br/>Mobilité prévue pour rapprochement familial.</p></div></section>
    </main>

    <footer><a className="brand" href="#accueil"><span>Annie</span><small>NAIL ARTIST</small></a><p>© 2026 · Portfolio professionnel</p><a href="#accueil">Retour en haut ↑</a></footer>
    <AnimatePresence>{selected && <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)} role="dialog" aria-modal="true"><button className="lightbox-close" onClick={() => setSelected(null)} aria-label="Fermer"><X /></button><button className="lightbox-nav lightbox-previous" onClick={(event) => { event.stopPropagation(); showAdjacent(-1) }} aria-label="Photo précédente"><ChevronLeft /></button><motion.figure initial={{ scale: .94, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: .94, y: 20 }} onClick={(event) => event.stopPropagation()} onTouchStart={(event) => setTouchStart(event.touches[0].clientX)} onTouchEnd={handleTouchEnd}><img src={selected.image} alt={selected.title} /><figcaption>{selected.title} · {selected.category}<small>Glissez pour voir les autres créations</small></figcaption></motion.figure><button className="lightbox-nav lightbox-next" onClick={(event) => { event.stopPropagation(); showAdjacent(1) }} aria-label="Photo suivante"><ChevronRight /></button></motion.div>}</AnimatePresence>
    <AnimatePresence>{diplomaOpen && <motion.div className="lightbox diploma-lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDiplomaOpen(false)} role="dialog" aria-modal="true" aria-label="Diplôme de prothésiste ongulaire"><button className="lightbox-close" onClick={() => setDiplomaOpen(false)} aria-label="Fermer"><X /></button><button className="lightbox-nav lightbox-previous" onClick={(event) => { event.stopPropagation(); setDiplomaIndex((index) => (index - 1 + diplomas.length) % diplomas.length) }} aria-label="Page précédente"><ChevronLeft /></button><motion.figure initial={{ scale: .94, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: .94, y: 20 }} onClick={(event) => event.stopPropagation()}><img src={diplomas[diplomaIndex]} alt="Diplôme de prothésiste ongulaire" /><figcaption>Diplôme de prothésiste ongulaire<small>Page {diplomaIndex + 1} sur {diplomas.length}</small></figcaption></motion.figure><button className="lightbox-nav lightbox-next" onClick={(event) => { event.stopPropagation(); setDiplomaIndex((index) => (index + 1) % diplomas.length) }} aria-label="Page suivante"><ChevronRight /></button></motion.div>}</AnimatePresence>
  </>
}

export default App
