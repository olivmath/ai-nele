import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Badge, Button, Card } from './components/ui'
import './styles.css'

function Trail({ index }) { return <aside className="incident-trail" aria-hidden="true"><span className="trail-marker" /><span className="trail-count">{String(index + 1).padStart(2, '0')}</span></aside> }
function Slide({ html, index }) { return <article className={`slide report-slide slide-${index + 1}`} aria-label={`Slide ${index + 1}`}><Trail index={index} /><Card className="slide-content" dangerouslySetInnerHTML={{ __html: html }} /></article> }
function CarouselViewer({ carousel }) {
  const [active, setActive] = useState(0); const total = carousel.slides.length
  const goTo = (index) => setActive(Math.max(0, Math.min(total - 1, index)))
  useEffect(() => { window.goTo = goTo; window.navigate = (delta) => goTo(active + delta); const keys = (e) => { if (e.key === 'ArrowRight') goTo(active + 1); if (e.key === 'ArrowLeft') goTo(active - 1) }; document.addEventListener('keydown', keys); return () => document.removeEventListener('keydown', keys) }, [active, total])
  return <main className="carousel" aria-label={`${carousel.name} incident report`}><div className="report-ribbon"><Badge>SECURITY INCIDENT</Badge><span>{carousel.name}</span><span className="report-ribbon__id">{carousel.report}</span></div><div className="slides" style={{ transform: `translateX(-${active * 1080}px)` }}>{carousel.slides.map((html, index) => <Slide key={index} html={html} index={index} />)}</div><nav className="nav" aria-label="Carousel navigation"><Button aria-label="Previous slide" disabled={active === 0} onClick={() => goTo(active - 1)}>←</Button><div className="dots">{carousel.slides.map((_, index) => <button key={index} className={`dot ${active === index ? 'active' : ''}`} onClick={() => goTo(index)} aria-label={`Go to slide ${index + 1}`} />)}</div><Button aria-label="Next slide" disabled={active === total - 1} onClick={() => goTo(active + 1)}>→</Button></nav></main>
}
createRoot(document.getElementById('root')).render(<CarouselViewer carousel={window.CAROUSEL_DATA} />)
