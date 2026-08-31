import React from 'react'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import { CarouselApp } from './pages/carousel/CarouselApp'

function Nav() {
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: 'rgba(10,10,10,.95)', backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255,255,255,.08)',
      padding: '12px 24px', display: 'flex', gap: '24px', alignItems: 'center',
      fontFamily: "'JetBrains Mono', monospace", fontSize: '12px',
    }}>
      <Link to="/" style={{ color: '#ccff00', textDecoration: 'none', fontWeight: 700, letterSpacing: '.12em' }}>
        SCOTER
      </Link>
      <Link to="/carousel" style={{ color: '#999', textDecoration: 'none' }}>Carousel</Link>
      <a href="/landing-pages/livro/" style={{ color: '#999', textDecoration: 'none' }}>Landing Page</a>
    </nav>
  )
}

function Home() {
  return (
    <div style={{
      minHeight: '100vh', background: '#000', color: '#ebebeb',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Space Grotesk', sans-serif", paddingTop: '48px',
    }}>
      <h1 style={{ fontSize: '4rem', fontWeight: 700, letterSpacing: '-.06em', marginBottom: '16px' }}>
        <span style={{ color: '#ccff00' }}>Scoter</span>
      </h1>
      <p style={{ color: 'rgba(255,255,255,.5)', fontSize: '1.1rem', marginBottom: '48px' }}>
        LinkedIn content toolkit
      </p>
      <div style={{ display: 'flex', gap: '16px' }}>
        <Link to="/carousel" style={{
          background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.12)',
          borderRadius: '16px', padding: '24px 32px', color: '#ebebeb', textDecoration: 'none',
          transition: 'border-color .2s',
        }}>
          <strong style={{ display: 'block', fontSize: '1.2rem', marginBottom: '8px' }}>Carousel</strong>
          <span style={{ color: 'rgba(255,255,255,.4)', fontSize: '.9rem' }}>Security incident reports</span>
        </Link>
        <a href="/landing-pages/livro/" style={{
          background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.12)',
          borderRadius: '16px', padding: '24px 32px', color: '#ebebeb', textDecoration: 'none',
          transition: 'border-color .2s',
        }}>
          <strong style={{ display: 'block', fontSize: '1.2rem', marginBottom: '8px' }}>Landing Page</strong>
          <span style={{ color: 'rgba(255,255,255,.4)', fontSize: '.9rem' }}>Solidity book pre-sale</span>
        </a>
      </div>
    </div>
  )
}

export function App() {
  return (
    <>
      <Nav />
      <div style={{ paddingTop: '48px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/carousel" element={<CarouselApp />} />
        </Routes>
      </div>
    </>
  )
}
