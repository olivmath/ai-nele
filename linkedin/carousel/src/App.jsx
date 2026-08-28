import React, { useState, useEffect } from 'react'
import { CarouselViewer } from './CarouselViewer'
import SmartcontractDaoSlides from '@smartcontract-dao-slides'

import theDao from '../data/the-dao.json'
import parityWallet from '../data/parity-wallet.json'
import beautychain from '../data/beautychain.json'
import bzx from '../data/bzx.json'
import polyNetwork from '../data/poly-network.json'
import creamFinance from '../data/cream-finance.json'
import roninBridge from '../data/ronin-bridge.json'
import akutarsNft from '../data/akutars-nft.json'
import nomadBridge from '../data/nomad-bridge.json'
import eulerFinance from '../data/euler-finance.json'
import curveFinance from '../data/curve-finance.json'

const carousels = [
  theDao, parityWallet, beautychain, bzx, polyNetwork,
  creamFinance, roninBridge, akutarsNft, nomadBridge,
  eulerFinance, curveFinance,
]

export function App() {
  const [selected, setSelected] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const fit = () => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      const s = Math.min((vw - 80) / 1080, (vh - 80) / 1350, 1)
      setScale(s)
    }
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])

  const pick = (i) => {
    setSelected(i)
    setMenuOpen(false)
  }

  return (
    <div className="app-shell">
      <button
        className={`menu-toggle ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span /><span /><span />
      </button>

      <div
        className={`sidebar-backdrop ${menuOpen ? 'visible' : ''}`}
        onClick={() => setMenuOpen(false)}
      />

      <aside className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>SOLBOOK</h2>
          <p>Security Incident Reports</p>
        </div>
        <nav className="sidebar-list">
          {carousels.map((c, i) => (
            <button
              key={c.slug}
              className={`sidebar-item ${selected === i ? 'active' : ''}`}
              onClick={() => pick(i)}
            >
              <span className="item-number">{String(i + 1).padStart(2, '0')}</span>
              <span className="item-name">{c.name}</span>
              <span className="item-report">{c.report}</span>
            </button>
          ))}
        </nav>
      </aside>

      <main className={selected === 0 ? 'dao-showcase' : 'viewer'}>
        {selected === 0 ? <SmartcontractDaoSlides /> : (
          <div className="viewer-scale" style={{ transform: `scale(${scale})` }}>
            <CarouselViewer carousel={carousels[selected]} key={selected} />
          </div>
        )}
      </main>
    </div>
  )
}
